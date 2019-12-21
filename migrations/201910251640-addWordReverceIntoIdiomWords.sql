ALTER TABLE `idiom_words`
ADD COLUMN `name_reverce` varchar(24) NOT NULL DEFAULT '' AFTER `idiom_pinyin`;


-- 这需要创建联合索引，以便查询 以x开头，但是不包含一些成语的查询
ALTER TABLE `idiom_words`
ADD INDEX `idiom_words_name_and_reverce` (`idiom_name` , `name_reverce` );
