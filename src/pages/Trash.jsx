import { useMemo, useState } from 'react';
import { useRecipesStore, useUIStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import Modal from '../components/common/Modal';

export default function Trash() {
    const allRecipes = useRecipesStore((state) => state.recipes);
    const restoreRecipe = useRecipesStore((state) => state.restoreRecipe);
    const deleteRecipe = useRecipesStore((state) => state.deleteRecipe);
    const showToast = useUIStore((state) => state.showToast);

    const recipes = useMemo(() => {
        return allRecipes.filter((recipe) => recipe.isDeleted);
    }, [allRecipes]);

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleRestore = (recipe) => {
        restoreRecipe(recipe.id);
        showToast('Retsept taastatud!', 'success');
    };

    const handlePermanentDelete = () => {
        deleteRecipe(deleteConfirm.id, true);
        setDeleteConfirm(null);
        showToast('Retsept lõplikult kustutatud', 'success');
    };

    return (
        <PageContainer title="Prügikast 🗑️">
            {recipes.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-md)',
                                padding: 'var(--spacing-md)',
                                background: 'var(--bg-card)',
                                borderRadius: 'var(--radius-lg)',
                            }}
                        >
                            {recipe.imageUrl ? (
                                <img
                                    src={recipe.imageUrl}
                                    alt={recipe.title}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'var(--gradient-glass)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    🍽️
                                </div>
                            )}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500 }}>{recipe.title}</div>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                                    Kustutatud: {new Date(recipe.deletedAt).toLocaleDateString('et-EE')}
                                </div>
                            </div>
                            <button
                                className="btn btn--secondary btn--sm"
                                onClick={() => handleRestore(recipe)}
                            >
                                ↩️ Taasta
                            </button>
                            <button
                                className="btn btn--danger btn--sm"
                                onClick={() => setDeleteConfirm(recipe)}
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <span className="empty-state__icon">🗑️</span>
                    <h3 className="empty-state__title">Prügikast on tühi</h3>
                    <p className="empty-state__description">
                        Kustutatud retseptid ilmuvad siia
                    </p>
                </div>
            )}

            {/* Permanent Delete Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Kustuta lõplikult?"
                footer={
                    <>
                        <button className="btn btn--secondary" onClick={() => setDeleteConfirm(null)}>
                            Tühista
                        </button>
                        <button className="btn btn--danger" onClick={handlePermanentDelete}>
                            Kustuta lõplikult
                        </button>
                    </>
                }
            >
                <p>
                    Kas oled kindel, et soovid lõplikult kustutada retsepti{' '}
                    <strong>{deleteConfirm?.title}</strong>?
                </p>
                <p style={{ color: 'var(--danger)', marginTop: 'var(--spacing-sm)' }}>
                    ⚠️ See tegevus on pöördumatu!
                </p>
            </Modal>
        </PageContainer>
    );
}
