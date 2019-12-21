ALTER TABLE `game_rounds`
ADD COLUMN `wx_auth_scope` VARCHAR(1) NULL DEFAULT 'N' AFTER `color`;
