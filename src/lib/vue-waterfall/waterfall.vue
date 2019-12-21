<template>
  <div
    class="waterfall"
    :class="{resize, 'loading-show': (loading && !mount) || finished}"
    :style="waterfallStyle"
    ref="waterfall"
  >
    <slot></slot>
    <div
      class="loading-warp"
      v-show="!mount"
      v-if="loading"
    >
      <span
        class="loading"
        :style="{color: this.loadingColor}"
      >
        <i
          v-for="(item, index) in 12"
          :key="index"
        ></i>
      </span>
    </div>
    <div
      class="finished"
      v-if="finished"
    >{{ finishedTxt }}</div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
export default {
  name: 'waterfall',
  provide() {
    return {
      parent: this
    }
  },
  props: {
    // 起始top值
    top: {
      type: Number,
      default: 0
    },
    // 上下间隔
    topInterval: {
      type: Number,
      default: 0
    },
    // 左右间隔
    leftInterval: {
      type: Number,
      default: 0
    },
    // 瀑布流宽度
    width: {
      type: Number
    },
    // 加载的颜色
    loadingColor: {
      type: String,
      default: '#969799'
    },
    // 是否需要菊花加载图
    loading: {
      type: Boolean,
      default: false
    },
    // 滚动条距离底部小于 offset 时触发 load 事件
    offset: {
      type: Number,
      default: 200
    },
    // 是否处于加载状态，加载过程中不触发 load 事件
    finished: {
      type: Boolean,
      default: false
    },
    // 全部加载完成文本
    finishedTxt: {
      type: String,
      default: '没有更多了~'
    },
    // 容器 vue component
    container:{
      type: Object
    }
  },
  data() {
    return {
      // 瀑布流外包裹高度
      waterfallBoxHeight: 0,
      // 触发滚动的最小高度
      scrollMinHeight: 0,
      // 瀑布流没列个数
      rowNumber: 0,
      // 初始数据
      initData: null,
      // 子元素
      childrens: [],
      // 已经有位置的子元素
      allChildren: [],
      // 瀑布流每个的宽度
      slideWidth: 0,
      // 是否更新视口
      resize: false,
      // 起始 left 值
      left: 0,
      // 是否挂载完成
      mount: false
    }
  },
  methods: {
    // 获取初始 left 值
    getLeftValue() {
      this.left =
        (this.$refs.waterfall.clientWidth -
          this.slideWidth * this.rowNumber -
          (this.rowNumber - 1) * this.leftInterval) /
        2
    },
    // 获取瀑布流没列个数
    getRowNumber() {
      this.rowNumber = Math.floor(
        this.$refs.waterfall.clientWidth / (this.slideWidth + this.leftInterval)
      )
      console.debug( "this.rowNumber =", this.rowNumber,this.$refs.waterfall.clientWidth, this.slideWidth)
    },
    // 获取silde宽度
    getSildeWidth() {
      if (this.width) {
        this.slideWidth = this.width
      }
      if (this.allChildren.length) {
        //this.slideWidth = this.allChildren[0].$el.offsetWidth
        //console.debug( " this.allChildren[0] = ", this.allChildren[0].$el )
        let computedWidth = window.getComputedStyle(this.allChildren[0].$el, null).getPropertyValue('width')
        computedWidth =  Math.floor(parseFloat( computedWidth )) //父容器宽度是整数，这里需为整数
        console.debug( " this.allChildren[0] = ", this.allChildren[0].$el, "computedWidth=", computedWidth)
        this.slideWidth = computedWidth

      }

    },
    // 初始数据
    getInitData() {
      this.initData = Array.from({ length: this.rowNumber }).map(
        (item, index) => {
          return {
            top: this.top,
            left: this.left + (this.slideWidth + this.leftInterval) * index
          }
        }
      )
    },
    // 计算瀑布流dom位置
    async waterFall(children) {
      for (let i = 0; i < children.length; i++) {
        await children[i].getHeight(i)
      }
      children.forEach((item, index) => {
        item.top = this.initData[0].top
        item.left = this.initData[0].left
        this.initData[0].top += item.height + this.topInterval
        item.init = true
        this.initData.sort((a, b) => {
          return a.top - b.top
        })
      })
      this.childrens = []
      this.waterfallBoxHeight = [...this.initData].pop().top
      this.scrollMinHeight = [...this.initData].shift().top
      this.mount = true
    },
    // 更新布局
    _refreshWaterfall() {
      this.getSildeWidth()
      this.getRowNumber()
      this.getLeftValue()
      this.getInitData()
      this.waterFall(this.allChildren)
    },
    // 初始化
    _initWaterfall() {
      this.getSildeWidth()
      this.getRowNumber()
      this.getLeftValue()
      this.getInitData()
    },
    // 滚动判断，加载更多
    handleScroll() {
      console.debug( "handleScroll")
      let waterfall = this.$refs.waterfall
      if (!waterfall || !this.mount || this.finished) return
      let scrollTop = this.scrollingElement.scrollTop
      let waterfallButtom =
        waterfall.offsetTop + this.scrollMinHeight - this.offset - innerHeight
      if (scrollTop > waterfallButtom) {
        this.$emit('load')
        this.mount = false
      }
    }
  },
  computed: {
    // 视口变化
    resizeBindFn() {
      return debounce(this._refreshWaterfall, 100)
    },
    // 滚动
    scrollBindFn() {
      return throttle(this.handleScroll, 200)
    },
    // 获取瀑布流主体高度
    waterfallStyle() {
      return { height: this.waterfallBoxHeight + 'px' }
    },
    // 瀑布流容器,即处理scroll时间的element
    scrollingElement(){
      return this.container.$el
    }
  },
  watch: {

    childrens(val) {
      if (!val.length) return
      if (!this.initData) {
        this._initWaterfall()
      }
      this.mount = false
      this.waterFall(val)
    },
    // 监听是否加载完成
    finished(val) {
      if (val) {
        this.scrollingElement.removeEventListener('scroll', this.scrollBindFn)
      }
    }
  },
  mounted() {
    console.debug( "this.scrollingElement= ", this.scrollingElement)
    this.scrollingElement.addEventListener('resize', this.resizeBindFn)
    this.scrollingElement.addEventListener('scroll', this.scrollBindFn)
  },
  destroyed() {
    this.scrollingElement.removeEventListener('resize', this.resizeBindFn)
    this.scrollingElement.removeEventListener('scroll', this.scrollBindFn)
  }
}
</script>

<style lang="css" scoped>
.waterfall {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.loading-show {
  padding-bottom: 100px;
}
.loading-warp {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
}
.loading {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  animation: loading-rotate 0.8s linear infinite;
  animation-timing-function: steps(12);
  position: relative;
  display: inline-block;

}
.loading i{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
.loading i::before{
  width: 2px;
  height: 25%;
  content: ' ';
  display: block;
  margin: 0 auto;
  border-radius: 40%;
  background-color: currentColor;
}

.finished {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #969799;
  line-height: 50px;
  position: absolute;
  bottom: 20px;
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading i:nth-of-type(1) {  opacity: 1 ;  transform: rotate( 30deg); }
.loading i:nth-of-type(2) {  opacity: 0.9375 ;  transform: rotate( 60deg); }
.loading i:nth-of-type(3) {  opacity: 0.875 ;  transform: rotate( 90deg); }
.loading i:nth-of-type(4) {  opacity: 0.8125 ;  transform: rotate( 120deg); }
.loading i:nth-of-type(5) {  opacity: 0.75 ;  transform: rotate( 150deg); }
.loading i:nth-of-type(6) {  opacity: 0.6875 ;  transform: rotate( 180deg); }
.loading i:nth-of-type(7) {  opacity: 0.625 ;  transform: rotate( 210deg); }
.loading i:nth-of-type(8) {  opacity: 0.5625 ;  transform: rotate( 240deg); }
.loading i:nth-of-type(9) {  opacity: 0.5 ;  transform: rotate( 270deg); }
.loading i:nth-of-type(10) {  opacity: 0.4375 ;  transform: rotate( 300deg); }
.loading i:nth-of-type(11) {  opacity: 0.375 ;  transform: rotate( 330deg); }
.loading i:nth-of-type(12) {  opacity: 0.3125 ;  transform: rotate( 360deg); }
/*
.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .loading i:nth-of-type(@{i}) {
    opacity: 1 - (0.75 / 12) * (@i - 1);
    transform: rotate(@i * 30deg);
  }
  .generate-spinner(@n, (@i + 1));
}
.generate-spinner(12);
*/
</style>
