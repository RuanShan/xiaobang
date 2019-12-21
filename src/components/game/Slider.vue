<template>
  <!-- 锦囊 -->
  <div class="SlideBox">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="photo in slides">
          <img :src="photo.url"  />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>

</template>

<script>

  import Swiper from 'Swiper'
  export default {
    components: {
    },
    props: {
      slides:{
        type: Array
      }
    },
    data() {
      return {

        mySwiper: null
      }
    },
    created() {
    },
    mounted() {
      //如果渲染其它页面，也需要初始化. 如：排名，活动介绍，
      this.initSwiper()
    },
    computed: {
    },
    methods: {
      initSwiper() {
        this.$nextTick(() => {
          this.mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: false,
            autoplay: false,
            noSwiping: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            }
          })
        })
      }
    },
    watch: {
      slides: function(val, oldVal) {
        //如果slider数据变化，也需要初始化，如: 初始化游戏信息.
        this.initSwiper()
      }
    }
  }

</script>

<style lang="css" scoped>

  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    justify-content: center;
    align-items: center;
  }
  .swiper-slide img{
    width: 100%;
    height: auto;
  }

</style>
