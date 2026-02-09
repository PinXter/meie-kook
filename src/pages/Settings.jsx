import { useState } from 'react';
import { clearAllData, deleteAllRecipes } from '../lib/supabaseSync';
import { useIngredientsStore, useRecipesStore, useShoppingStore, useUIStore } from '../lib/store';
import { seedTestData } from '../lib/testData';
import PageContainer from '../components/layout/PageContainer';

export default function Settings() {
    const [isResetting, setIsResetting] = useState(false);
    const [isDeletingRecipes, setIsDeletingRecipes] = useState(false);
    const showToast = useUIStore((state) => state.showToast);

    const fetchIngredients = useIngredientsStore((state) => state.fetchIngredients);
    const fetchRecipes = useRecipesStore((state) => state.fetchRecipes);
    const fetchShoppingItems = useShoppingStore((state) => state.fetchItems);

    const handleDeleteRecipes = async () => {
        if (!window.confirm('Kas oled kindel? See kustutab KÕIK retseptid, aga jätab koostisosad alles.')) {
            return;
        }

        setIsDeletingRecipes(true);
        try {
            const success = await deleteAllRecipes();
            if (success) {
                await fetchRecipes();
                showToast('Kõik retseptid kustutatud!', 'success');
            } else {
                showToast('Kustutamine ebaõnnestus.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Tekkis viga.', 'error');
        } finally {
            setIsDeletingRecipes(false);
        }
    };

    const handleReset = async () => {
        if (!window.confirm('Kas oled kindel? See kustutab KÕIK andmed ja laeb uued testandmed.')) {
            return;
        }

        setIsResetting(true);
        try {
            const success = await clearAllData();
            if (success) {
                await Promise.all([
                    fetchIngredients(),
                    fetchRecipes(),
                    fetchShoppingItems()
                ]);

                await seedTestData();

                await Promise.all([
                    fetchIngredients(),
                    fetchRecipes(),
                    fetchShoppingItems()
                ]);

                showToast('Andmebaas lähtestatud!', 'success');
            } else {
                showToast('Lähtestamine ebaõnnestus.', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Tekkis viga.', 'error');
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <PageContainer title="Seaded ⚙️">
            <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>🗑️ Kustuta retseptid</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                    Kustutab kõik retseptid, aga jätab koostisosad alles.
                </p>
                <button
                    className="btn btn--danger"
                    onClick={handleDeleteRecipes}
                    disabled={isDeletingRecipes}
                    style={{ width: '100%' }}
                >
                    {isDeletingRecipes ? 'Kustutan...' : 'Kustuta kõik retseptid'}
                </button>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>🔄 Lähtesta kõik</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                    Kustutab KÕIK andmed ja laeb uued testandmed.
                </p>
                <button
                    className="btn btn--danger"
                    onClick={handleReset}
                    disabled={isResetting}
                    style={{ width: '100%' }}
                >
                    {isResetting ? 'Lähtestan...' : 'Lähtesta andmebaas'}
                </button>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-lg)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>ℹ️ Rakenduse info</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Versioon: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>v1.8</span>
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Staatus: <span style={{ color: 'var(--healthy)' }}>Ühendatud Supabase'iga</span>
                </p>
            </div>
        </PageContainer>
    );
}
