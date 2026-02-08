import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useShoppingStore } from '../../lib/store';

export default function PageContainer({ children, title, actions }) {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const shoppingItems = useShoppingStore((state) => state.items);
    const uncheckedCount = shoppingItems.filter(i => !i.isChecked).length;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header if scrolling up or at very top
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsHeaderVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide header if scrolling down past 100px
                setIsHeaderVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className="page">
            {title && (
                <header
                    className={`page__header ${isHeaderVisible ? 'page__header--visible' : 'page__header--hidden'}`}
                >
                    <h1 className="page__title">
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {title}
                        </Link>
                    </h1>
                    <div className="page__actions">
                        <ThemeToggle />

                        {/* Shopping cart button */}
                        <Link
                            to="/shopping"
                            className="shopping-btn"
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
                                position: 'relative',
                                textDecoration: 'none',
                                boxShadow: 'var(--shadow-sm)',
                            }}
                            title="Ostunimekiri"
                        >
                            🛒
                            {uncheckedCount > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-4px',
                                        background: 'var(--accent)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-full)',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    {uncheckedCount > 9 ? '9+' : uncheckedCount}
                                </span>
                            )}
                        </Link>

                        {actions}
                    </div>
                </header>
            )}
            <main className="page__content">{children}</main>
        </div>
    );
}
