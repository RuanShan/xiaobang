<template>
<div class="resuleBox "  >
  <div id="resule-status-box" style="display:none" v-show="ui.statusBox">

    <div id="resule-status-scrollWrap" v-show="ui.statusScrollWrap">
      <div class="resule-bgLight" v-show="ui.statusBgLight"></div>
      <div id="resule-status-bird" v-show="ui.statusBird"></div>
      <div class="optContainer" style="height: 18.6rem; overflow-y:auto;">
        <div id="resule-status-head">
          <div class="resule-status-userImg" :style="style.statusUserImg">
            <img v-bind:src="params.headImg">
          </div>
          <div id="resule-status-ribbon" class="resule-status-ribbon"></div>
        </div>
        <div id="resule-status-body">
          <p class="youraward" style="font-size:0.8rem; line-height:1.2rem">您的成绩为：<span class="resuleArg" style="font-size:0.8rem;">{{params.gameScore}}</span><span class="result-scoreUnit" style="font-size:0.8rem;"><span class="gameScoreUnit"></span></span>
          </p>
          <p class="youraward costTime hide" style="font-size:0.8rem; line-height:1.2rem">达到该成绩用时：<span class="resuleArg" style="font-size:0.8rem;">{{params.gameCostTime}}</span><span class="result-scoreUnit" style="font-size:0.8rem;">个</span></p>
          <p class="youraward special hide" style="font-size:0.8rem; line-height:1.2rem">通关并且</p>
          <p class="beat-Percent hide" v-show="ui.statusBeatPercent">成功击败全国<span>{{params.beat}}</span>%的玩家</p>
          <p class="resule-status-minscorex" style="display:none;">成绩必须达到 <span class="resuleArg resulescoreLimit">{{params.minScore}}</span> <span class="gameScoreUnit">个</span>才能<span id="minscoreDrawFont">抽奖</span></p>

          <p id="bestArg" style="margin-top:0.5rem">最佳成绩为：<span class="resuleArg">{{params.bestScore}}</span><span class="result-scoreUnit"><span class="gameScoreUnit">个</span></span>
          </p>
          <p id="bestCostTime" style="display: none">达到最佳成绩用时：<span class="resuleArg">{{params.bestCostTime}}</span><span class="result-scoreUnit">个</span></p>
          <p id="bestRank">当前排名为：<span class="result-scoreUnit2">NO.</span><span class="resuleArg">{{params.rank}}</span></p>
          <p>成功击败<span class="resuleArg">{{params.beat}}</span>%的玩家</p>
          <div id="rank_showRule" style="text-decoration:underline;margin:0.7rem 0rem;" class="hide" onclick="showRule();">活动规则</div>


        </div>
        <div id="resule-status-other" class="hide">
          <p style="font-size:0.8rem;font-weight:bold;">通关并且</p>
          <p class="resule-status-minscorex hide" style="margin: 10px 0px 50px;">成绩必须达到 <span class="resuleArg resuleArg-fail resulescoreLimit">{{params.minScore}}</span> <span class="gameScoreUnit">个</span>才能抽奖</p>
        </div>
        <div id="resule-sucReg" class="hide" style="margin-top:0.6rem"> </div>
        <div class="resule-foot-box">
          <div class="resule-foot-one">
            <div class="resule-button resule-one-button resule-status-gift hide">赶紧去抽奖</div>
            <div class="resule-button resule-one-button resule-status-reg hide">我要报名</div>
            <div class="resule-button resule-one-button resule-status-again hide">再玩一次</div>
            <div class="resule-button resule-one-button resule-status-send hide">领取礼品</div>
            <div class="resule-button resule-one-button resule-status-rightNow hide">马上PK</div>
          </div>
          <div class="resule-foot-two">
            <div  @touchstart="handlePlayAgain" class="resule-button resule-status-again restart-again ">再玩一次</div>
          </div>

        </div>
      </div>
      <div class="attentionBox">
        <div class=" resule-foot-box">
          <div id="drawMenuBtnBox" class="menuBtnBox resule-foot-two">
            <div  @touchend="handleSeeRank" id="resule_seeRank_show" class="resule-button resule-status-seeRank">排行榜</div>
            <div @touchend="handleGoHome" class="resule-button resule-status-home">返回首页</div>
          </div>
        </div>

        <div class="holdBox"></div>
      </div>
    </div>

    <div id="resule-status-lotsBox" style="display:none">
      <img id="resule-status-lots" class="editTarget-lotsPot">
      <div id="resule-status-lotsHand" class="editTarget-lotsShakeHand">
        <div class="shakeHand"></div>
        <div class="shakeTxt"></div>
        <div class="waitDrawBtn" style="display:none">点击抽奖</div>
      </div>
    </div>
  </div>
  <div id="resule-gift-box" style="display:none">
    <div id="resule-gift-scrollWrap" class="resule-gift-overflowScrolling" style="padding-top:1.2rem;position:relative;z-index:300;">

      <div class="resule-bgLight"></div>

      <div id="luckContainer" style="position:absolute; width: 100%;z-index:250;">
        <p id="resule-gift-luck" style="text-align:center;">恭喜你获得了</p>

        <div class="imgContentLimit hide" style="width: 14rem; height: 30rem; position: absolute;"></div>
        <div class="imgContainer xydzp_GiftPos" style="position:relative;">
          <img id="resule-gift-sucImg" class="slaveImg">

        </div>

        <div id="resule-gift-foot">
          <p id="resule-gift-rank"> <span class="rank gifArg awardStyle"></span> </p>
          <p id="resule-gift-goods"> <span class="goods gifArg awardName"></span> </p>
        </div>

        <div id="resule-gift-buttonMenu">

          <div class="giftBtnBox lookDetail orangeBtn">
            <a class="seeAwardDetail buttonContent">查看奖品详情</a>
          </div>

          <div class="resule-gift-draw repeatDraw greenBtn flowBtn " data-awarded="true">继续抽奖</div>
          <div class="resule-gift-home menuBack menuBack2 greenBtn flowBtn">返回首页</div>

        </div>

      </div>
    </div>

    <div id="faiImgBox">
      <div class="cannotGetThePriceBox"></div>

      <img class="abs editTarget-theGetPricePic theUnPriceImg imgPreventDefault" id="theGetPricePic" />

      <div class="resule-gift-draw repeatDraw ">继续抽奖</div>
      <div class="resule-gift-home menuBack menuBack2">返回首页</div>

    </div>

    <div id="resule-gift-buttonMenu-bottom">

      <div class="giftBtnBox lookDetail orangeBtn">
        <a class="seeAwardDetail buttonContent">查看奖品详情</a>
      </div>

      <div class="bottom-line">
        <div class="resule-gift-draw repeatDraw greenBtn flowBtn " data-awarded="true">继续抽奖</div>
        <div class="resule-gift-home menuBack menuBack2 greenBtn flowBtn">返回首页</div>
      </div>

    </div>

    <div class="attentionBox">

      <div class="menuBtnBox btnB" style="margin-bottom:4rem;">

        <a class="menuName">关注我们</a>
      </div>
      <div class="holdBox"></div>
    </div>
  </div>
</div>
</template>

<script>
import $ from "jquery";
import HdGame from '@/lib/hdgame'

export default {
  props: {
    params: { // 游戏成绩相关数据
      type: Object,
      default: {}
    },
    againCallback: {
      type: Function
    },
    gamePlayerAvatar:{
      default: ''
    },
    isVisible: {
      default: false
    },
    command:{
      default: 'none' // 可选值: showResult, showGift
    }
  },
  data() {
    return {
      menuLen: 2,
      ui:{
        statusBox: true,
        statusScrollWrap: true
      },
      style:{
        statusUserImg: {}
      }
    }
  },

  created() {
  },
  methods: {
    // 返回首页
    handleGoHome(event) {
      this.$emit('homeBtnClicked')

    },
    // 再玩一次
    handlePlayAgain( event){
      this.$emit('restartBtnClicked')
       // this.againCallback();

    },
    // 点击查看成绩
    handleSeeRank( event ){
      console.log( " handleSeeRank ")
      this.$emit('rankBtnClicked')
    },

    showResult(){
      var resuleDef = {
        isSuc: false,
        gameScore: 0,
        minScore: 0,
        bestScore: 10,
        rank: 10,
        count: 3,
        beat: 99,
        notreal: false,
        gameType: 0,
        gameCostTime: 0,
        bestCostTime: 0
      };
      console.log('params=====:',this.params);
      var arg = Object.assign(resuleDef, this.params);
      this.ui.statusScrollWrap = true
      this.ui.statusBox= true

      //HdGame.fadOut(this.resuleBox);
      //$("#resule-status-scrollWrap").css("height", $(window).height() - 1.2 * g_rem);
      if (arg.gameScore === "fail") {
        this.ui.statusBody = false
        this.ui.statusOther = true
      } else {
        this.ui.statusBody = true
        this.ui.statusOther = false
      }
      console.log('arg in result=====:',arg);
      if (arg.isSuc) {
        //游戏成功
        HdGame.isplaySucess = true;
        this.ui.statusBird = false
        $("#resule-status-ribbon").removeClass("resule-status-faiRibbon").removeClass("resule-status-faiRegRibbon").addClass("resule-status-ribbon");
        this.style.statusUserImg = {borderColor: "#70D572"}
        this.ui.statusMinscore = false
        this.ui.statusCount = true

        if (arg.gameType == 1) {
          this.ui.statusCount = false
          //$("#resule-foot-box").css("margin-top", "0.6rem");
          this.ui.statusAgain = true
          this.ui.statusHome = true
        }

        //resulePoup.exposeFlag = true;
        this.ui.statusBgLight = true

        this.ui.statusBeatPercent = true
      } else {
        //游戏失败, 飞乌鸦
        this.ui.statusBird = true
        $("#resule-status-ribbon").removeClass("resule-status-ribbon").addClass("resule-status-faiRibbon")
        this.style.statusUserImg = {borderColor: "#B5B5B5"}

        this.ui.statusMinscore = true
        this.ui.statusCount = false
        this.ui.statusBgLight = false
        this.ui.statusAgain = true
        this.ui.statusHome = true

        this.ui.statusBeatPercent = false
        HdGame.isplaySucess = false
      }
    }
  },
  watch: {
    command: function (val, oldVal) {
      //外部触发游戏开始
      console.log('watch-command new: %s, old: %s', val, oldVal)
      if( val == 'showResult'){

        this.showResult()
      }
      this.$emit('commandDone')

    }
  }

}
</script>

<style lang="css" scoped>

</style>
