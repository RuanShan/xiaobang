ALTER TABLE `shared_terms`
CHANGE COLUMN `parent` `parent_id` INT(11) NULL DEFAULT NULL,
ADD COLUMN `hierarchy_level` INT(10) UNSIGNED NULL DEFAULT NULL AFTER `group`;
