ALTER TABLE `game_rounds` 
ADD COLUMN `score` INT(11) NULL DEFAULT 0 AFTER `host`;
