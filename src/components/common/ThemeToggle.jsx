import { useState, useEffect } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage or default to dark
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-sm)',
            }}
            title={isDark ? 'Lülita heledasse režiimi' : 'Lülita tumedasse režiimi'}
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}
