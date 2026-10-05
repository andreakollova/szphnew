-- Pridanie stlpca champions do tabulky categories pre Majstrov ligy
ALTER TABLE categories ADD COLUMN IF NOT EXISTS champions jsonb DEFAULT NULL;
