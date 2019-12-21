ALTER TABLE `game_rounds`
ADD COLUMN `total_scores` INT(11) NOT NULL DEFAULT 0 AFTER `wx_auth_scope`,
ADD COLUMN `result_count` INT(11) NOT NULL DEFAULT 0 AFTER `total_scores`,
ADD COLUMN `album_count` INT(11) NOT NULL DEFAULT 0 AFTER `result_count`,
ADD COLUMN `visit_count` INT(11) NOT NULL DEFAULT 0 AFTER `album_count`,
ADD COLUMN `publish_at` DATETIME NULL AFTER `visit_count`;

ALTER TABLE `shared_posts`
ADD COLUMN `publish_at` DATETIME NULL AFTER `deleted_at`;
