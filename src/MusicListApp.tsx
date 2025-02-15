import React, { useEffect, useState } from "react";
import "./musicListApp.css";

interface Track
{
    title: string;
    audio?: string;
    pdf?: string;
    genre?: string;
}

const MusicListApp: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/musicList.json')
            .then((response) => {
                if (!response.ok)
                    throw new Error("Erreur lors du chargement du fichier JSON");
                return response.json();
            })
            .then(async (data: Track[]) => {
                setTracks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <p>Chargement...</p>;

    return (
        <div className={"music-list-container"}>
            <main className={"music-main"}>
                <ul className={"music-items"}>
                    {tracks.map((track, index) => (
                        <li key={index} className={"music-item"}>
                            <div className={"track-header"}>
                                <span className={"track-number"}>{index + 1}.</span>
                                <h2 className={"track-title"}>{track.title}</h2>
                            </div>

                            {track.genre && <p className={"track-genre"}>Genre : {track.genre}</p>}

                            {track.audio && (
                                <div className={"track-audio"}>
                                    <audio controls className={"audio-player"}>
                                        <source src={`./audios/${track.audio}`} type={"audio/mpeg"} />
                                        Votre navigateur ne supporte pas l'élément audio.
                                    </audio>
                                </div>
                            )}

                            {track.pdf && (
                                <div className={"track-download"}>
                                    <a href={`./partitions/${track.pdf}`} download className={"download-link"}>
                                        Télécharger la partition
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

export default MusicListApp;