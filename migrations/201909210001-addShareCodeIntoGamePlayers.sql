ALTER TABLE `game_players`
ADD COLUMN `share_code` VARCHAR(32) NULL DEFAULT NULL;
ALTER TABLE `game_players` 
ADD COLUMN `parent_id` INT NOT NULL DEFAULT 0 AFTER `share_code`;
