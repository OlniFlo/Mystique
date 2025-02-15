import React, { useEffect, useState } from "react";
import "./musicListApp.css";

interface Setlist
{
    title: string;
    description?: string;
    pdf?: string;
}

const MusicSetlistApp: React.FC = () => {
    const [setlists, setSetlists] = useState<Setlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('./musicSetlist.json')
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors du chargement du fichier JSON");
                return response.json();
            })
            .then((data: Setlist[]) => {
                setSetlists(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div className={"music-list-container"}>
            <main className={"music-main"}>
                <ul className={"music-items"}>
                    {setlists.map((setlist, index) => (
                        <li key={index} className={"music-item"}>
                            <div className={"track-header"}>
                                <span className={"track-number"}>{index + 1}.</span>
                                <h2 className={"track-title"}>{setlist.title}</h2>
                            </div>

                            {setlist.description && (
                                <p className={"track-genre"}>{setlist.description}</p>
                            )}

                            {setlist.pdf && (
                                <div className={"track-download"}>
                                    <a href={`./partitions/${setlist.pdf}`} download className={"download-link"}>
                                        Télécharger le document
                                    </a>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default MusicSetlistApp;