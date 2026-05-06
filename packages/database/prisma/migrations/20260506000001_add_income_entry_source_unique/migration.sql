-- Enforce one FinPilot income entry per synced source.
-- If this migration fails, review duplicate rows in finpilot_income_entry
-- grouped by sourceType/sourceId and merge or remove them manually before retrying.
CREATE UNIQUE INDEX `finpilot_income_entry_sourceType_sourceId_key`
ON `finpilot_income_entry`(`sourceType`, `sourceId`);
