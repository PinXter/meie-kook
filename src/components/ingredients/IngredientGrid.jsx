import { useState, useMemo } from 'react';
import IngredientCard from './IngredientCard';
import SearchBar from '../common/SearchBar';
import { groupIngredientsByCategory } from '../../lib/categories';

export default function IngredientGrid({
    ingredients,
    selectedIds = [],
    onSelect,
    onAdd,
    searchable = true,
    grouped = false, // New prop to enable category grouping
}) {
    const [search, setSearch] = useState('');

    const filteredIngredients = useMemo(() => {
        if (!search) return ingredients;
        return ingredients.filter(
            (ing) =>
                ing.name.toLowerCase().includes(search.toLowerCase()) ||
                (ing.emoji && ing.emoji.includes(search))
        );
    }, [ingredients, search]);

    // Group by category if enabled and not searching
    const groupedIngredients = useMemo(() => {
        if (!grouped || search) return null;
        return groupIngredientsByCategory(filteredIngredients);
    }, [grouped, search, filteredIngredients]);

    const renderIngredientCard = (ingredient) => (
        <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            selected={selectedIds.includes(ingredient.id)}
            onClick={onSelect}
        />
    );

    return (
        <div className="ingredient-grid-container">
            {searchable && (
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Otsi koostisosa..."
                    />
                </div>
            )}

            {/* Grouped view */}
            {groupedIngredients && !search ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {groupedIngredients.map((group) => (
                        <div key={group.id}>
                            <h3 style={{
                                fontSize: 'var(--font-size-md)',
                                fontWeight: 600,
                                marginBottom: 'var(--spacing-sm)',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-xs)',
                            }}>
                                <span>{group.emoji}</span>
                                <span>{group.label}</span>
                                <span style={{
                                    fontSize: 'var(--font-size-xs)',
                                    opacity: 0.5
                                }}>
                                    ({group.ingredients.length})
                                </span>
                            </h3>
                            <div className="ingredient-grid">
                                {group.ingredients.map(renderIngredientCard)}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Flat view */
                <div className="ingredient-grid">
                    {filteredIngredients.map(renderIngredientCard)}

                    {onAdd && (
                        <div
                            className="ingredient-item"
                            onClick={onAdd}
                            role="button"
                            tabIndex={0}
                            style={{ borderStyle: 'dashed' }}
                        >
                            <span className="ingredient-item__emoji">➕</span>
                            <span className="ingredient-item__name">Lisa uus</span>
                        </div>
                    )}
                </div>
            )}

            {filteredIngredients.length === 0 && !onAdd && (
                <div className="empty-state">
                    <span className="empty-state__icon">🔍</span>
                    <p className="empty-state__title">Koostisosi ei leitud</p>
                    <p className="empty-state__description">
                        Proovi teist otsingut
                    </p>
                </div>
            )}
        </div>
    );
}
