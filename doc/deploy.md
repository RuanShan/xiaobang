##webpack4（下）
https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc

##构建分析
npm run build --report

## 数据库表修改用到的sql
ALTER TABLE  `game_rounds` ADD COLUMN `host` VARCHAR(128) NULL AFTER `number`;

## 常用命令
1. 拷贝构建的页面到发布目录
cp -rf dist/. public


## 建立开发环境
npm install -g sequelize-cli



## 运行migration 示例
 mysql -uroot -p zgame_staging< migrations/201908290001-addGameRoundUserId.sql


## 关于window开发常用命令
查询端口占用情况
netstat -ano |find ":8080"


#zgame_backend

npm run build:prod
cp -rf dist/. ../zgame/public/backend/

# game
yarn run build
cp -rf dist/. public
