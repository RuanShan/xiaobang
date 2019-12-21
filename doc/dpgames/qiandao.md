## 项目文件说明

-   管理端API，创建游戏

    server/controllers/api/dpgame/qiandao

-   游戏过程api，如取得游戏基本信息， 包括大屏端和管理端

    server/controllers/gapi/dpgame/qiandao

-   游戏socketio, 实现游戏与服务器的实时双向通信

    server/sockets/dpgame/pintu


-   游戏运行控制，根据游戏进程调整游戏状态

    server/models/dpgame/qiandao/runner

## url
control
http://localhost:8080/pintu-control.html?number=xxx
play
http://localhost:8080/pintu-play.html

## 规则
# 后台
0. 游戏需要有结束时间，结束后游戏状态为completed

# 手机端
0. 游戏首页可以查看游戏玩家中奖结果
2. 玩家关闭游戏，重新进入，如果游戏结束，显示玩家中奖结果。

#大屏端
1. 游戏未开始，用户可以扫二维码签到
2. 游戏开始后，用户扫二维码也无法加入游戏
3. 游戏结束后，用户进入时，直接显示成绩页面，如果没有注册过，也不走注册流程。
