import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import MusicListApp from "./MusicListApp";
import "./App.css";

function App()
{
    const isActive: boolean = true;
    return (
        <Router>
            <div className={"App"}>
                <header className={"app-header"}>
                    <nav className={"app-nav"}>
                        <NavLink
                            to={"/"}
                            end
                            className={({ isActive }: { isActive: boolean }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            Répertoire
                        </NavLink>
                    </nav>
                </header>

                <main className={"app-main"}>
                    <Routes>
                        <Route path={"/"} element={<MusicListApp />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;