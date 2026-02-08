import { useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from '../common/SearchBar';
import { getCourseTypes } from '../../lib/utils';

export default function RecipeFeed({ recipes }) {
    const [search, setSearch] = useState('');
    const [courseFilter, setCourseFilter] = useState('');

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.title.toLowerCase().includes(q) ||
                    (r.description && r.description.toLowerCase().includes(q))
            );
        }

        if (courseFilter) {
            result = result.filter((r) => r.course === courseFilter);
        }

        // Sort by creation date, newest first
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return result;
    }, [recipes, search, courseFilter]);

    const courses = getCourseTypes();

    return (
        <div>
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Otsi retsepte..."
            />

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
