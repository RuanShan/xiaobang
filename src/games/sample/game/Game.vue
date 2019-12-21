<template>
  <!-- 游戏模板示例： 不使用 lufylegend 画计时以及用户成绩 -->
<div class="gameBox">
  <div id="gameBgBox">
    <img id="gameBg" :src="gameBg" style="width:100%;height:auto;" />
  </div>

  <div id="gameTopBar" class="gameTopBar" >
    <div class="userInfoBox">
      <div class="userImgBox" style="border-color:"><img :src="gamePlayer.avatar" class="userImg" /></div>
      <div id="grade" class="grade">{{score}}</div>

    </div>
    <div class="timeBox">
      时间<br><span class="time">{{timer}}</span>
    </div>
  </div>
  <div id="gameLayerBox">
    <div class="sample sampleContent"> this is game body!</div>

    <div class="sample bottomSampleContent">
      <button class="weui-btn weui-btn_primary" @click="handleStart"> 开始游戏 </button>
      <button class="weui-btn weui-btn_primary" @click="handleEnd"> 游戏结束 </button> </div>
  </div>
  <SoundButton :hg="hg" :gamePlayer="gamePlayer"> </SoundButton>

</div>
</template>

<script>
import GameRes from './GameRes'
import SoundButton from '@/components/game/SoundButton.vue'

export default {
  name: 'Game',
  props: {
    hg: Object,
    gameState: String, // 游戏状态
    gameRound: Object,
    gamePlayer: Object
  },
  components: {
    SoundButton
  },
  data() {
    return {
      gameBg: null,
      score: 0,
      timer: 0
    }
  },
  created() {
  },
  mounted() {
    this.hg.assets.onReady(() => {
      this.gameBg = GameRes.skinAssets.gameBgPath
    })
    this.hg.time.on( 'setTime', (e)=>{
      console.log( "setTime", e)
      this.timer = e
    })
    this.hg.time.on('end', this.handleEnd)
  },
  methods: {
    handleInitGameData() {
      this.timer = 0
      this.hg.time.init()
      this.hg.grade.set(0)
      //$('.timeUpImg').hide();
      // _gameOver = false;
    },
    handleStart(){
      this.handleInitGameData()
      this.hg.time.start()
    },
    handleEnd(){
      this.hg.time.end()
      console.log( "handleEnd")
      this.$emit("game-over")

    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gameBox{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.gameBox .userInfoBox {
  margin-left: .75rem
}

.gameBox .userInfoBox .userImgBox {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  border-radius: 999px;
  border: .1rem solid rgba(255, 255, 255, .3)
}

.gameBox .userImgBox .userImg {
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 999px
}

.gameBox .userInfoBox .grade {
  display: inline-block;
  font-size: .9rem;
  line-height: 2.6rem;
  vertical-align: top;
  margin-left: .3rem
}

.gameBox .timeBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  text-align: center;
  font-size: .8rem;
  margin-top: .5rem;
  width: 4rem
}

.gameBox .timeBox .time {
  font-size: 1.3rem;
  font-weight: 700
}
.gameBox .soundIcon {
  right: 15px
}
#gameLayerBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.gameBox .sampleContent {
  position: absolute;
  width: 100%;
  top:25vh;
  bottom: 25vh;
  text-align: center;
}

.gameBox .bottomSampleContent {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
}
</style>
