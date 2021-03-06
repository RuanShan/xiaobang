import _ from "lodash"
import { initializeCallback } from './helpers'

var _timer = null, _timeFlag, _timeLock = 0;


// g_config.countsTimeType, g_config.scoreType
function Time( initTime, options={} ){

  this.initTime= initTime,

  this.val= 0,
  this.pastTime= 0,
  this.interval= 140,
  this.range= [70, 280],
  this.target= null,
  this.acceList= null,
  this.status= "ended",

  this.targetFlag= true,  // 是否更新target
  this.gameCostTime= 0,
  this.frameInc= 0;

  this.options = {
    isDesc: true,
    updateFlag: false // 缺省情况下使用，lufy.show事件更新时间。
  }
  Object.assign( this.options, options )

  // 可能在运行过程中改变, 如 记忆力考验游戏
  this.isDesc = this.options.isDesc
  //if (this.initTime === 99999) {
  //  return
  //} ! this.target && (this.target = $(".time"));
  this.val = this.initTime;
  this.pastTime = 0;
  initializeCallback(this, ["end", "timer", "acce", "setTime"]);

}

const Methods = {
  init(){
    this.val = this.initTime;
    this.pastTime = 0;
    this.setTarget();
  },
  setInitTime( initTime ){
    this.initTime = initTime
    this.init()
  },
  setAcceList(list) {
    if (typeof list === "number") {
      var n = list;
      list = [];
      for (var i = 0; i < n; i++) {
        list.push((n - i) * (this.initTime / (n + 1)))
      }
    }
    this.acceList = list;
    return this
  },
  setTarget() {
    console.debug( " setTarget.val=", this.val)
    var val = this.changeTwoDecimal_f(this.val);
    //this.targetFlag && this.target.text(val);
    this.fireWith("setTime", this, val)
  },

  start() {
    if (this.initTime === 99999) {
      return
    }
    _timeFlag = new Date().getTime() / 1000;
    if (this.options.updateFlag && this.status === "ended") {
      this.status = "runing";
      this.play()
    } else {
      this.status = "runing"
    }
    console.debug( " time start ", this,this.status)
    return this
  },
  isRunning() {
    return this.status === "runing"
  },
  pause() {
    this.status = "pause"
  },
  end() {
    if (this.status === "ended") {
      return
    }
    clearTimeout(_timer);
    _timeLock = 0;
    this.update();
    this.status = "ended";
    return this
  },
  setTime() {
    console.debug( " time setTime ", this.status)

    var now = (new Date).getTime() / 1000;
    var delta = now - _timeFlag;
    var r = this.isDesc ? -1 : 1;
    if (this.range[0] > 0 && delta < this.range[0] / 1000) {
      delta = this.range[0] / 1000
    } else {
      if (this.range[1] > 0 && delta > this.range[1] / 1000) {
        delta = this.range[1] / 1000
      }
    }
    this.val += r * delta;
    this.pastTime = r * (this.val - this.initTime);
    _timeFlag = now;
    if (this.isDesc) {
      if (this.acceList) {
        for (var i = 0; i < this.acceList.length; i++) {
          if (this.val <= this.acceList[i] && _timeLock == i) {
            _timeLock++;
            this.fireWith("acce", this, [_timeLock]);
            break
          }
        }
      }
      if (this.val <= 0) {
        this.val = 0;
        this.pastTime = this.initTime;
        this.setTarget();
        clearTimeout(_timer);
        _timeLock = 0;
        this.status = "ended";
        this.fireWith("end", this);
        return
      }
    }
    this.setTarget()
  },
  update() {
    if (this.initTime === 99999) {
      return
    }
    if (this.status !== "pause") {
      this.setTime()
    }
    this.fireWith("timer", this, [this.status !== "pause"])
  },
  play() {
    this.update();
    if (this.status !== "ended") {
      //_timer = setTimeout(arguments.callee.bind(this), this.interval)
      _timer = setTimeout( ()=>{
        this.play();
      }, this.interval)
    }
  },
  updateInFrame(delta) {
    if (this.initTime === 99999) {
      return
    }
    if (this.status === "ended") {
      return
    }
    if (delta < 0) {
      delta = 0
    }
    this.frameInc += delta;
    if (this.frameInc >= this.interval) {
      this.update();
      this.frameInc = 0
    }
  },
  changeTwoDecimal_f(x) {
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf(".");
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += "."
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += "0"
    }
    return s_x
  }
}

_.extend(Time.prototype, Methods)

//Time.init();

export default Time
