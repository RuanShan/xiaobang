ALTER TABLE `game_albums`
ADD COLUMN `visit_count` INT(11) NULL DEFAULT 0 AFTER `score`;

ALTER TABLE `shared_terms`
CHANGE COLUMN `group` `group` VARCHAR(16) NULL DEFAULT NULL ;
