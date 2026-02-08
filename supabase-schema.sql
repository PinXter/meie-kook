-- ========================================
-- Meie Köök - Supabase Schema
-- ========================================
-- Käivita see Supabase SQL Editoris:
-- https://supabase.com/dashboard -> SQL Editor -> + New query

-- Koostisosade tabel
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    emoji TEXT,
    unit TEXT NOT NULL DEFAULT 'g',
    calories_per_unit DECIMAL(10, 4) DEFAULT 0,
    healthiness INTEGER DEFAULT 5 CHECK (healthiness >= 1 AND healthiness <= 10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Retseptide tabel
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    course TEXT,
    servings INTEGER DEFAULT 2,
    prep_time INTEGER DEFAULT 0,
    cook_time INTEGER DEFAULT 0,
    instructions JSONB DEFAULT '[]'::jsonb,
    tips JSONB DEFAULT '[]'::jsonb,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Retsepti koostisosade tabel (seob retseptid ja koostisosad)
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ostunimekirja tabel
CREATE TABLE shopping_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) DEFAULT 0,
    from_recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL,
    is_checked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Row Level Security (RLS) - OLULINE!
-- ========================================
-- Lülitame RLS välja, et kõik saaksid andmeid lugeda/kirjutada
-- (Lihtne variant 2 kasutaja jaoks ilma autentikuta)

ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;

-- Lubame kõigil lugeda ja kirjutada
CREATE POLICY "Allow all access to ingredients" ON ingredients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to recipes" ON recipes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to recipe_ingredients" ON recipe_ingredients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to shopping_items" ON shopping_items FOR ALL USING (true) WITH CHECK (true);

-- ========================================
-- Indeksid kiirema otsingu jaoks
-- ========================================

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX idx_shopping_items_ingredient ON shopping_items(ingredient_id);
CREATE INDEX idx_recipes_is_deleted ON recipes(is_deleted);
CREATE INDEX idx_recipes_is_favorite ON recipes(is_favorite);

-- ========================================
-- Realtime lubamine
-- ========================================
-- Supabase peab Realtime olema tabelitel aktiveeritud!
-- Mine: Table Editor -> (iga tabel) -> Enable Realtime

-- Valmis! Nüüd saab rakendus sünkroonida.
