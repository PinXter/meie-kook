import { useState } from 'react';
import { getAvailableUnits, validateIngredient } from '../../lib/utils';

const POPULAR_EMOJIS = [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒',
    '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🥦', '🥬', '🥒',
    '🌶️', '🫑', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞',
    '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥛', '🍗', '🍖', '🥩',
    '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙',
    '🧆', '🥗', '🍝', '🍜', '🍲', '🍛', '🍣', '🍤', '🦐', '🦀',
    '🦞', '🦑', '🐟', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫',
    '🍬', '🍭', '🍮', '🍯', '☕', '🍵', '🧃', '🥤', '🧋', '🍺',
];

export default function IngredientForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        emoji: initialData?.emoji || '',
        unit: initialData?.unit || 'g',
        caloriesPerUnit: initialData?.caloriesPerUnit || '',
        healthiness: initialData?.healthiness || 5,
    });
    const [errors, setErrors] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateIngredient(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSubmit({
            ...formData,
            caloriesPerUnit: formData.caloriesPerUnit
                ? parseFloat(formData.caloriesPerUnit)
                : null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="ingredient-form">
            <div className="input-group">
                <label className="input-label">Nimi *</label>
                <input
                    type="text"
                    className={`input ${errors.name ? 'input--error' : ''}`}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="nt. Kartul"
                />
                {errors.name && <span className="input-error">{errors.name}</span>}
            </div>

            <div className="input-group">
                <label className="input-label">Emoji (ikoon)</label>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <input
                        type="text"
                        className="input"
                        value={formData.emoji}
                        onChange={(e) => handleChange('emoji', e.target.value)}
                        placeholder="nt. 🥔"
                        style={{ flex: 1 }}
                    />
                    <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        😀
                    </button>
                </div>

                {showEmojiPicker && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(10, 1fr)',
                            gap: 'var(--spacing-xs)',
                            padding: 'var(--spacing-sm)',
                            background: 'var(--bg-card)',
                            borderRadius: 'var(--radius-md)',
                            marginTop: 'var(--spacing-sm)',
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    >
                        {POPULAR_EMOJIS.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                    handleChange('emoji', emoji);
                                    setShowEmojiPicker(false);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    padding: 'var(--spacing-xs)',
                                    borderRadius: 'var(--radius-sm)',
                                    transition: 'background var(--transition-fast)',
                                }}
                                onMouseOver={(e) => (e.target.style.background = 'var(--bg-card-hover)')}
                                onMouseOut={(e) => (e.target.style.background = 'none')}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="input-group">
                <label className="input-label">Mõõtühik *</label>
                <select
                    className={`input ${errors.unit ? 'input--error' : ''}`}
                    value={formData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                >
                    {getAvailableUnits().map((unit) => (
                        <option key={unit.value} value={unit.value}>
                            {unit.label}
                        </option>
                    ))}
                </select>
                {errors.unit && <span className="input-error">{errors.unit}</span>}
            </div>

            <div className="input-group">
                <label className="input-label">Kalorid ühiku kohta</label>
                <input
                    type="number"
                    className="input"
                    value={formData.caloriesPerUnit}
                    onChange={(e) => handleChange('caloriesPerUnit', e.target.value)}
                    placeholder="nt. 77 (1g kohta)"
                    min="0"
                    step="0.1"
                />
            </div>

            <div className="input-group">
                <label className="input-label">
                    Tervislikkus: {formData.healthiness}/10
                </label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.healthiness}
                    onChange={(e) => handleChange('healthiness', parseInt(e.target.value))}
                    style={{ width: '100%' }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--text-muted)',
                    }}
                >
                    <span>Ebatervislik</span>
                    <span>Väga tervislik</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-lg)' }}>
                <button type="button" className="btn btn--secondary btn--full" onClick={onCancel}>
                    Tühista
                </button>
                <button type="submit" className="btn btn--primary btn--full">
                    {initialData ? 'Salvesta' : 'Lisa'}
                </button>
            </div>
        </form>
    );
}
