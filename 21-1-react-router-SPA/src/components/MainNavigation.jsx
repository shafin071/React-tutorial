import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
        return (
                <header className={classes.header}>
                        <nav>
                                <ul className={classes.list}>
                                        <li>
                                                {/* NavLink functions just like Link but will add styling attributes to the rendered element when it matches the current URL. */}
                                                <NavLink
                                                        to="/"
                                                        className={({ isActive }) =>
                                                                isActive ? classes.active : undefined
                                                        }
                                                        end  // this is a NavLink prop that says only apply the className if the URL ends with
                                                                // the "/". Otherwise NavLink will apply the className to all paths that starts with
                                                                // "/", so product link will also show as active since it starts with "/"
                                                >
                                                        Home
                                                </NavLink>
                                        </li>

                                        <li>
                                                <NavLink
                                                        to="/products"
                                                        className={({ isActive }) =>
                                                                isActive ? classes.active : undefined
                                                        }
                                                >
                                                        Products
                                                </NavLink>
                                        </li>
                                </ul>
                        </nav>
                </header>
        );
}

export default MainNavigation;
