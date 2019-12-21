ALTER TABLE `game_rounds`
ADD COLUMN `player_count` INT(11) NOT NULL DEFAULT 0 AFTER `result_count`;
