const YiySocketEvent = {
  OpenGameEvent: "OpenGameEvent",
  GetGamePlayersEvent: "GetGamePlayersEvent",
  StartGameEvent: "StartGameEvent",
  ResetGameEvent: "ResetGameEvent",
  GameStartingEvent: "GameStartingEvent", // data: countTime
  GameRunningEvent: "GameRunningEvent",
  GameOpeningEvent: "GameOpeningEvent",
  GameEndEvent: "GameEndEvent",
}
// 游戏socketio通讯
// 游戏流程
// PC端（控制端）
// 准备开始-> 玩家签到 -> 点击开始游戏 ->(开始前倒计时)->游戏进行中-> 游戏结束 ->显示排名
const {
  getGameRoundNumber
} =require( './helper')
const YiyRunner  =require(  '../../models/dpgame/yiy/runner')
const {
  DpGameRoundStates
}  =require(  '../../models/constant')
const {
  socketioLogger
}  =require(  '../../helpers/logger')

const logger = socketioLogger

module.exports=class DpYiySocket {
  // bind on connection
  static async bind(io) {
    const dynamicNsp = io.of(/^\/channel-dpyiy-\w+$/).on('connect', (socket) => {

      // broadcast to all clients in the given sub-namespace
      let number = getGameRoundNumber(socket)
      const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'

      newNamespace.emit('hello');
      DpYiySocket.bindPlay(socket, number);
      DpYiySocket.bindPlayWx(socket, number);

    });

  }

  static async bindPlayWx(socket, number) {
    // 监听客户端“摇一摇”事件
    // 参数 game_player_id, count
    // io.on('ShakeEvent', function(ctx, data){
    //   logger.info('data-------:',data);
    //   let game_player_id = data.game_player_id
    //   let score = data.score
    //   let game_round_id = YiySocket.getGameRoundId( ctx )
    //   let runner =  new YiyRunner(game_round_id)
    //
    //   runner.updatePlayerScore(game_player_id, score ).then((result)=>{
    //     logger.info(' updatePlayerScore return ',result )
    //   })
    //   logger.info(`ShakeEvent:game_player_id= ${game_player_id} score =${score}`)
    //   //ctx.acknowledge({ })
    // });

    socket.on('ShakeEvent', async (data, callback) => {
      logger.info('ShakeEvent');
      logger.info('data-------:',data);
      const namespace = socket.nsp; // newNamespace.name === '/dynamic-101'
      let runner = new YiyRunner(number)
      let game_player_id = data.game_player_id
      let score = data.score
      runner.updatePlayerScore(game_player_id, score ).then((result)=>{
        logger.info(' updatePlayerScore return ',result )
      })

    });

    // socket.on('addReultEvent', async (data, callback) => {
    //   logger.info('addReultEvent');
    //   logger.info('data-------:',data);
    //   const namespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    //   let runner = new YiyRunner(number)
    //   let game_player_id = data.game_player_id
    //   let score = data.score
    //   runner.insertGameResult(game_player_id, score ).then((result)=>{
    //     logger.info(' insertGameResult return ',result )
    //   })
    //
    // });
	}


  // 绑定大屏游戏页面触发的事件
  static async bindPlay(socket, number) {

    // 游戏开始签到事件
    socket.on('OpenGameEvent', async (data, callback) => {
      logger.info('OpenGameEvent');
      const namespace = socket.nsp; // newNamespace.name === '/dynamic-101'
      let runner = new YiyRunner(number)
      let game_round = await runner.openRound()
      socket.emit('GameOpeningEvent', {
        gameState: 'open'
      });
      let payload = {
        gameState: 'open'
      }
      namespace.emit('GameOpeningEvent', payload);
      callback({
        gameRoundState: game_round.state
      })
    });

    // 取得签到用户事件
    socket.on('GetGamePlayersEvent', async (data, callback) => {
      logger.info("GetGamePlayersEvent:", socket.id)
      let number = getGameRoundNumber(socket)
      let runner = new YiyRunner(number)
      let gamePlayers = await runner.getAllPlayers()
      callback({
        gamePlayers
      })
    });

    //当游戏结束后，调用这个事件，列出成绩
    socket.on('GetGameResultsEvent', async (data, callback) => {
      logger.info("GetGameResultsEvent:", socket.id)
      let number = getGameRoundNumber(socket)
      let runner = new YiyRunner(number)
      let gamePlayers = await runner.getAllResults()
      callback({
        gamePlayers
      })
    });

    // 游戏开始玩事件
    socket.on('StartGameEvent', async (data, callback) => {
      const namespace = socket.nsp; // newNamespace.name === '/dynamic-101'
      logger.info("StartGameEvent:", socket.client.id)
      logger.info("StartGameEvent rooms=", socket.rooms);

      let countTime = 3

      let number = getGameRoundNumber(socket)

      //let game_round = await MemoryDbOperation.GetRoundById(game_round_id)
      //let gamePlayers = await game_players.findAll( {where: { game_round_id }})
      //改变游戏状态
      let runner = new YiyRunner(number)
      let gameRound = await runner.startRound()
      let runningTime = gameRound.duration

      // 这时游戏状态是started
      callback({
        gameRoundState: DpGameRoundStates.starting,
        gameRound: gameRound
      })

      //点击开始游戏，开始倒计时 ，3， 2， 1
      var countTimeId = setInterval(function() {
        // 玩家端，当在倒计时时间内完成，即时上报成绩，或当倒计时时间为1时，结束游戏，上报成绩
        // 2秒时间内: 服务器广播倒计时1-> 玩家收到倒计时1事件 -> 上报成绩 ->服务器收到最后成绩
        if (countTime < 1) {
          clearInterval(countTimeId);
          // 触发客户端的开始游戏事件
          var runningTimeId = setInterval(function() {
            if (runningTime <= 1) {
              clearInterval(runningTimeId);
              logger.info('......socket:broadcast:GameEndEvent')
              let payload = {
                gameRoundState: DpGameRoundStates.completed
              }
              runner.endRound().then(()=>{
                runner.getAllPlayers().then((players) => {
                  players.sort((a, b) => {
                    return b.score - a.score
                  })
                  payload.gamePlayerScores = players

                  namespace.emit('GameEndEvent', payload);


                }).catch(function(err) {
                  logger.info("GameEndEvent", err)
                })
                return;
              })
            }
            let lastRunningTime = runningTime -1

            // PC端 返回玩家成绩
            runner.getPlayerScores().then((players) => {
              let cachedPlayers = players
              cachedPlayers.forEach((player) => {
                player.id = player.player_id,
                  player.score = player.score, //parseInt(Math.random()*1000) //
                  player.percent = player.score * 100 / (gameRound.duration*34);
              })
              var topPlayers = cachedPlayers.slice(0, 20)
              namespace.emit('GameRunningEvent', {
                timeToEnd: lastRunningTime,
                gamePlayerScores: topPlayers,
                gameRoundState: DpGameRoundStates.started
              });
              logger.info(`......socket:broadcast->${namespace.name}:startGame${runningTime} - ${cachedPlayers.length}`)
            }).catch(function(err) {
              logger.info("GameRunningEvent", err)
            })
            runningTime--;
          }, 1000);
          //namespace.emit('GameStartEvent');
          callback({
            gameRoundState: DpGameRoundStates.completed
          })
          return
        }

        // 触发客户端的倒计时事件
        let payload = {
          gameRoundState: DpGameRoundStates.starting,
          timeToStart: countTime
        }
        countTime--;
        namespace.emit('GameStartingEvent', payload);

        logger.info(`......socket:broadcast->${namespace.name}:startingGame${countTime}`)
      }, 1000);
    })

    // 重置游戏，清除游戏玩家和成绩，重新开始
    //       remove_players 1,0 是否删除玩家
    socket.on('ResetGameEvent', async (data, callback) => {
      logger.info('ResetGameEvent.')
      let number = getGameRoundNumber(socket)
      let runner = new YiyRunner(number)
      let gameRound = await runner.resetRound()
      callback({
        gameRoundState: DpGameRoundStates.created
      })
    });

    // 客户端断开连接事件
    socket.on('disconnect', function(data) {
      logger.info(`user disconnect ${socket.id}.`);
    });


  }

}
