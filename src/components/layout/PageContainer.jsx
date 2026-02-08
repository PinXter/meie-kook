import ThemeToggle from '../common/ThemeToggle';

export default function PageContainer({ children, title, actions }) {
    return (
        <div className="page">
            {title && (
                <header className="page__header">
                    <h1 className="page__title">{title}</h1>
                    <div className="page__actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <ThemeToggle />
                        {actions}
                    </div>
                </header>
            )}
            <main className="page__content">{children}</main>
        </div>
    );
}
