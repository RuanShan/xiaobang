ALTER TABLE `idiom_words`
ADD COLUMN `is_common` TINYINT NOT NULL DEFAULT 0 AFTER `idiom_example`;
