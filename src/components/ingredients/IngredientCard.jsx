export default function IngredientCard({ ingredient, selected, onClick }) {
    return (
        <div
            className={`ingredient-item ${selected ? 'ingredient-item--selected' : ''}`}
            onClick={() => onClick(ingredient)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick(ingredient);
                }
            }}
        >
            <span className="ingredient-item__emoji">
                {ingredient.emoji || '🍽️'}
            </span>
            <span className="ingredient-item__name">{ingredient.name}</span>
        </div>
    );
}
