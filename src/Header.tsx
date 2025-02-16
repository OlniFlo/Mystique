import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setIsMenuOpen(true);
    const handleMouseLeave = () => setIsMenuOpen(false);

    /**
     * Ferme le menu si on clique en dehors.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node))
                setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={"app-header"}>
            <button onClick={onRefresh} className={"refresh-button"} title={"Rafraichir la page"}>
                <span className={"refresh-icon"}></span>
            </button>

            <nav className={"app-nav"} ref={menuRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button
                    className={`menu-button ${isMenuOpen ? "open" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={"dropdown-arrow"}></span>
                    Menu
                </button>

                <ul className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
                    <li>
                        <NavLink
                            to={"/"}
                            end
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Setlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/Repertoire"}
                            end
                            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Répertoire
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className={"logo-container"}>
                <img src={"./logo.jpeg"} alt={"Logo"} className={"logo"} />
            </div>
        </header>
    );
};

export default Header;