<template>
  <!-- 锦囊 -->
  <div class="ruleBox" >
    <a  href="javascript:void(0)"  v-show="ui.iconVisible">
      <div class="ruleImg imgContainer absCenter" _mouseIn="0" >
        <div id="ruleImg"  @touchend="handleShowPopup" class="slaveImg abs notNeedFatherChage outSpecialDivAutoFit hd-img-fillDiv ruleImgAnimate" style='width: 3.5rem; height: 3.5rem; top: 0.35rem; left: 75vw;'></div>
      </div>
    </a>

   <div id="poupInfoBox">
     <div class="poupHead">
       <div class="poupTitleBox">
         <div id="actionExpBtn" class="poupTitleMune checked" _flag="0" @touchstart="showTab( 0 )">
           <div class="item">活动说明</div>
         </div>

         <div id="ranBtn" class="poupTitleMune " _flag="1"  @touchstart="showTab( 1 )">
           <div class="item">排行榜</div>
         </div>


         <div id="prizeBtn" class="poupTitleMune hide" _flag="3">
           <div class="item">我的奖品<span id='Award_Round_Dot' class='redDot hide'></span></div>
         </div>
         <div id="winnerBtn" class="poupTitleMune hide" _flag="4">
           <div class="item">获奖名单</div>
         </div>

         <div class="poupSlideBar">
           <div class="slideBarTip transitionPanel"></div>
         </div>
       </div>
       <div class="poupClose" @touchstart="handleHidePopup"></div>
       <div style="clear:both; height:0"></div>
     </div>
     <div id="popTabBox" class="popTabBox transitionPanel" style="left:0">

       <div id="ruleBox" class="poupMain" _flag="2" style="-webkit-overflow-scrolling:touch;">
         <div class="poupMainInfo">
           <div id="explainBox" class="poupLine" data-sortKey="a">
             <div class="mainTitle">游戏规则</div>

             <p id="explaiDrawInfoBox" class="" v-html="gameRound.desc">
             </p>

           </div>

           <div id="awardLine" class="poupLine hide" data-sortKey="b">
             <div class="mainTitle">活动奖品</div>
             <div id="awardLineBox">
               <div class='unComfortLine awardItem '><span class='awardStyle'>一等奖</span> : <span class='award'>价值100元礼品</span></div>
               <div class='unComfortLine awardItem '><span class='awardStyle'>二等奖</span> : <span class='award'>价值50元礼品</span></div>
               <div class='unComfortLine awardItem '><span class='awardStyle'>三等奖</span> : <span class='award'>价值10元礼品</span></div>
               <div class='unComfortLine awardItem hide'><span class='awardStyle'>四等奖</span> : <span class='award'>价值5元小礼品</span></div>
               <div class='unComfortLine awardItem hide'><span class='awardStyle'>五等奖</span> : <span class='award'>价值5元小礼品</span></div>
               <div class='unComfortLine awardItem hide'><span class='awardStyle'>六等奖</span> : <span class='award'>价值5元小礼品</span></div>
               <div class='unComfortLine awardItem hide'><span class='awardStyle'>七等奖</span> : <span class='award'>价值5元小礼品</span></div>
               <div class='unComfortLine awardItem hide'><span class='awardStyle'>八等奖</span> : <span class='award'>价值5元小礼品</span></div>
               <div class='awardItem anwei hide'><span class='awardStyle'>安慰奖</span> : <span class='award'>价值5元小礼品</span></div>

             </div>
             <div id="selfAwardLine" class="hide" style="word-wrap: break-word;"></div>
           </div>

           <div id="gameDateTime" class="poupLine" data-sortKey="c">
             <div class="mainTitle">活动时间</div>
             <p><span id="startDate">{{displayStartAt}}</span>&nbsp;-&nbsp;<span id="endDate">{{displayEndAt}}</span></p>
           </div>
           <div class="hostLine poupLine" data-sortKey="d">
             <div class="mainTitle">奖品描述</div>
             <pre v-html="gameRound.award_desc"> </pre>
           </div>

           <!--<div id="" style="font-size: 0.6rem; position: relative;" class="noMove">投诉</div>-->
         </div>

       </div>

       <div id="rankBox" class="poupMain hide" _flag="1" style="-webkit-overflow-scrolling:touch;">
         <div class="poupMainInfo">
           <div id="noRank" class='' v-show="!hasRank">暂无排名</div>
           <div id="rankMain" class="getRankHeight" v-show="hasRank">
             <div style="margin-top:0.7rem;margin-left: 0.25rem;">当前排名：<span id="rank"> {{currentPlayerRank}}</span> （只显示前<span id="showRankNum">100</span>名）</div>
             <div style="padding:0rem 0.5rem">
               <table class="rankTable" cellspacing="0" cellpadding="0">
                 <thead>
                   <tr style="line-height: 1rem;">
                     <th>排行</th>
                     <th>头像</th>
                     <th>昵称</th>
                     <th>成绩</th>
                   </tr>
                 </thead>
                 <tr class="rankInfo" v-for="(player,i) in gamePlayerRank">
                   <td>{{i+1}}</td>
                   <td><div><img class="userImg" :src="player.avatar"   /> </div></td>
                   <td class="userName" > {{player.nickname}}</td>
                   <td> {{player.max_score}} 个</td>
                 </tr>

               </table>
             </div>
           </div>
           <div id="rankHeight">
             <table id="rankInfoBox" class="rankTable" cellspacing="0" cellpadding="0" style="margin-top: 0;"></table>
           </div>
         </div>

       </div>

       <div id="awardBox" class="poupMain hide" _flag="3">
         <div id="awardInfoBox">
           <div id="awardInfo">
             <div style="line-height: 2.6rem">暂无中奖记录</div>
           </div>

           <div id="awardContactInfo" class="hide">
             <div class="titleLine"><span class="title">联系信息</span></div>
             <div class="contactGroup">
               <div class="contactItem contactName hide">姓名： <span>monica</span></div>
               <div class="contactItem contactPhone hide">电话： <span>13200000000</span></div>

               <div class="contactItem contactAddress hide">地址： <span>广东省广州市海...</span></div>

             </div>
             <div class="updateBtn abs">修改</div>
           </div>
         </div>
         <div class='attentionBox'>
           <div class='menuBtnBox'>
             <a class='menuName'>关注我们</a>
           </div>
           <div class='holdBox'></div>
         </div>
       </div>

       <div id="regAwardBox" class="poupMain hide" _flag="4" style="-webkit-overflow-scrolling:touch;">
         <div class="poupMainInfo">
           <div id="noRegAward" class="hide" style="margin-left:3px;">尚未公布获奖名单，详情请查看活动说明</div>
           <div id="regAwardMain" style="display:none;">

             <div class="regAwardList">
               <div class="mainTitle">一等奖</div>
               <div class="playerName" style="margin-bottom:12px;"></div>
             </div>

             <div class="regAwardList">
               <div class="mainTitle">二等奖</div>
               <div class="playerName" style="margin-bottom:12px;"></div>
             </div>

             <div class="regAwardList">
               <div class="mainTitle">三等奖</div>
               <div class="playerName" style="margin-bottom:12px;"></div>
             </div>

           </div>
         </div>
         <div class='attentionBox'>
           <div class='hdskillInfo skillInfo theRunningAdClass'><a class="theSpecialTarget" href=''>我也要创建活动</a><span class='gotoFlag'><i></i></span></div>
           <div class='holdBox'></div>
         </div>
       </div>
     </div>
   </div>

   <div id="activityKit" class="poupMain bg hide">
     <div class="arrow" id="arrow"></div>
     <div id="tip_txt">
       <p>提示</p>
       <p style="margin-top: 0.25rem">点击锦囊即可查看活动规则、排行榜、奖品等信息。</p>
     </div>
   </div>

 </div>
</template>

<script>
import $ from "jquery"
import {
  getRanking
} from '@/api/games/sample'
import dayjs from 'dayjs';

import HdGame from '@/lib/hdgame'

export default {
  props: {
    gameRound: { // 游戏成绩相关数据
      type: Object
    },
    ruleIconUrl: String, // 锦囊按钮图片
    command:{
      default: 'none' // 可选值: showResult, showGift
    },
    gamePlayer:{
      type: Object
    }
  },
  data() {
    return {
      ui:{
        iconVisible: false,
        statusBox: true,
        statusScrollWrap: true,
        noRank: false,
        rankMain: false
      },
      style:{
        statusUserImg: {}
      },
      gamePlayerRank: [],
      menuLen: 2,
      currentPlayer:{}
    }
  },
  created() {
    window.$ = $
  },
  mounted(){
    // mounted 之后 document 才有ruleIme，可以设置css
    HdGame.imgReady(this.ruleIconUrl, (img)=>{
      console.log( "imgReady", this.ruleIconUrl)
      $("#ruleImg").css({
        "background-size": "100% 100%",
        "background-image":"url("+this.ruleIconUrl+")",
      })
      //this.ui.iconVisible = true // 如果是用户注册界面，不应显示icon
    })

    $(".poupTitleBox .poupTitleMune,.poupTitleBox .slideBarTip").css("width", 13.25 / this.menuLen + "rem");
    $("#poupInfoBox .poupMain").height($("#poupInfoBox").height() - $(".poupHead").outerHeight()  );

  },
  computed:{
    hasRank(){
      return this.gamePlayerRank.length > 0
    },
    currentPlayerRank(){
      return (this.currentPlayer.rank!=undefined&&this.currentPlayer.rank!=null) && this.currentPlayer.rank>=0 ? this.currentPlayer.rank : '无'
    },
    displayStartAt(){
      return dayjs(this.gameRound.start_at).format('YYYY年MM月DD日 HH时mm分')
    },
    displayEndAt(){
      return dayjs(this.gameRound.end_at).format('YYYY年MM月DD日 HH时mm分')
    }
  },
  methods: {

    //
    async handleShowPopup( event ){
      // event.preventDefault()
      var silkBag = $("#ruleImg");
      var popupX = silkBag.offset().left + silkBag.width() / 2 + "px ";
      var popupY = silkBag.offset().top + silkBag.height() / 2 + "px";
      $("#poupInfoBox").css({
        "transform-origin": popupX + popupY,
        "-webkit-transform-origin": popupX + popupY
      });

      this.setSlideBar(true)
      this.showTab( event  )
    },
    handleHidePopup(){
      var poupInfoBox = $("#poupInfoBox");
      poupInfoBox.removeClass("enlarge").removeClass("retrans");
      poupInfoBox.hide()
    },
    // 点击查看成绩
    setSlideBar(isAnimation){

        var anFlag = isAnimation;
        if (anFlag) {
          if (!$("#poupInfoBox").hasClass("enlarge")) {
            $("#poupInfoBox").addClass("enlarge")
          }
        } else {
          $("#poupInfoBox").addClass("retrans")
        }
        //$(".gameBox,.home,.body").addClass("overflow-y-hidden");
    },
    showTab( flag ){
      console.log('showTab',flag);
      $("#poupInfoBox").show();
      $(".poupTitleMune").removeClass("checked");

      $(".poupTitleBox .poupTitleMune").each(function(i, value) {
        if ($.trim($(this).attr("_flag")) == flag) {
          $(this).addClass("checked")
        }
      })

      $(".poupSlideBar .slideBarTip").css("left", (13.25 / this.menuLen) * flag + "rem")

      if (flag === 0) {
        this.poupRule()
      } else
      if (flag === 1) {
        this.poupRank()
      }
    },
    poupRank(){

      var params = {
        openid: this.gamePlayer.openid,
        number:this.gameRound.number
      }
      getRanking(params).then(data => {
        var rankInfo = data
        console.log('rankInfo====:',rankInfo);
        this.gamePlayerRank = rankInfo['allPlayer']
        this.currentPlayer = rankInfo['thisPlayer']
      })
      $('.poupMain').not("#rankBox").hide()
      $("#rankBox").show()
    },
    poupRule(){
      $('.poupMain').not("#ruleBox").hide()
      $("#ruleBox").show()
    }
  },
  watch: {
    command: function (val, oldVal) {
      //外部触发游戏开始
      console.log('rulebox','watch-command new: %s, old: %s', val, oldVal)
      if( val == 'showIcon'){
        this.ui.iconVisible = true
      }
      if( val == 'hideIcon'){
        this.ui.iconVisible = false
      }
      if( val == 'showResult'){
        this.showResult()
      }
      if( val == 'showRank'){
        this.handleShowPopup( 1 )
      }
      // 用于重置command值，以便下次调用时不会因为相同而不触发。
      this.$emit('update:command', null)

    }
  }
}
</script>

<style lang="css" scoped>
  .ruleBox{

  }
  .poupMain{
    /*display: none;*/
  }
</style>
