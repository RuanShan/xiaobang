<div class="home" v-show="ui.homeVisible">

  <div id="homeBgBox">
    <img id="homeBg" :src="skinAssets.homeBgImg" />
  </div>
  <div class="gameInfoBox">
    <div class="titleImg imgContainer absCenter">
      <img id="titleImg" class="slaveImg abs" :src="skinAssets.titleImg" style="width:auto;height:9rem;top:11vh;left:15vw;" />
    </div>
  </div>

  <div id='joinNumLine' class='joinNumLine absCenter hide'
    style='top:23.424rem;left:3.3706666666666667rem;color:rgb(255,255,255);font-size:0.5546666666666666rem; text-shadow:rgb(255,62,7) -1px -1px 0px, rgb(255,62,7) 0px -1px 0px, rgb(255,62,7) 1px -1px 0px, rgb(255,62,7) 1px 0px 0px, rgb(255,62,7) 1px 1px 0px, rgb(255,62,7) 0px 1px 0px, rgb(255,62,7) -1px 1px 0px, rgb(255,62,7) -1px 0px 0px;'>
    已有 <span id='joinNum' class="specil"
      style="color:rgb(255,255,255);font-size:0.5546666666666666rem;text-shadow:rgb(255,62,7) -1px -1px 0px, rgb(255,62,7) 0px -1px 0px, rgb(255,62,7) 1px -1px 0px, rgb(255,62,7) 1px 0px 0px, rgb(255,62,7) 1px 1px 0px, rgb(255,62,7) 0px 1px 0px, rgb(255,62,7) -1px 1px 0px, rgb(255,62,7) -1px 0px 0px;">4346</span>
    人参加活动
  </div>

  <div id="playInfo" class="abs editTarget-playInfo hide" style="width:9rem;text-align:center;">
    <div class="dayPlayHint">您今天还有 <span id="count" class="specil todayPlayCount"></span> 次参与机会</div>
    <div class="totalPlayHint">您还有 <span class="totalPlayCount specil"></span> 次参与机会</div>
    <div class="dayPlayHint4Total">今天有 <span class="count specil todayPlayCount"></span> 次</div>
  </div>
  <div id="startBtn" class="startBtn imgContainer absCenter" style="">
    <img @touchend.prevent="handleStartGame" id="startBtnImg" class="slaveImg abs" :src="skinAssets.startBtnImg" style="width:7.35rem;height:2.25rem;top:75vh;left:4.6rem;" />
  </div>

  <div id="logoImgBox" class="logoImgBox imgContainer absCenter" style="">
    <img id="logoImg" class="slaveImg abs" :src="skinAssets.logoImgPath" style="width:auto;height:2.5rem;top:0.4rem;left:0.4rem;" />
  </div>
</div>
