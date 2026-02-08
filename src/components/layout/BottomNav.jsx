import { NavLink } from 'react-router-dom';

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <ul className="bottom-nav__list">
                <li className="bottom-nav__item">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">🏠</span>
                        <span>Avaleht</span>
                    </NavLink>
                </li>
                <li className="bottom-nav__item">
                    <NavLink
                        to="/ingredients"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">🥕</span>
                        <span>Koostisosad</span>
                    </NavLink>
                </li>
                <li className="bottom-nav__item">
                    <NavLink
                        to="/recipe/new"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">➕</span>
                        <span>Lisa</span>
                    </NavLink>
                </li>
                <li className="bottom-nav__item">
                    <NavLink
                        to="/shopping"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">🛒</span>
                        <span>Ostud</span>
                    </NavLink>
                </li>
                <li className="bottom-nav__item">
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">⭐</span>
                        <span>Lemmikud</span>
                    </NavLink>
                </li>
                <li className="bottom-nav__item">
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `bottom-nav__link ${isActive ? 'bottom-nav__link--active' : ''}`
                        }
                    >
                        <span className="bottom-nav__icon">⚙️</span>
                        <span>Settings</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
