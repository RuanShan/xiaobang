
class GameEvent{

  // type 返回当前 Event 对象表示的事件的名称。
  // target 返回触发此事件的元素（事件的目标节点）。
  constructor( target){
    this.target = target
  }
}


class GameStartEvent extends GameEvent{
  // 必须设置 eventname，babel处理后 函数名为 'e'， 所有name 为 'e'

  constructor( target){
    super( target)
    this.ename = 'GameStartEvent'
  }
}

class GameEndEvent extends GameEvent{

  constructor( target){
    super( target)
    this.ename = 'GameEndEvent'
  }
}

// 得分事件
class GameScoreChangedEvent extends GameEvent{

  constructor( target, changedScore){
    super( target)
    this.changedScore = changedScore
    this.ename = 'GameScoreChangedEvent'
  }
}

// 游戏背景音乐加载
class GameBackgroundMusicLoadEvent extends GameEvent{

  constructor( target){
    super( target)
    this.ename = 'GameBackgroundMusicLoadEvent'
  }
}

module.exports = {
  GameEvent,
  GameStartEvent,
  GameEndEvent,
  GameScoreChangedEvent,
  GameBackgroundMusicLoadEvent
}
