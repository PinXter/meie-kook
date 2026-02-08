import { Link } from 'react-router-dom';
import { useIngredientsStore } from '../../lib/store';
import {
    calculateTotalCalories,
    calculateHealthiness,
    formatTime,
    getCourseLabel
} from '../../lib/utils';
import HealthBadge from '../common/HealthBadge';

export default function RecipeCard({ recipe }) {
    const ingredients = useIngredientsStore((state) => state.ingredients);

    const totalCalories = recipe.ingredients?.length
        ? calculateTotalCalories(recipe.ingredients, ingredients, 1, recipe.servings || 1)
        : null;

    const healthiness = recipe.ingredients?.length
        ? calculateHealthiness(recipe.ingredients, ingredients)
        : null;

    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

    return (
        <Link to={`/recipe/${recipe.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            {recipe.imageUrl ? (
                <img src={recipe.imageUrl} alt={recipe.title} className="card__image" />
            ) : (
                <div className="card__placeholder">
                    {recipe.ingredients?.[0]?.emoji || '🍽️'}
                </div>
            )}

            <div className="card__content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                    <h3 className="card__title" style={{ flex: 1, margin: 0 }}>{recipe.title}</h3>
                    {recipe.isFavorite && <span>⭐</span>}
                </div>

                <div className="card__meta">
                    {totalTime > 0 && (
                        <span className="card__meta-item">
                            ⏱️ {formatTime(totalTime)}
                        </span>
                    )}

                    {totalCalories != null && (
                        <span className="card__meta-item">
                            🔥 {Math.round(totalCalories)} kcal
                        </span>
                    )}

                    {recipe.course && (
                        <span className="card__meta-item">
                            {getCourseLabel(recipe.course)}
                        </span>
                    )}
                </div>

                {healthiness != null && (
                    <div style={{ marginTop: 'var(--spacing-sm)' }}>
                        <HealthBadge score={healthiness} />
                    </div>
                )}
            </div>
        </Link>
    );
}
