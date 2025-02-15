import React, {useEffect, useRef, useState} from "react";
import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MusicListApp from "./MusicListApp";
import "./App.css";
import MusicSetlistApp from "./MusicSetlistApp";

function App()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);


    const handleMouseEnter = () => setIsMenuOpen(true);
    const handleMouseLeave = () => setIsMenuOpen(false);

    /**
     * Redirige vers #/Mystique/.
     */
    useEffect(() => {
        if (!window.location.hash) {
            window.location.replace("#/Mystique/");
        }
    }, []);

    /**
     * Ferme le menu si on clique en dehors.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const clearCacheAndReload = async () => {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(cache => caches.delete(cache)));
        }
        window.location.reload();
    };

    return (
        <Router basename={"/Mystique/"}>
            <div className={"App"}>
                <header className={"app-header"}>
                    <button onClick={clearCacheAndReload} className={"refresh-button"} title={"Rafraichir la page"}>
                        <span className={"refresh-icon"}></span>
                    </button>
                    <nav className={"app-nav"} ref={menuRef} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
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
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Setlist
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/Repertoire"}
                                    end
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Répertoire
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className={"logo-container"}>
                        <img src={"./logo.jpeg"} alt={"Logo"} className={"logo"}/>
                    </div>
                </header>

                <main className={"app-main"}>
                    <Routes>
                        <Route path={"/"} element={<MusicSetlistApp/>}/>
                        <Route path={"/Repertoire"} element={<MusicListApp/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;