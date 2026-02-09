// Ingredient categories with labels and emojis
export const INGREDIENT_CATEGORIES = [
    { id: 'vegetables', label: 'Köögiviljad', emoji: '🥬' },
    { id: 'fruits', label: 'Puuviljad', emoji: '🍎' },
    { id: 'meat', label: 'Liha', emoji: '🥩' },
    { id: 'fish', label: 'Kala ja mereannid', emoji: '🐟' },
    { id: 'dairy', label: 'Piimatooted', emoji: '🥛' },
    { id: 'grains', label: 'Teravili ja pasta', emoji: '🌾' },
    { id: 'spices', label: 'Maitseained', emoji: '🌿' },
    { id: 'oils', label: 'Õlid ja rasvad', emoji: '🫒' },
    { id: 'sweeteners', label: 'Magusained', emoji: '🍯' },
    { id: 'chocolate', label: 'Šokolaad', emoji: '🍫' },
    { id: 'nuts', label: 'Pähklid ja seemned', emoji: '🥜' },
    { id: 'legumes', label: 'Kaunviljad', emoji: '🫘' },
    { id: 'canned', label: 'Konservid', emoji: '🥫' },
    { id: 'sauces', label: 'Kastmed', emoji: '🍅' },
    { id: 'alcohol', label: 'Alkohol', emoji: '🍸' },
    { id: 'drinks', label: 'Joogid', emoji: '☕' },
    { id: 'other', label: 'Muud', emoji: '🍽️' },
];

// Helper to get category label
export function getCategoryLabel(categoryId) {
    const cat = INGREDIENT_CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.label : 'Muud';
}

// Helper to get category emoji
export function getCategoryEmoji(categoryId) {
    const cat = INGREDIENT_CATEGORIES.find(c => c.id === categoryId);
    return cat ? cat.emoji : '🍽️';
}

// Group ingredients by category
export function groupIngredientsByCategory(ingredients) {
    const groups = {};

    INGREDIENT_CATEGORIES.forEach(cat => {
        groups[cat.id] = {
            ...cat,
            ingredients: [],
        };
    });

    ingredients.forEach(ing => {
        const category = ing.category || 'other';
        if (groups[category]) {
            groups[category].ingredients.push(ing);
        } else {
            groups.other.ingredients.push(ing);
        }
    });

    // Sort ingredients within each category by calories (ascending)
    Object.values(groups).forEach(group => {
        group.ingredients.sort((a, b) =>
            (a.caloriesPerUnit || 0) - (b.caloriesPerUnit || 0)
        );
    });

    // Return only non-empty groups
    return Object.values(groups).filter(g => g.ingredients.length > 0);
}
