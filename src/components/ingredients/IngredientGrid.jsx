import { useState } from 'react';
import IngredientCard from './IngredientCard';
import SearchBar from '../common/SearchBar';

export default function IngredientGrid({
    ingredients,
    selectedIds = [],
    onSelect,
    onAdd,
    searchable = true,
}) {
    const [search, setSearch] = useState('');

    const filteredIngredients = search
        ? ingredients.filter(
            (ing) =>
                ing.name.toLowerCase().includes(search.toLowerCase()) ||
                (ing.emoji && ing.emoji.includes(search))
        )
        : ingredients;

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

            <div className="ingredient-grid">
                {filteredIngredients.map((ingredient) => (
                    <IngredientCard
                        key={ingredient.id}
                        ingredient={ingredient}
                        selected={selectedIds.includes(ingredient.id)}
                        onClick={onSelect}
                    />
                ))}

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
