import { supabase } from './supabase';

// ========================================
// Supabase Sync Service
// ========================================

// Helper to convert between camelCase and snake_case
const toSnakeCase = (obj) => {
    if (!obj) return obj;
    const converted = {};
    for (const key in obj) {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        converted[snakeKey] = obj[key];
    }
    return converted;
};

const toCamelCase = (obj) => {
    if (!obj) return obj;
    const converted = {};
    for (const key in obj) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        converted[camelKey] = obj[key];
    }
    return converted;
};

// ========================================
// Ingredients Sync
// ========================================

export async function fetchIngredients() {
    const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching ingredients:', error);
        return [];
    }

    return data.map(toCamelCase);
}

export async function createIngredient(ingredient) {
    const payload = toSnakeCase({
        name: ingredient.name,
        emoji: ingredient.emoji,
        unit: ingredient.unit,
        caloriesPerUnit: ingredient.caloriesPerUnit,
        healthiness: ingredient.healthiness,
    });

    const { data, error } = await supabase
        .from('ingredients')
        .insert(payload)
        .select()
        .single();

    if (error) {
        console.error('Error creating ingredient:', error);
        return null;
    }

    return toCamelCase(data);
}

export async function updateIngredient(id, updates) {
    const payload = toSnakeCase(updates);
    payload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
        .from('ingredients')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating ingredient:', error);
        return null;
    }

    return toCamelCase(data);
}

export async function deleteIngredient(id) {
    const { error } = await supabase
        .from('ingredients')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting ingredient:', error);
        return false;
    }

    return true;
}

// ========================================
// Recipes Sync
// ========================================

export async function fetchRecipes() {
    // Fetch recipes with their ingredients
    const { data: recipes, error } = await supabase
        .from('recipes')
        .select(`
            *,
            recipe_ingredients (
                id,
                ingredient_id,
                amount,
                notes
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }

    return recipes.map((recipe) => {
        const converted = toCamelCase(recipe);
        // Convert recipe_ingredients to ingredients array
        converted.ingredients = (recipe.recipe_ingredients || []).map((ri) => ({
            ingredientId: ri.ingredient_id,
            amount: parseFloat(ri.amount || 0),
            notes: ri.notes || '',
        }));
        delete converted.recipeIngredients;
        return converted;
    });
}

export async function createRecipe(recipe) {
    // First create the recipe
    const recipePayload = toSnakeCase({
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        course: recipe.course,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        instructions: recipe.instructions || [],
        tips: recipe.tips || [],
        isFavorite: recipe.isFavorite || false,
        isDeleted: false,
    });

    const { data: newRecipe, error: recipeError } = await supabase
        .from('recipes')
        .insert(recipePayload)
        .select()
        .single();

    if (recipeError) {
        console.error('Error creating recipe:', recipeError);
        return null;
    }

    // Then add recipe ingredients
    if (recipe.ingredients?.length > 0) {
        const ingredientsPayload = recipe.ingredients.map((ing) => ({
            recipe_id: newRecipe.id,
            ingredient_id: ing.ingredientId,
            amount: ing.amount,
            notes: ing.notes || '',
        }));

        const { error: ingError } = await supabase
            .from('recipe_ingredients')
            .insert(ingredientsPayload);

        if (ingError) {
            console.error('Error adding recipe ingredients:', ingError);
        }
    }

    const result = toCamelCase(newRecipe);
    result.ingredients = recipe.ingredients || [];
    return result;
}

export async function updateRecipe(id, updates) {
    const payload = toSnakeCase({
        title: updates.title,
        description: updates.description,
        imageUrl: updates.imageUrl,
        course: updates.course,
        servings: updates.servings,
        prepTime: updates.prepTime,
        cookTime: updates.cookTime,
        instructions: updates.instructions,
        tips: updates.tips,
        isFavorite: updates.isFavorite,
        isDeleted: updates.isDeleted,
        deletedAt: updates.deletedAt,
    });
    payload.updated_at = new Date().toISOString();

    // Remove undefined values
    Object.keys(payload).forEach(key => {
        if (payload[key] === undefined) delete payload[key];
    });

    const { data, error } = await supabase
        .from('recipes')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating recipe:', error);
        return null;
    }

    // Update ingredients if provided
    if (updates.ingredients) {
        // Delete existing
        await supabase
            .from('recipe_ingredients')
            .delete()
            .eq('recipe_id', id);

        // Add new
        if (updates.ingredients.length > 0) {
            const ingredientsPayload = updates.ingredients.map((ing) => ({
                recipe_id: id,
                ingredient_id: ing.ingredientId,
                amount: ing.amount,
                notes: ing.notes || '',
            }));

            await supabase
                .from('recipe_ingredients')
                .insert(ingredientsPayload);
        }
    }

    const result = toCamelCase(data);
    result.ingredients = updates.ingredients || [];
    return result;
}

export async function deleteRecipe(id, permanent = false) {
    if (permanent) {
        const { error } = await supabase
            .from('recipes')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting recipe permanently:', error);
            return false;
        }
    } else {
        // Soft delete
        const { error } = await supabase
            .from('recipes')
            .update({
                is_deleted: true,
                deleted_at: new Date().toISOString(),
            })
            .eq('id', id);

        if (error) {
            console.error('Error soft-deleting recipe:', error);
            return false;
        }
    }

    return true;
}

export async function restoreRecipe(id) {
    const { error } = await supabase
        .from('recipes')
        .update({
            is_deleted: false,
            deleted_at: null,
        })
        .eq('id', id);

    if (error) {
        console.error('Error restoring recipe:', error);
        return false;
    }

    return true;
}

export async function toggleFavoriteRecipe(id, isFavorite) {
    const { error } = await supabase
        .from('recipes')
        .update({ is_favorite: isFavorite })
        .eq('id', id);

    if (error) {
        console.error('Error toggling favorite:', error);
        return false;
    }

    return true;
}

// ========================================
// Shopping Items Sync
// ========================================

export async function fetchShoppingItems() {
    const { data, error } = await supabase
        .from('shopping_items')
        .select('*')
        .order('created_at');

    if (error) {
        console.error('Error fetching shopping items:', error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        ingredientId: item.ingredient_id,
        amount: parseFloat(item.amount || 0),
        fromRecipeId: item.from_recipe_id,
        isChecked: item.is_checked,
        createdAt: item.created_at,
    }));
}

export async function addShoppingItem(item) {
    // Check if item with same ingredient exists
    const { data: existing } = await supabase
        .from('shopping_items')
        .select('*')
        .eq('ingredient_id', item.ingredientId)
        .single();

    if (existing) {
        // Update amount
        const newAmount = parseFloat(existing.amount || 0) + parseFloat(item.amount || 0);
        const { data, error } = await supabase
            .from('shopping_items')
            .update({ amount: newAmount })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating shopping item:', error);
            return null;
        }

        return toCamelCase(data);
    } else {
        // Create new
        const { data, error } = await supabase
            .from('shopping_items')
            .insert({
                ingredient_id: item.ingredientId,
                amount: item.amount,
                from_recipe_id: item.fromRecipeId,
                is_checked: false,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating shopping item:', error);
            return null;
        }

        return toCamelCase(data);
    }
}

export async function toggleShoppingItem(id, isChecked) {
    const { error } = await supabase
        .from('shopping_items')
        .update({ is_checked: isChecked })
        .eq('id', id);

    if (error) {
        console.error('Error toggling shopping item:', error);
        return false;
    }

    return true;
}

export async function deleteShoppingItem(id) {
    const { error } = await supabase
        .from('shopping_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting shopping item:', error);
        return false;
    }

    return true;
}

export async function clearCheckedShoppingItems() {
    const { error } = await supabase
        .from('shopping_items')
        .delete()
        .eq('is_checked', true);

    if (error) {
        console.error('Error clearing checked items:', error);
        return false;
    }

    return true;
}

export async function clearAllShoppingItems() {
    const { error } = await supabase
        .from('shopping_items')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
        console.error('Error clearing all items:', error);
        return false;
    }

    return true;
}

export async function clearAllData() {
    try {
        // Delete in order to respect FKs
        await supabase.from('recipe_ingredients').delete().neq('id', 0);
        await supabase.from('shopping_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('recipes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('ingredients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        return true;
    } catch (error) {
        console.error('Error in clearAllData:', error);
        return false;
    }
}

// ========================================
// Realtime Subscriptions
// ========================================

export function subscribeToIngredients(callback) {
    return supabase
        .channel('ingredients-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'ingredients' },
            (payload) => {
                console.log('Ingredient change:', payload);
                callback(payload);
            }
        )
        .subscribe();
}

export function subscribeToRecipes(callback) {
    return supabase
        .channel('recipes-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'recipes' },
            (payload) => {
                console.log('Recipe change:', payload);
                callback(payload);
            }
        )
        .subscribe();
}

export function subscribeToShoppingItems(callback) {
    return supabase
        .channel('shopping-changes')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'shopping_items' },
            (payload) => {
                console.log('Shopping change:', payload);
                callback(payload);
            }
        )
        .subscribe();
}
