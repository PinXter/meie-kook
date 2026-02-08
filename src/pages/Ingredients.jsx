import { useState } from 'react';
import { useIngredientsStore, useUIStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import IngredientGrid from '../components/ingredients/IngredientGrid';
import IngredientForm from '../components/ingredients/IngredientForm';
import Modal from '../components/common/Modal';
import { getUnitLabel } from '../lib/utils';

export default function Ingredients() {
    const ingredients = useIngredientsStore((state) => state.ingredients);
    const addIngredient = useIngredientsStore((state) => state.addIngredient);
    const updateIngredient = useIngredientsStore((state) => state.updateIngredient);
    const deleteIngredient = useIngredientsStore((state) => state.deleteIngredient);
    const showToast = useUIStore((state) => state.showToast);

    const [showAddModal, setShowAddModal] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const handleAdd = (data) => {
        addIngredient(data);
        setShowAddModal(false);
        showToast('Koostisosa lisatud!', 'success');
    };

    const handleEdit = (data) => {
        updateIngredient(editingIngredient.id, data);
        setEditingIngredient(null);
        showToast('Koostisosa uuendatud!', 'success');
    };

    const handleDelete = () => {
        deleteIngredient(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
        showToast('Koostisosa kustutatud!', 'success');
    };

    const handleIngredientClick = (ingredient) => {
        setEditingIngredient(ingredient);
    };

    return (
        <PageContainer
            title="Koostisosad 🥕"
            actions={
                <button className="btn btn--primary" onClick={() => setShowAddModal(true)}>
                    ➕ Lisa
                </button>
            }
        >
            {ingredients.length > 0 ? (
                <IngredientGrid
                    ingredients={ingredients}
                    onSelect={handleIngredientClick}
                    searchable={true}
                />
            ) : (
                <div className="empty-state">
                    <span className="empty-state__icon">🥕</span>
                    <h3 className="empty-state__title">Koostisosi pole veel</h3>
                    <p className="empty-state__description">
                        Lisa esimene koostisosa, et alustada retseptide loomist.
                    </p>
                    <button className="btn btn--primary" onClick={() => setShowAddModal(true)}>
                        ➕ Lisa koostisosa
                    </button>
                </div>
            )}

            {/* Add Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Lisa koostisosa"
            >
                <IngredientForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowAddModal(false)}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={!!editingIngredient}
                onClose={() => setEditingIngredient(null)}
                title="Muuda koostisosa"
            >
                {editingIngredient && (
                    <>
                        <IngredientForm
                            initialData={editingIngredient}
                            onSubmit={handleEdit}
                            onCancel={() => setEditingIngredient(null)}
                        />
                        <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border)' }}>
                            <button
                                className="btn btn--danger btn--full"
                                onClick={() => {
                                    setShowDeleteConfirm(editingIngredient);
                                    setEditingIngredient(null);
                                }}
                            >
                                🗑️ Kustuta koostisosa
                            </button>
                        </div>
                    </>
                )}
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal
                isOpen={!!showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(null)}
                title="Kustuta koostisosa?"
                footer={
                    <>
                        <button className="btn btn--secondary" onClick={() => setShowDeleteConfirm(null)}>
                            Tühista
                        </button>
                        <button className="btn btn--danger" onClick={handleDelete}>
                            Kustuta
                        </button>
                    </>
                }
            >
                <p>
                    Kas oled kindel, et soovid kustutada koostisosa{' '}
                    <strong>{showDeleteConfirm?.emoji} {showDeleteConfirm?.name}</strong>?
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                    See tegevus on pöördumatu.
                </p>
            </Modal>
        </PageContainer>
    );
}
