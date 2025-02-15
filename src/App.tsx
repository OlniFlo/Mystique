import React, {useEffect, useRef, useState} from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
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

    return (
        <Router>
            <div className={"App"}>
                <header className={"app-header"}>
                    <nav className={"app-nav"} ref={menuRef} onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <button
                            className={`menu-button ${isMenuOpen ? "open" : ""}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="dropdown-arrow"></span>
                            Menu
                        </button>

                        <ul className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
                            <li>
                                <NavLink
                                    to={"/Mystique/"}
                                    end
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Setlist
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/Mystique/Repertoire/"}
                                    end
                                    className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Répertoire
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main className={"app-main"}>
                    <Routes>
                        <Route path={"/Mystique/"} element={<MusicSetlistApp/>}/>
                        <Route path={"/Mystique/Repertoire"} element={<MusicListApp/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;