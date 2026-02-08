import { useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from '../common/SearchBar';
import { getCourseTypes, calculateTotalCalories, calculateHealthiness } from '../../lib/utils';
import { useIngredientsStore } from '../../lib/store';

const SORT_OPTIONS = [
    { value: 'newest', label: '📅 Uusimad', icon: '📅' },
    { value: 'oldest', label: '📅 Vanemad', icon: '📅' },
    { value: 'alpha-asc', label: '🔤 A → Z', icon: '🔤' },
    { value: 'alpha-desc', label: '🔤 Z → A', icon: '🔤' },
    { value: 'calories-asc', label: '🔥 Vähem kaloreid', icon: '🔥' },
    { value: 'calories-desc', label: '🔥 Rohkem kaloreid', icon: '🔥' },
    { value: 'health-desc', label: '🥗 Tervislikumad', icon: '🥗' },
    { value: 'health-asc', label: '🥗 Vähem tervislikud', icon: '🥗' },
    { value: 'ingredients-asc', label: '📦 Vähem koostisosi', icon: '📦' },
    { value: 'ingredients-desc', label: '📦 Rohkem koostisosi', icon: '📦' },
];

export default function RecipeFeed({ recipes, ingredientFilter = null }) {
    const [search, setSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const ingredients = useIngredientsStore((state) => state.ingredients);

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        // Text search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    (r.description && r.description.toLowerCase().includes(q))
            );
        }

        // Course filter
        if (courseFilter) {
            result = result.filter((r) => r.course === courseFilter);
        }

        // Ingredient filter
        if (ingredientFilter) {
            result = result.filter((r) =>
                r.ingredients?.some((ri) => ri.ingredientId === ingredientFilter)
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'alpha-asc':
                    return a.title.localeCompare(b.title, 'et');
                case 'alpha-desc':
                    return b.title.localeCompare(a.title, 'et');
                case 'calories-asc': {
                    const calA = a.ingredients?.length ? calculateTotalCalories(a.ingredients, ingredients, 1, a.servings || 1) : 0;
                    const calB = b.ingredients?.length ? calculateTotalCalories(b.ingredients, ingredients, 1, b.servings || 1) : 0;
                    return calA - calB;
                }
                case 'calories-desc': {
                    const calA = a.ingredients?.length ? calculateTotalCalories(a.ingredients, ingredients, 1, a.servings || 1) : 0;
                    const calB = b.ingredients?.length ? calculateTotalCalories(b.ingredients, ingredients, 1, b.servings || 1) : 0;
                    return calB - calA;
                }
                case 'health-desc': {
                    const hA = a.ingredients?.length ? calculateHealthiness(a.ingredients, ingredients) : 5;
                    const hB = b.ingredients?.length ? calculateHealthiness(b.ingredients, ingredients) : 5;
                    return hB - hA;
                }
                case 'health-asc': {
                    const hA = a.ingredients?.length ? calculateHealthiness(a.ingredients, ingredients) : 5;
                    const hB = b.ingredients?.length ? calculateHealthiness(b.ingredients, ingredients) : 5;
                    return hA - hB;
                }
                case 'ingredients-asc':
                    return (a.ingredients?.length || 0) - (b.ingredients?.length || 0);
                case 'ingredients-desc':
                    return (b.ingredients?.length || 0) - (a.ingredients?.length || 0);
                default:
                    return 0;
            }
        });

        return result;
    }, [recipes, search, courseFilter, sortBy, ingredients, ingredientFilter]);

    const courses = getCourseTypes();
    const activeIngredient = ingredientFilter ? ingredients.find(i => i.id === ingredientFilter) : null;

    return (
        <div>
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Otsi retsepte..."
            />

            {/* Ingredient filter info */}
            {activeIngredient && (
                <div
                    style={{
                        marginTop: 'var(--spacing-md)',
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        background: 'var(--accent)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>🔍 Retseptid koostisosaga: <strong>{activeIngredient.emoji} {activeIngredient.name}</strong></span>
                    <a href="/" style={{ color: 'white' }}>✕ Tühista</a>
                </div>
            )}

            {/* Course filter chips */}
            <div className="filter-chips" style={{ marginTop: 'var(--spacing-md)' }}>
                <button
                    className={`filter-chip ${!courseFilter ? 'filter-chip--active' : ''}`}
                    onClick={() => setCourseFilter('')}
                >
                    Kõik
                </button>
                {courses.map((course) => (
                    <button
                        key={course.value}
                        className={`filter-chip ${courseFilter === course.value ? 'filter-chip--active' : ''}`}
                        onClick={() => setCourseFilter(course.value)}
                    >
                        {course.emoji} {course.label}
                    </button>
                ))}
            </div>

            {/* Sort dropdown */}
            <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                    Järjesta:
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                        background: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        fontSize: 'var(--font-size-sm)',
                        cursor: 'pointer',
                    }}
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                    ({filteredRecipes.length} retsepti)
                </span>
            </div>

            {filteredRecipes.length > 0 ? (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 'var(--spacing-md)',
                        marginTop: 'var(--spacing-lg)',
                    }}
                >
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="empty-state" style={{ marginTop: 'var(--spacing-2xl)' }}>
                    <span className="empty-state__icon">🍳</span>
                    <h3 className="empty-state__title">
                        {recipes.length === 0 ? 'Retsepte pole veel' : 'Retsepte ei leitud'}
                    </h3>
                    <p className="empty-state__description">
                        {recipes.length === 0
                            ? 'Lisa esimene retsept alustamiseks!'
                            : 'Proovi teist otsingut või filtrit'}
                    </p>
                </div>
            )}
        </div>
    );
}
