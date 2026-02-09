import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useShoppingStore } from '../../lib/store';

export default function PageContainer({ children, title, actions }) {
    const shoppingItems = useShoppingStore((state) => state.items);
    const uncheckedCount = shoppingItems.filter(i => !i.isChecked).length;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Full-width sticky header */}
            {title && (
                <header className="site-header">
                    <div className="site-header__inner">
                        <h1 className="site-header__title">
                            <Link to="/">{title}</Link>
                        </h1>
                        <div className="site-header__actions">
                            <ThemeToggle />
                            <Link to="/shopping" className="site-header__cart" title="Ostunimekiri">
                                🛒
                                {uncheckedCount > 0 && (
                                    <span className="site-header__cart-badge">
                                        {uncheckedCount > 9 ? '9+' : uncheckedCount}
                                    </span>
                                )}
                            </Link>
                            {actions}
                        </div>
                    </div>
                </header>
            )}

            {/* Content with max-width */}
            <main className="page-content">
                {children}
            </main>
        </>
    );
}
