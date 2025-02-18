import React, {useEffect} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MusicListApp from "./MusicListApp";
import "./App.css";
import MusicSetlistApp from "./MusicSetlistApp";
import LegalMentions from "./LegalMentions";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";

function App()
{
    /**
     * Redirige vers #/Mystique/.
     */
    useEffect(() => {
        if (!window.location.hash) {
            window.location.replace("#/Mystique/");
        }
    }, []);

    const clearCacheAndReload = async () => {
        if ("caches" in window)
        {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(cache => caches.delete(cache)));
        }
        window.location.reload();
    };

    return (
        <Router basename={"/Mystique/"}>
            <div className={"App"}>
                <Header onRefresh={clearCacheAndReload} />

                <main className={"app-main"}>
                    <Routes>
                        <Route path={"/"} element={<Home />}/>
                        <Route path={"/Setlist"} element={<MusicSetlistApp/>}/>
                        <Route path={"/Repertoire"} element={<MusicListApp/>}/>
                        <Route path={"/mentions-legales"} element={<LegalMentions />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;