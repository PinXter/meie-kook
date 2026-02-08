import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipesStore, useIngredientsStore, useShoppingStore, useUIStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import ServingsScaler from '../components/recipes/ServingsScaler';
import HealthBadge from '../components/common/HealthBadge';
import Modal from '../components/common/Modal';
import {
    calculateTotalCalories,
    calculateHealthiness,
    scaleAmount,
    formatAmount,
    formatTime,
    getCourseLabel,
} from '../lib/utils';

export default function RecipeView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const recipe = useRecipesStore((state) => state.getRecipe(id));
    const deleteRecipe = useRecipesStore((state) => state.deleteRecipe);
    const toggleFavorite = useRecipesStore((state) => state.toggleFavorite);
    const ingredients = useIngredientsStore((state) => state.ingredients);
    const addFromRecipe = useShoppingStore((state) => state.addFromRecipe);
    const showToast = useUIStore((state) => state.showToast);

    const [servings, setServings] = useState(recipe?.servings || 2);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!recipe) {
        return (
            <PageContainer title="Retsepti ei leitud">
                <div className="empty-state">
                    <span className="empty-state__icon">😢</span>
                    <h3 className="empty-state__title">Retsepti ei leitud</h3>
                    <Link to="/" className="btn btn--primary">
                        Tagasi avalehele
                    </Link>
                </div>
            </PageContainer>
        );
    }

    const originalServings = recipe.servings || 2;
    const totalCalories = recipe.ingredients?.length
        ? calculateTotalCalories(recipe.ingredients, ingredients, servings, originalServings)
        : null;
    const healthiness = recipe.ingredients?.length
        ? calculateHealthiness(recipe.ingredients, ingredients)
        : null;
    const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

    const handleAddToShopping = () => {
        const scaledIngredients = recipe.ingredients.map((ri) => ({
            ingredientId: ri.ingredientId,
            amount: scaleAmount(ri.amount, originalServings, servings),
        }));
        addFromRecipe(recipe.id, scaledIngredients);
        showToast('Lisatud ostunimekirja!', 'success');
        navigate('/shopping');
    };

    const handleCopyIngredients = () => {
        const ingredientsList = recipe.ingredients
            .map((ri) => {
                const ing = ingredients.find((i) => i.id === ri.ingredientId);
                if (!ing) return null;
                const scaledAmount = scaleAmount(ri.amount, originalServings, servings);
                const amountStr = formatAmount(scaledAmount, ing.unit);
                return `${ing.name} - ${amountStr}${ri.notes ? ` (${ri.notes})` : ''}`;
            })
            .filter(Boolean)
            .join('\n');

        const text = `${recipe.title}\n(${servings} portsjonit)\n\n${ingredientsList}`;

        navigator.clipboard.writeText(text).then(() => {
            showToast('Koostisosad kopeeritud!', 'success');
        }).catch(() => {
            showToast('Kopeerimine ebaõnnestus', 'error');
        });
    };

    const handleDelete = () => {
        deleteRecipe(recipe.id);
        showToast('Retsept viidud prügikasti', 'success');
        navigate('/');
    };

    const handleToggleFavorite = () => {
        toggleFavorite(recipe.id);
        showToast(recipe.isFavorite ? 'Eemaldatud lemmikutest' : 'Lisatud lemmikutesse', 'success');
    };

    const getIngredientDetails = (ingredientId) => {
        return ingredients.find((i) => i.id === ingredientId);
    };

    return (
        <div className="page">
            {/* Hero Image */}
            {recipe.imageUrl ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'cover',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, transparent 50%, var(--bg-primary) 100%)',
                        }}
                    />
                </div>
            ) : (
                <div
                    style={{
                        height: '200px',
                        background: 'var(--gradient-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '5rem',
                    }}
                >
                    {recipe.ingredients?.[0] ? (
                        getIngredientDetails(recipe.ingredients[0].ingredientId)?.emoji || '🍽️'
                    ) : '🍽️'}
                </div>
            )}

            {/* Back Button */}
            <div style={{ padding: 'var(--spacing-md)' }}>
                <button className="btn btn--ghost" onClick={() => navigate(-1)}>
                    ← Tagasi
                </button>
            </div>

            {/* Content */}
            <div style={{ padding: '0 var(--spacing-md) var(--spacing-2xl)' }}>
                {/* Title and Actions */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <h1 style={{ flex: 1, fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>
                        {recipe.title}
                    </h1>
                    <button
                        className="btn btn--ghost btn--icon"
                        onClick={handleToggleFavorite}
                        style={{ fontSize: '1.5rem' }}
                    >
                        {recipe.isFavorite ? '⭐' : '☆'}
                    </button>
                </div>

                {/* Meta */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                    {totalTime > 0 && (
                        <span className="badge badge--neutral">⏱️ {formatTime(totalTime)}</span>
                    )}
                    {totalCalories != null && (
                        <span className="badge badge--neutral">🔥 {Math.round(totalCalories)} kcal</span>
                    )}
                    {recipe.course && (
                        <span className="badge badge--accent">{getCourseLabel(recipe.course)}</span>
                    )}
                </div>

                {/* Healthiness */}
                {healthiness != null && (
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            Tervislikkus
                        </span>
                        <HealthBadge score={healthiness} />
                    </div>
                )}

                {/* Description */}
                {recipe.description && (
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                        {recipe.description}
                    </p>
                )}

                {/* Servings Scaler */}
                <div
                    style={{
                        padding: 'var(--spacing-md)',
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--spacing-lg)',
                    }}
                >
                    <ServingsScaler
                        original={originalServings}
                        value={servings}
                        onChange={setServings}
                    />
                </div>

                {/* Ingredients */}
                {recipe.ingredients?.length > 0 && (
                    <section style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
                            Koostisosad
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {recipe.ingredients.map((ri) => {
                                const ing = getIngredientDetails(ri.ingredientId);
                                if (!ing) return null;

                                const scaledAmount = scaleAmount(ri.amount, originalServings, servings);

                                return (
                                    <div
                                        key={ri.ingredientId}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-md)',
                                            padding: 'var(--spacing-sm) var(--spacing-md)',
                                            background: 'var(--bg-card)',
                                            borderRadius: 'var(--radius-md)',
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem' }}>{ing.emoji || '🍽️'}</span>
                                        <span style={{ flex: 1 }}>{ing.name}</span>
                                        <span style={{ color: 'var(--accent)', fontWeight: 500 }}>
                                            {formatAmount(scaledAmount, ing.unit)}
                                        </span>
                                        {ri.notes && (
                                            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                                ({ri.notes})
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddToShopping}
                                style={{ flex: 1 }}
                            >
                                🛒 Lisa ostunimekirja
                            </button>
                            <button
                                className="btn btn--secondary"
                                onClick={handleCopyIngredients}
                                style={{ flex: 1 }}
                            >
                                📋 Kopeeri nimekiri
                            </button>
                        </div>
                    </section>
                )}

                {/* Instructions */}
                {recipe.instructions?.length > 0 && (
                    <section style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
                            Valmistamine
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {recipe.instructions.map((instruction, index) => (
                                <div key={index} style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    <span
                                        style={{
                                            background: 'var(--accent)',
                                            color: 'white',
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 600,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <p style={{ flex: 1, lineHeight: 1.6 }}>{instruction}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Tips */}
                {recipe.tips?.length > 0 && (
                    <section style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-md)' }}>
                            💡 Nipid
                        </h2>
                        <div
                            style={{
                                background: 'var(--warning-subtle)',
                                border: '1px solid var(--warning)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--spacing-md)',
                            }}
                        >
                            {recipe.tips.map((tip, index) => (
                                <p key={index} style={{ marginBottom: index < recipe.tips.length - 1 ? 'var(--spacing-sm)' : 0 }}>
                                    {tip}
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Link to={`/recipe/${recipe.id}/edit`} className="btn btn--secondary btn--full">
                        ✏️ Muuda
                    </Link>
                    <button
                        className="btn btn--danger btn--full"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        🗑️ Kustuta
                    </button>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Kustuta retsept?"
                footer={
                    <>
                        <button className="btn btn--secondary" onClick={() => setShowDeleteModal(false)}>
                            Tühista
                        </button>
                        <button className="btn btn--danger" onClick={handleDelete}>
                            Kustuta
                        </button>
                    </>
                }
            >
                <p>
                    Kas oled kindel, et soovid kustutada retsepti <strong>{recipe.title}</strong>?
                </p>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                    Retsept viiakse prügikasti, kust saad selle hiljem taastada.
                </p>
            </Modal>
        </div>
    );
}
