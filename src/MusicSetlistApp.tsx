import React, { useEffect, useState } from "react";
import "./musicListApp.css";
import {checkFileExists} from "./Utils";

interface Setlist
{
    title: string;
    description?: string;
    pdf?: string;
}

const MusicSetlistApp: React.FC = () => {
    const [setlists, setSetlists] = useState<Setlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [validPdfs, setValidPdfs] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch('./musicSetlist.json')
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors du chargement du fichier JSON");
                return response.json();
            })
            .then(async (data: Setlist[]) => {
                const pdfChecks = data.map(track =>
                    track.pdf ? checkFileExists(`/Mystique/Documents/${track.pdf}`) : Promise.resolve(false)
                );

                const pdfResults = await Promise.all(pdfChecks);

                const validPdfsSet = new Set<string>(
                    data.filter((_, index) => pdfResults[index] && data[index].pdf)
                        .map(track => track.pdf as string)
                );

                setValidPdfs(validPdfsSet);
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

                            {setlist.pdf && validPdfs.has(setlist.pdf) && (
                                <div className={"track-download"}>
                                    <a href={`./Documents/${setlist.pdf}`} target={"_blank"}
                                       rel={"noopener noreferrer"}
                                       className={"download-link"}>
                                        Voir la Setlist
                                    </a>
                                    <a href={`./Documents/${setlist.pdf}`} download className={"download-link"}>
                                        Télécharger la Setlist
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
