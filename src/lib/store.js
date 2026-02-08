import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import * as sync from './supabaseSync';

// ========================================
// Ingredients Store (Supabase-synced)
// ========================================

export const useIngredientsStore = create((set, get) => ({
  ingredients: [],
  isLoading: false,
  isOnline: true,

  // Fetch all ingredients from Supabase
  fetchIngredients: async () => {
    set({ isLoading: true });
    try {
      const data = await sync.fetchIngredients();
      set({ ingredients: data, isLoading: false, isOnline: true });
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
      set({ isLoading: false, isOnline: false });
    }
  },

  addIngredient: async (ingredient) => {
    const tempId = uuidv4();
    const tempIngredient = {
      id: tempId,
      createdAt: new Date().toISOString(),
      ...ingredient,
    };

    // Optimistic update
    set((state) => ({
      ingredients: [...state.ingredients, tempIngredient],
    }));

    // Sync to Supabase
    try {
      const created = await sync.createIngredient(ingredient);
      if (created) {
        // Replace temp with real
        set((state) => ({
          ingredients: state.ingredients.map((i) =>
            i.id === tempId ? created : i
          ),
        }));
        return created;
      }
    } catch (error) {
      console.error('Failed to sync ingredient:', error);
    }

    return tempIngredient;
  },

  updateIngredient: async (id, updates) => {
    // Optimistic update
    set((state) => ({
      ingredients: state.ingredients.map((ing) =>
        ing.id === id ? { ...ing, ...updates } : ing
      ),
    }));

    // Sync to Supabase
    try {
      await sync.updateIngredient(id, updates);
    } catch (error) {
      console.error('Failed to sync ingredient update:', error);
    }
  },

  deleteIngredient: async (id) => {
    // Optimistic delete
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing.id !== id),
    }));

    // Sync to Supabase
    try {
      await sync.deleteIngredient(id);
    } catch (error) {
      console.error('Failed to sync ingredient delete:', error);
    }
  },

  getIngredient: (id) => {
    return get().ingredients.find((ing) => ing.id === id);
  },

  searchIngredients: (query) => {
    const q = query.toLowerCase();
    return get().ingredients.filter(
      (ing) =>
        ing.name.toLowerCase().includes(q) ||
        (ing.emoji && ing.emoji.includes(q))
    );
  },

  // Handle realtime updates
  handleRealtimeUpdate: (payload) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    set((state) => {
      let ingredients = [...state.ingredients];

      if (eventType === 'INSERT') {
        // Only add if not already exists
        if (!ingredients.find((i) => i.id === newRecord.id)) {
          ingredients.push({
            id: newRecord.id,
            name: newRecord.name,
            emoji: newRecord.emoji,
            unit: newRecord.unit,
            caloriesPerUnit: newRecord.calories_per_unit,
            healthiness: newRecord.healthiness,
            createdAt: newRecord.created_at,
          });
        }
      } else if (eventType === 'UPDATE') {
        ingredients = ingredients.map((i) =>
          i.id === newRecord.id
            ? {
              ...i,
              name: newRecord.name,
              emoji: newRecord.emoji,
              unit: newRecord.unit,
              caloriesPerUnit: newRecord.calories_per_unit,
              healthiness: newRecord.healthiness,
            }
            : i
        );
      } else if (eventType === 'DELETE') {
        ingredients = ingredients.filter((i) => i.id !== oldRecord.id);
      }

      return { ingredients };
    });
  },
}));

// ========================================
// Recipes Store (Supabase-synced)
// ========================================

export const useRecipesStore = create((set, get) => ({
  recipes: [],
  isLoading: false,

  fetchRecipes: async () => {
    set({ isLoading: true });
    try {
      const data = await sync.fetchRecipes();
      set({ recipes: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      set({ isLoading: false });
    }
  },

  addRecipe: async (recipe) => {
    const tempId = uuidv4();
    const tempRecipe = {
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
      isFavorite: false,
      ...recipe,
    };

    // Optimistic update
    set((state) => ({
      recipes: [...state.recipes, tempRecipe],
    }));

    // Sync to Supabase
    try {
      const created = await sync.createRecipe(recipe);
      if (created) {
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === tempId ? created : r
          ),
        }));
        return created;
      }
    } catch (error) {
      console.error('Failed to sync recipe:', error);
    }

    return tempRecipe;
  },

  updateRecipe: async (id, updates) => {
    // Optimistic update
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, ...updates, updatedAt: new Date().toISOString() }
          : recipe
      ),
    }));

    // Sync to Supabase
    try {
      await sync.updateRecipe(id, updates);
    } catch (error) {
      console.error('Failed to sync recipe update:', error);
    }
  },

  deleteRecipe: async (id, permanent = false) => {
    if (permanent) {
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
      }));
    } else {
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === id
            ? { ...recipe, isDeleted: true, deletedAt: new Date().toISOString() }
            : recipe
        ),
      }));
    }

    try {
      await sync.deleteRecipe(id, permanent);
    } catch (error) {
      console.error('Failed to sync recipe delete:', error);
    }
  },

  restoreRecipe: async (id) => {
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, isDeleted: false, deletedAt: null }
          : recipe
      ),
    }));

    try {
      await sync.restoreRecipe(id);
    } catch (error) {
      console.error('Failed to sync recipe restore:', error);
    }
  },

  toggleFavorite: async (id) => {
    const recipe = get().recipes.find((r) => r.id === id);
    const newValue = !recipe?.isFavorite;

    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === id ? { ...r, isFavorite: newValue } : r
      ),
    }));

    try {
      await sync.toggleFavoriteRecipe(id, newValue);
    } catch (error) {
      console.error('Failed to sync favorite:', error);
    }
  },

  getRecipe: (id) => {
    return get().recipes.find((recipe) => recipe.id === id);
  },

  getActiveRecipes: () => {
    return get().recipes.filter((recipe) => !recipe.isDeleted);
  },

  getDeletedRecipes: () => {
    return get().recipes.filter((recipe) => recipe.isDeleted);
  },

  getFavoriteRecipes: () => {
    return get().recipes.filter((recipe) => recipe.isFavorite && !recipe.isDeleted);
  },
}));

// ========================================
// Shopping List Store (Supabase-synced)
// ========================================

export const useShoppingStore = create((set, get) => ({
  items: [],
  isLoading: false,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const data = await sync.fetchShoppingItems();
      set({ items: data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch shopping items:', error);
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    const existingIndex = get().items.findIndex(
      (i) => i.ingredientId === item.ingredientId
    );

    if (existingIndex >= 0) {
      // Update existing
      set((state) => ({
        items: state.items.map((i, index) =>
          index === existingIndex
            ? { ...i, amount: i.amount + (item.amount || 0) }
            : i
        ),
      }));
    } else {
      const tempId = uuidv4();
      set((state) => ({
        items: [...state.items, { id: tempId, isChecked: false, ...item }],
      }));
    }

    await sync.addShoppingItem(item);
  },

  addFromRecipe: async (recipeId, recipeIngredients) => {
    for (const ri of recipeIngredients) {
      await get().addItem({
        ingredientId: ri.ingredientId,
        amount: ri.amount,
        fromRecipeId: recipeId,
      });
    }
  },

  toggleItem: async (id) => {
    const item = get().items.find((i) => i.id === id);
    const newValue = !item?.isChecked;

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, isChecked: newValue } : i
      ),
    }));

    await sync.toggleShoppingItem(id, newValue);
  },

  removeItem: async (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));

    await sync.deleteShoppingItem(id);
  },

  clearChecked: async () => {
    set((state) => ({
      items: state.items.filter((item) => !item.isChecked),
    }));

    await sync.clearCheckedShoppingItems();
  },

  clearAll: async () => {
    set({ items: [] });
    await sync.clearAllShoppingItems();
  },
}));

// ========================================
// UI Store (local only, no sync needed)
// ========================================

export const useUIStore = create((set) => ({
  toasts: [],
  isLoading: false,

  showToast: (message, type = 'info') => {
    const id = uuidv4();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),
}));

// ========================================
// Auth Store (for future use)
// ========================================

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
