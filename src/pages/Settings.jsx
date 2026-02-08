import { useState } from 'react';
import { clearAllData } from '../lib/supabaseSync';
import { useIngredientsStore, useRecipesStore, useShoppingStore, useUIStore } from '../lib/store';
import { seedTestData } from '../lib/testData';

export default function Settings() {
    const [isResetting, setIsResetting] = useState(false);
    const showToast = useUIStore((state) => state.showToast);

    const fetchIngredients = useIngredientsStore((state) => state.fetchIngredients);
    const fetchRecipes = useRecipesStore((state) => state.fetchRecipes);
    const fetchShoppingItems = useShoppingStore((state) => state.fetchItems);

    const handleReset = async () => {
        if (!window.confirm('Are you sure? This will delete ALL recipes and ingredients and re-load the new test data.')) {
            return;
        }

        setIsResetting(true);
        try {
            const success = await clearAllData();
            if (success) {
                // Refresh local store
                await Promise.all([
                    fetchIngredients(),
                    fetchRecipes(),
                    fetchShoppingItems()
                ]);

                // Immediately seed new data
                await seedTestData();

                // Fetch again to show the new data
                await Promise.all([
                    fetchIngredients(),
                    fetchRecipes(),
                    fetchShoppingItems()
                ]);

                showToast('Database reset successfully!', 'success');
            } else {
                showToast('Reset failed.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('An error occurred during reset.', 'error');
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">Settings</h1>
            </header>

            <div className="page__content">
                <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>Developer Tools</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        Use these tools to manage your database during development.
                    </p>

                    <button
                        className="btn btn--danger"
                        onClick={handleReset}
                        disabled={isResetting}
                        style={{ width: '100%' }}
                    >
                        {isResetting ? 'Resetting...' : 'Reset Database & Load Fresh Data'}
                    </button>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--spacing-sm)' }}>
                        Note: This will delete everything and re-seed the latest test ingredients and healthy recipes.
                    </p>
                </div>

                <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>App Info</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Version: <span className="version-tag">v1.4</span>
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Status: <span style={{ color: 'var(--healthy)' }}>Connected to Supabase</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
