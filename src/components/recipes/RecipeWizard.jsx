import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIngredientsStore, useRecipesStore, useUIStore } from '../../lib/store';
import { getCourseTypes, getAvailableUnits } from '../../lib/utils';
import IngredientGrid from '../ingredients/IngredientGrid';
import IngredientForm from '../ingredients/IngredientForm';
import Modal from '../common/Modal';

const STEPS = [
    { id: 1, title: 'Koostisosad' },
    { id: 2, title: 'Kogused' },
    { id: 3, title: 'Valmistamine' },
    { id: 4, title: 'Nipid' },
    { id: 5, title: 'Detailid' },
];

export default function RecipeWizard({ initialData, onComplete }) {
    const navigate = useNavigate();
    const ingredients = useIngredientsStore((state) => state.ingredients);
    const addIngredient = useIngredientsStore((state) => state.addIngredient);
    const addRecipe = useRecipesStore((state) => state.addRecipe);
    const updateRecipe = useRecipesStore((state) => state.updateRecipe);
    const showToast = useUIStore((state) => state.showToast);

    const [currentStep, setCurrentStep] = useState(1);
    const [showNewIngredientModal, setShowNewIngredientModal] = useState(false);

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        selectedIngredientIds: initialData?.ingredients?.map((i) => i.ingredientId) || [],
        ingredients: initialData?.ingredients || [],
        instructions: initialData?.instructions || [''],
        tips: initialData?.tips || [''],
        servings: initialData?.servings || 2,
        prepTime: initialData?.prepTime || '',
        cookTime: initialData?.cookTime || '',
        course: initialData?.course || '',
        imageUrl: initialData?.imageUrl || '',
    });

    const fileInputRef = useRef(null);

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleIngredientSelect = (ingredient) => {
        const isSelected = formData.selectedIngredientIds.includes(ingredient.id);

        if (isSelected) {
            updateFormData(
                'selectedIngredientIds',
                formData.selectedIngredientIds.filter((id) => id !== ingredient.id)
            );
            updateFormData(
                'ingredients',
                formData.ingredients.filter((i) => i.ingredientId !== ingredient.id)
            );
        } else {
            updateFormData('selectedIngredientIds', [...formData.selectedIngredientIds, ingredient.id]);
            updateFormData('ingredients', [
                ...formData.ingredients,
                { ingredientId: ingredient.id, amount: 1, notes: '' },
            ]);
        }
    };

    const handleNewIngredient = (ingredientData) => {
        const newIngredient = addIngredient(ingredientData);
        setShowNewIngredientModal(false);
        handleIngredientSelect(newIngredient);
        showToast('Koostisosa lisatud!', 'success');
    };

    const updateIngredientAmount = (ingredientId, field, value) => {
        updateFormData(
            'ingredients',
            formData.ingredients.map((i) =>
                i.ingredientId === ingredientId ? { ...i, [field]: value } : i
            )
        );
    };

    const addInstruction = () => {
        updateFormData('instructions', [...formData.instructions, '']);
    };

    const updateInstruction = (index, value) => {
        const updated = [...formData.instructions];
        updated[index] = value;
        updateFormData('instructions', updated);
    };

    const removeInstruction = (index) => {
        if (formData.instructions.length > 1) {
            updateFormData(
                'instructions',
                formData.instructions.filter((_, i) => i !== index)
            );
        }
    };

    const addTip = () => {
        updateFormData('tips', [...formData.tips, '']);
    };

    const updateTip = (index, value) => {
        const updated = [...formData.tips];
        updated[index] = value;
        updateFormData('tips', updated);
    };

    const removeTip = (index) => {
        updateFormData(
            'tips',
            formData.tips.filter((_, i) => i !== index)
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateFormData('imageUrl', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // For simplicity, we'll just trigger file input with camera
            // In a real app, we'd show a video preview
            stream.getTracks().forEach(track => track.stop());
            fileInputRef.current?.click();
        } catch (err) {
            showToast('Kaamera ligipääs keelatud', 'error');
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.selectedIngredientIds.length > 0;
            case 2:
                return formData.ingredients.every((i) => i.amount > 0);
            case 3:
                return formData.instructions.some((i) => i.trim());
            case 4:
                return true; // Tips are optional
            case 5:
                return formData.title.trim();
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate(-1);
        }
    };

    const handleSubmit = () => {
        const recipeData = {
            title: formData.title,
            description: formData.description,
            ingredients: formData.ingredients,
            instructions: formData.instructions.filter((i) => i.trim()),
            tips: formData.tips.filter((t) => t.trim()),
            servings: parseInt(formData.servings) || 2,
            prepTime: parseInt(formData.prepTime) || null,
            cookTime: parseInt(formData.cookTime) || null,
            course: formData.course || null,
            imageUrl: formData.imageUrl || null,
        };

        if (initialData?.id) {
            updateRecipe(initialData.id, recipeData);
            showToast('Retsept uuendatud!', 'success');
        } else {
            addRecipe(recipeData);
            showToast('Retsept lisatud!', 'success');
        }

        if (onComplete) {
            onComplete();
        } else {
            navigate('/');
        }
    };

    const getIngredientDetails = (ingredientId) => {
        return ingredients.find((i) => i.id === ingredientId);
    };

    return (
        <div className="wizard">
            {/* Progress Bar */}
            <div className="wizard__progress">
                {STEPS.map((step) => (
                    <div
                        key={step.id}
                        className={`wizard__step ${step.id <= currentStep ? 'wizard__step--completed' : ''
                            }`}
                    />
                ))}
            </div>

            {/* Step Title */}
            <div style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)', margin: 0 }}>
                    {STEPS[currentStep - 1].title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: 'var(--spacing-xs) 0 0' }}>
                    Samm {currentStep} / {STEPS.length}
                </p>
            </div>

            {/* Content */}
            <div className="wizard__content">
                {currentStep === 1 && (
                    <IngredientGrid
                        ingredients={ingredients}
                        selectedIds={formData.selectedIngredientIds}
                        onSelect={handleIngredientSelect}
                        onAdd={() => setShowNewIngredientModal(true)}
                    />
                )}

                {currentStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {formData.ingredients.map((recipeIng) => {
                            const ing = getIngredientDetails(recipeIng.ingredientId);
                            if (!ing) return null;

                            return (
                                <div
                                    key={recipeIng.ingredientId}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--bg-card)',
                                        borderRadius: 'var(--radius-lg)',
                                    }}
                                >
                                    <span style={{ fontSize: '2rem' }}>{ing.emoji || '🍽️'}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 500 }}>{ing.name}</div>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-xs)' }}>
                                            <input
                                                type="number"
                                                className="input"
                                                style={{ width: '80px' }}
                                                value={recipeIng.amount}
                                                onChange={(e) =>
                                                    updateIngredientAmount(
                                                        recipeIng.ingredientId,
                                                        'amount',
                                                        parseFloat(e.target.value) || 0
                                                    )
                                                }
                                                min="0"
                                                step="0.1"
                                            />
                                            <span style={{ color: 'var(--text-secondary)', alignSelf: 'center' }}>
                                                {ing.unit}
                                            </span>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Märkus..."
                                        style={{ width: '120px' }}
                                        value={recipeIng.notes}
                                        onChange={(e) =>
                                            updateIngredientAmount(recipeIng.ingredientId, 'notes', e.target.value)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {currentStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {formData.instructions.map((instruction, index) => (
                            <div key={index} style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                                <span
                                    style={{
                                        background: 'var(--accent)',
                                        color: 'white',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 600,
                                        fontSize: 'var(--font-size-sm)',
                                        flexShrink: 0,
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <textarea
                                    className="input textarea"
                                    value={instruction}
                                    onChange={(e) => updateInstruction(index, e.target.value)}
                                    placeholder={`Samm ${index + 1}...`}
                                    style={{ flex: 1, minHeight: '80px' }}
                                />
                                <button
                                    className="btn btn--ghost btn--icon"
                                    onClick={() => removeInstruction(index)}
                                    disabled={formData.instructions.length === 1}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button className="btn btn--secondary" onClick={addInstruction}>
                            ➕ Lisa samm
                        </button>
                    </div>
                )}

                {currentStep === 4 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Lisa soovitusi ja nippe, mis aitavad retsepti paremini õnnestuda.
                        </p>
                        {formData.tips.map((tip, index) => (
                            <div key={index} style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <span style={{ color: 'var(--accent)' }}>💡</span>
                                <input
                                    type="text"
                                    className="input"
                                    value={tip}
                                    onChange={(e) => updateTip(index, e.target.value)}
                                    placeholder="Kirjuta nipp..."
                                    style={{ flex: 1 }}
                                />
                                <button className="btn btn--ghost btn--icon" onClick={() => removeTip(index)}>
                                    🗑️
                                </button>
                            </div>
                        ))}
                        <button className="btn btn--secondary" onClick={addTip}>
                            ➕ Lisa nipp
                        </button>
                    </div>
                )}

                {currentStep === 5 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div className="input-group">
                            <label className="input-label">Pealkiri *</label>
                            <input
                                type="text"
                                className="input"
                                value={formData.title}
                                onChange={(e) => updateFormData('title', e.target.value)}
                                placeholder="nt. Vanaema kartulisalat"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Kirjeldus</label>
                            <textarea
                                className="input textarea"
                                value={formData.description}
                                onChange={(e) => updateFormData('description', e.target.value)}
                                placeholder="Lühike kirjeldus retseptist..."
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Pilt</label>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    className="btn btn--secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    📁 Vali fail
                                </button>
                                <button className="btn btn--secondary" onClick={handleCameraCapture}>
                                    📷 Tee pilt
                                </button>
                            </div>
                            {formData.imageUrl && (
                                <div style={{ marginTop: 'var(--spacing-sm)', position: 'relative' }}>
                                    <img
                                        src={formData.imageUrl}
                                        alt="Eelvaade"
                                        style={{
                                            width: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-lg)',
                                        }}
                                    />
                                    <button
                                        className="btn btn--danger btn--sm"
                                        onClick={() => updateFormData('imageUrl', '')}
                                        style={{ position: 'absolute', top: '8px', right: '8px' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label className="input-label">Ettevalmistusaeg (min)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.prepTime}
                                    onChange={(e) => updateFormData('prepTime', e.target.value)}
                                    placeholder="nt. 15"
                                    min="0"
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Küpsetusaeg (min)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.cookTime}
                                    onChange={(e) => updateFormData('cookTime', e.target.value)}
                                    placeholder="nt. 30"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                            <div className="input-group">
                                <label className="input-label">Portsjoneid</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.servings}
                                    onChange={(e) => updateFormData('servings', e.target.value)}
                                    min="1"
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Käik</label>
                                <select
                                    className="input"
                                    value={formData.course}
                                    onChange={(e) => updateFormData('course', e.target.value)}
                                >
                                    <option value="">Vali...</option>
                                    {getCourseTypes().map((course) => (
                                        <option key={course.value} value={course.value}>
                                            {course.emoji} {course.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="wizard__footer">
                <button className="btn btn--secondary btn--full" onClick={handleBack}>
                    {currentStep === 1 ? 'Tühista' : 'Tagasi'}
                </button>
                <button
                    className="btn btn--primary btn--full"
                    onClick={handleNext}
                    disabled={!canProceed()}
                >
                    {currentStep === 5 ? 'Salvesta' : 'Edasi'}
                </button>
            </div>

            {/* New Ingredient Modal */}
            <Modal
                isOpen={showNewIngredientModal}
                onClose={() => setShowNewIngredientModal(false)}
                title="Lisa uus koostisosa"
            >
                <IngredientForm
                    onSubmit={handleNewIngredient}
                    onCancel={() => setShowNewIngredientModal(false)}
                />
            </Modal>
        </div>
    );
}
