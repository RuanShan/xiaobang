-- mysql -uroot -p zgame_staging< migrations/201908290003-addAppidIntoUsers.sql
ALTER TABLE `wx_mp_users` ADD COLUMN `user_id` int NOT NULL default 0 AFTER id;

ALTER TABLE `game_days` CHANGE COLUMN `day` `day` DATETIME NULL DEFAULT NOW() ;
