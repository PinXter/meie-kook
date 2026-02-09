import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import ToastContainer from './components/common/ToastContainer';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import RecipeCreate from './pages/RecipeCreate';
import RecipeView from './pages/RecipeView';
import RecipeEdit from './pages/RecipeEdit';
import Shopping from './pages/Shopping';
import Favorites from './pages/Favorites';
import Trash from './pages/Trash';
import Settings from './pages/Settings';
import { useIngredientsStore, useRecipesStore, useShoppingStore } from './lib/store';
import { seedTestData } from './lib/testData';
import { subscribeToIngredients, subscribeToRecipes, subscribeToShoppingItems } from './lib/supabaseSync';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState('connecting');
  const seedingRef = useRef(false); // Prevent multiple seed calls

  const fetchIngredients = useIngredientsStore((state) => state.fetchIngredients);
  const fetchRecipes = useRecipesStore((state) => state.fetchRecipes);
  const fetchShoppingItems = useShoppingStore((state) => state.fetchItems);
  const ingredientsCount = useIngredientsStore((state) => state.ingredients.length);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setSyncStatus('syncing');

        // Fetch all data from Supabase
        await Promise.all([
          fetchIngredients(),
          fetchRecipes(),
          fetchShoppingItems(),
        ]);

        setSyncStatus('synced');
      } catch (error) {
        console.error('Failed to initialize:', error);
        setSyncStatus('offline');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    // Set up realtime subscriptions
    const ingredientsSub = subscribeToIngredients((payload) => {
      // Refetch on changes from other users
      fetchIngredients();
    });

    const recipesSub = subscribeToRecipes((payload) => {
      fetchRecipes();
    });

    const shoppingSub = subscribeToShoppingItems((payload) => {
      fetchShoppingItems();
    });

    // Cleanup subscriptions
    return () => {
      ingredientsSub.unsubscribe();
      recipesSub.unsubscribe();
      shoppingSub.unsubscribe();
    };
  }, [fetchIngredients, fetchRecipes, fetchShoppingItems]);

  // Seed test data if data is incomplete (less than 400 ingredients)
  useEffect(() => {
    if (!isLoading && ingredientsCount < 600 && !seedingRef.current) {
      seedingRef.current = true; // Mark as seeding to prevent re-entry
      console.log(`Only ${ingredientsCount} ingredients found, seeding test data...`);
      seedTestData().then(() => {
        console.log('Seeding complete!');
      }).catch((err) => {
        console.error('Seeding failed:', err);
        seedingRef.current = false; // Allow retry on error
      });
    }
  }, [isLoading, ingredientsCount]);




  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍳</div>
        <h1 style={{ marginBottom: '0.5rem' }}>Meie Köök</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Laadin...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Sync Status Indicator */}
      {syncStatus === 'offline' && (
        <div style={{
          background: 'var(--warning)',
          color: 'black',
          textAlign: 'center',
          padding: '0.5rem',
          fontSize: 'var(--font-size-sm)',
        }}>
          ⚠️ Offline režiimis - muudatused salvestuvad ainult selles seadmes
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipe/new" element={<RecipeCreate />} />
        <Route path="/recipe/:id" element={<RecipeView />} />
        <Route path="/recipe/:id/edit" element={<RecipeEdit />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
