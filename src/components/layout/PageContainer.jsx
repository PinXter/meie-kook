export default function PageContainer({ children, title, actions }) {
    return (
        <div className="page">
            {title && (
                <header className="page__header">
                    <h1 className="page__title">{title}</h1>
                    {actions && <div className="page__actions">{actions}</div>}
                </header>
            )}
            <main className="page__content">{children}</main>
        </div>
    );
}
