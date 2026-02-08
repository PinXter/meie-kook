import { useState } from 'react';

export default function ServingsScaler({ original, value, onChange }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                Portsjoneid:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <button
                    className="btn btn--secondary btn--icon"
                    onClick={() => onChange(Math.max(1, value - 1))}
                    disabled={value <= 1}
                >
                    −
                </button>
                <span
                    style={{
                        minWidth: '2rem',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: 'var(--font-size-lg)',
                    }}
                >
                    {value}
                </span>
                <button
                    className="btn btn--secondary btn--icon"
                    onClick={() => onChange(value + 1)}
                >
                    +
                </button>
            </div>
            {value !== original && (
                <button
                    className="btn btn--ghost btn--sm"
                    onClick={() => onChange(original)}
                >
                    Lähtesta ({original})
                </button>
            )}
        </div>
    );
}
