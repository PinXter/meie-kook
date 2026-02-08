// ========================================
// Calculation Utilities
// ========================================

/**
 * Calculate calories for scaled amount
 */
export function calculateCalories(amount, caloriesPerUnit) {
    if (!caloriesPerUnit) return 0;
    return Math.round(amount * caloriesPerUnit);
}

/**
 * Calculate total calories for a recipe
 */
export function calculateTotalCalories(recipeIngredients, ingredients, servings = 1, originalServings = 1) {
    const scale = servings / originalServings;

    return recipeIngredients.reduce((total, ri) => {
        const ingredient = ingredients.find((i) => i.id === ri.ingredientId);
        if (!ingredient || !ingredient.caloriesPerUnit) return total;
        return total + calculateCalories(ri.amount * scale, ingredient.caloriesPerUnit);
    }, 0);
}

/**
 * Calculate average healthiness score for a recipe (1-10)
 */
export function calculateHealthiness(recipeIngredients, ingredients) {
    const scores = recipeIngredients
        .map((ri) => {
            const ingredient = ingredients.find((i) => i.id === ri.ingredientId);
            return ingredient?.healthiness || 5;
        })
        .filter((score) => score != null);

    if (scores.length === 0) return 5;

    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(average);
}

/**
 * Scale recipe amounts to new serving size
 */
export function scaleAmount(originalAmount, originalServings, newServings) {
    if (originalServings === 0) return originalAmount;
    return (originalAmount / originalServings) * newServings;
}

/**
 * Format amount with unit
 */
export function formatAmount(amount, unit) {
    // Round to reasonable precision
    let formatted;
    if (amount < 1) {
        formatted = amount.toFixed(2).replace(/\.?0+$/, '');
    } else if (amount < 10) {
        formatted = amount.toFixed(1).replace(/\.?0+$/, '');
    } else {
        formatted = Math.round(amount).toString();
    }

    return `${formatted} ${getUnitLabel(unit)}`;
}

/**
 * Get Estonian unit labels
 */
export function getUnitLabel(unit, plural = true) {
    const units = {
        g: 'grammi',
        kg: 'kg',
        ml: 'ml',
        l: 'liitrit',
        tsp: 'teelusikat',
        tbsp: 'supilusikat',
        pc: 'tükki',
        cup: plural ? 'tassi' : 'tass',
        pinch: 'näputäit',
    };
    return units[unit] || unit;
}

/**
 * Get all available units
 */
export function getAvailableUnits() {
    return [
        { value: 'g', label: 'Gramm' },
        { value: 'kg', label: 'Kilogramm' },
        { value: 'ml', label: 'Milliliiter' },
        { value: 'l', label: 'Liiter' },
        { value: 'tsp', label: 'Teelusikas' },
        { value: 'tbsp', label: 'Supilusikas' },
        { value: 'pc', label: 'Tükk' },
        { value: 'cup', label: 'Tass' },
        { value: 'pinch', label: 'Näputäis' },
    ];
}

/**
 * Get course types
 */
export function getCourseTypes() {
    return [
        { value: 'appetizer', label: 'Eelroog', emoji: '🥗' },
        { value: 'main', label: 'Pearoog', emoji: '🍽️' },
        { value: 'side', label: 'Lisand', emoji: '🥔' },
        { value: 'dessert', label: 'Magustoit', emoji: '🍰' },
        { value: 'snack', label: 'Suupiste', emoji: '🍿' },
        { value: 'drink', label: 'Jook', emoji: '🥤' },
        { value: 'breakfast', label: 'Hommikusöök', emoji: '🍳' },
        { value: 'soup', label: 'Supp', emoji: '🍲' },
    ];
}

/**
 * Get course label by value
 */
export function getCourseLabel(value) {
    const course = getCourseTypes().find((c) => c.value === value);
    return course ? course.label : value;
}

/**
 * Format time in minutes to readable string
 */
export function formatTime(minutes) {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) return `${hours} t`;
    return `${hours} t ${mins} min`;
}

/**
 * Get healthiness color class
 */
export function getHealthinessColor(score) {
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
}

/**
 * Get healthiness label
 */
export function getHealthinessLabel(score) {
    if (score >= 8) return 'Väga tervislik';
    if (score >= 6) return 'Tervislik';
    if (score >= 4) return 'Keskmine';
    if (score >= 2) return 'Vähem tervislik';
    return 'Ebatervislik';
}

// ========================================
// Validation Utilities
// ========================================

/**
 * Validate recipe data
 */
export function validateRecipe(recipe) {
    const errors = {};

    if (!recipe.title?.trim()) {
        errors.title = 'Pealkiri on kohustuslik';
    }

    if (!recipe.ingredients?.length) {
        errors.ingredients = 'Lisa vähemalt üks koostisosa';
    }

    if (!recipe.instructions?.length || !recipe.instructions.some((i) => i.trim())) {
        errors.instructions = 'Lisa vähemalt üks valmistamise samm';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

/**
 * Validate ingredient data
 */
export function validateIngredient(ingredient) {
    const errors = {};

    if (!ingredient.name?.trim()) {
        errors.name = 'Nimi on kohustuslik';
    }

    if (!ingredient.unit) {
        errors.unit = 'Ühik on kohustuslik';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}
