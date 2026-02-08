import { useIngredientsStore, useShoppingStore } from '../../lib/store';
import { formatAmount } from '../../lib/utils';
import Modal from '../common/Modal';

export default function ShoppingModal({ isOpen, onClose, addedItems = [], onAddMore }) {
    const ingredients = useIngredientsStore((state) => state.ingredients);
    const shoppingItems = useShoppingStore((state) => state.items);
    const toggleItem = useShoppingStore((state) => state.toggleItem);
    const removeItem = useShoppingStore((state) => state.removeItem);

    // Get ingredient details
    const getIngredient = (id) => ingredients.find((i) => i.id === id);

    // Items to show - either just added or all
    const itemsToShow = addedItems.length > 0
        ? shoppingItems.filter(item => addedItems.some(ai => ai.ingredientId === item.ingredientId))
        : shoppingItems;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="🛒 Ostunimekiri">
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {itemsToShow.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {itemsToShow.map((item) => {
                            const ing = getIngredient(item.ingredientId);
                            if (!ing) return null;

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-sm) var(--spacing-md)',
                                        background: item.isChecked ? 'var(--success-subtle)' : 'var(--bg-card)',
                                        borderRadius: 'var(--radius-md)',
                                        opacity: item.isChecked ? 0.6 : 1,
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: 'var(--radius-sm)',
                                            border: `2px solid ${item.isChecked ? 'var(--success)' : 'var(--border)'}`,
                                            background: item.isChecked ? 'var(--success)' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'white',
                                            fontSize: '14px',
                                        }}
                                    >
                                        {item.isChecked && '✓'}
                                    </button>

                                    <span style={{ fontSize: '1.25rem' }}>{ing.emoji || '🍽️'}</span>

                                    <span
                                        style={{
                                            flex: 1,
                                            textDecoration: item.isChecked ? 'line-through' : 'none',
                                        }}
                                    >
                                        {ing.name}
                                    </span>

                                    <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                                        {formatAmount(item.amount, ing.unit)}
                                    </span>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        style={{
                                            background: 'var(--danger-subtle)',
                                            border: 'none',
                                            borderRadius: 'var(--radius-sm)',
                                            padding: 'var(--spacing-xs)',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--spacing-md)' }}>🛒</span>
                        <p>Ostunimekiri on tühi</p>
                    </div>
                )}
            </div>

            <div style={{
                display: 'flex',
                gap: 'var(--spacing-sm)',
                marginTop: 'var(--spacing-lg)',
                paddingTop: 'var(--spacing-md)',
                borderTop: '1px solid var(--border)',
            }}>
                {onAddMore && (
                    <button
                        className="btn btn--secondary"
                        onClick={onAddMore}
                        style={{ flex: 1 }}
                    >
                        ➕ Lisa veel retsepte
                    </button>
                )}
                <button
                    className="btn btn--primary"
                    onClick={onClose}
                    style={{ flex: 1 }}
                >
                    ✓ Valmis
                </button>
            </div>
        </Modal>
    );
}
