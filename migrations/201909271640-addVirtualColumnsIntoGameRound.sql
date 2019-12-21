ALTER TABLE `game_rounds`
ADD COLUMN `virtual_result_count` INT(11) NOT NULL DEFAULT 0 AFTER `visit_count`,
ADD COLUMN `virtual_visit_count` INT(11) NOT NULL DEFAULT 0 AFTER `visit_count`;
