game_round.code 使用说明
===
# zxg 捉小鬼


1. 使用的路径中
/api/game/{code}/createRound

2. 游戏构建及路径
对于h5游戏，游戏路径为
/{code}.html
对于大屏游戏，游戏路径为
/{code}-play.html
/{code}-control.html

3. GameRound及相关model(GamePlayer, GameResult)的命名
{Code}{model}, 如 pintu,  PintuGameRound
                  dppingtu,  DpPintuGameRound
当创建游戏时，使用 code = PintuGameRound.name.replace('GameRound', '').lowercase

游戏皮肤
===
1. css, 定义每个皮肤用的css
/src/assets/game/:code/css/skin.css
2. image, 游戏过程用图片,所有游戏保持同名图片
/static/game/:code/:skin_name/image
3. config 游戏参数, 如图片的宽度，
/src/games/:code/game/skinres.js


游戏中上传图片，本地存储说明
/public/uploads/:code/:id/:player_id/:key.jpg
示例：画月亮游戏 code 是drawmoon, gameRound.id=1, gamePlayer.id=12, 图片key是xyz
/public/uploads/drawmoon/1/12/xyz.jpg
