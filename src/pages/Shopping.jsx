import { useShoppingStore, useIngredientsStore, useUIStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import { formatAmount } from '../lib/utils';

export default function Shopping() {
    const items = useShoppingStore((state) => state.items);
    const toggleItem = useShoppingStore((state) => state.toggleItem);
    const removeItem = useShoppingStore((state) => state.removeItem);
    const clearChecked = useShoppingStore((state) => state.clearChecked);
    const clearAll = useShoppingStore((state) => state.clearAll);
    const ingredients = useIngredientsStore((state) => state.ingredients);
    const showToast = useUIStore((state) => state.showToast);

    const getIngredientDetails = (ingredientId) => {
        return ingredients.find((i) => i.id === ingredientId);
    };

    const checkedCount = items.filter((i) => i.isChecked).length;
    const uncheckedItems = items.filter((i) => !i.isChecked);
    const checkedItems = items.filter((i) => i.isChecked);

    const handleClearChecked = () => {
        clearChecked();
        showToast('Ostetud asjad eemaldatud', 'success');
    };

    const handleClearAll = () => {
        clearAll();
        showToast('Nimekiri tühjendatud', 'success');
    };

    return (
        <PageContainer
            title="Ostunimekiri 🛒"
            actions={
                items.length > 0 && (
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        {checkedCount > 0 && (
                            <button className="btn btn--secondary btn--sm" onClick={handleClearChecked}>
                                Eemalda ostetud
                            </button>
                        )}
                        <button className="btn btn--ghost btn--sm" onClick={handleClearAll}>
                            Tühjenda
                        </button>
                    </div>
                )
            }
        >
            {items.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {/* Unchecked items first */}
                    {uncheckedItems.map((item) => {
                        const ing = getIngredientDetails(item.ingredientId);
                        if (!ing) return null;

                        return (
                            <div
                                key={item.id}
                                className="shopping-item"
                            >
                                <div
                                    className="shopping-item__checkbox"
                                    onClick={() => toggleItem(item.id)}
                                    role="checkbox"
                                    aria-checked={item.isChecked}
                                >
                                    {item.isChecked && '✓'}
                                </div>
                                <span style={{ fontSize: '1.5rem' }}>{ing.emoji || '🍽️'}</span>
                                <div className="shopping-item__content">
                                    <div className="shopping-item__text">{ing.name}</div>
                                    {item.amount && (
                                        <div className="shopping-item__amount">
                                            {formatAmount(item.amount, ing.unit)}
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="btn btn--ghost btn--icon"
                                    onClick={() => removeItem(item.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        );
                    })}

                    {/* Divider if both exist */}
                    {checkedItems.length > 0 && uncheckedItems.length > 0 && (
                        <div
                            style={{
                                borderTop: '1px solid var(--border)',
                                margin: 'var(--spacing-sm) 0',
                                position: 'relative',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--bg-primary)',
                                    padding: '0 var(--spacing-sm)',
                                    color: 'var(--text-muted)',
                                    fontSize: 'var(--font-size-xs)',
                                }}
                            >
                                Ostetud
                            </span>
                        </div>
                    )}

                    {/* Checked items */}
                    {checkedItems.map((item) => {
                        const ing = getIngredientDetails(item.ingredientId);
                        if (!ing) return null;

                        return (
                            <div
                                key={item.id}
                                className="shopping-item shopping-item--checked"
                            >
                                <div
                                    className="shopping-item__checkbox shopping-item__checkbox--checked"
                                    onClick={() => toggleItem(item.id)}
                                    role="checkbox"
                                    aria-checked={item.isChecked}
                                >
                                    ✓
                                </div>
                                <span style={{ fontSize: '1.5rem' }}>{ing.emoji || '🍽️'}</span>
                                <div className="shopping-item__content">
                                    <div className="shopping-item__text">{ing.name}</div>
                                    {item.amount && (
                                        <div className="shopping-item__amount">
                                            {formatAmount(item.amount, ing.unit)}
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="btn btn--ghost btn--icon"
                                    onClick={() => removeItem(item.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-state">
                    <span className="empty-state__icon">🛒</span>
                    <h3 className="empty-state__title">Ostunimekiri on tühi</h3>
                    <p className="empty-state__description">
                        Lisa koostisosi retsepti vaates vajutades "Lisa ostunimekirja"
                    </p>
                </div>
            )}
        </PageContainer>
    );
}
