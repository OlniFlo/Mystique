import React, {useEffect, useRef, useState} from "react";
import "./musicListApp.css";
import {checkFileExists} from "./Utils";

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
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [validAudios, setValidAudios] = useState<Set<string>>(new Set());
    const [validPdfs, setValidPdfs] = useState<Set<string>>(new Set());

    // Utilisation d'une Map pour stocker les références des audios.
    const audioRefs = useRef<Map<number, HTMLAudioElement>>(new Map());

    useEffect(() => {
        fetch('/Mystique/musicList.json')
            .then((response) => {
                if (!response.ok)
                    throw new Error("Erreur lors du chargement du fichier JSON");
                return response.json();
            })
            .then(async (data: Track[]) => {
                const audioChecks = data.map(track =>
                    track.audio ? checkFileExists(`/Mystique/audios/${track.audio}`) : Promise.resolve(false)
                );
                const pdfChecks = data.map(track =>
                    track.pdf ? checkFileExists(`/Mystique/partitions/${track.pdf}`) : Promise.resolve(false)
                );

                const audioResults = await Promise.all(audioChecks);
                const pdfResults = await Promise.all(pdfChecks);

                const validAudiosSet = new Set<string>(
                    data.filter((_, index) => audioResults[index] && data[index].audio)
                        .map(track => track.audio as string)
                );

                const validPdfsSet = new Set<string>(
                    data.filter((_, index) => pdfResults[index] && data[index].pdf)
                        .map(track => track.pdf as string)
                );

                setValidAudios(validAudiosSet);
                setValidPdfs(validPdfsSet);
                setTracks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, []);

    /**
     * Gère la lecture d'un audio, en stoppant l'audio en cours si nécessaire.
     * @param index - Index de l'audio joué.
     */
    const handlePlay = (index: number) => {
        const newAudio = audioRefs.current.get(index);

        if (!newAudio) return;

        // Stop l'audio précédent s'il existe
        if (currentAudio && currentAudio !== newAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Met à jour l'état avec le nouvel audio en lecture
        setCurrentAudio(newAudio);
    };

    if (loading)
        return <p>Chargement...</p>;

    return (
        <div className={"music-list-container"}>
            <main className={"music-main"}>
                <ul className={"music-items"}>
                    {tracks.map((track, index) => {
                        return (
                            <li key={index} className={"music-item"}>
                                <div className={"track-header"}>
                                    <span className={"track-number"}>{index + 1}.</span>
                                    <h2 className={"track-title"}>{track.title}</h2>
                                </div>

                                {track.genre && <p className={"track-genre"}>Genre : {track.genre}</p>}

                                {track.audio && validAudios.has(track.audio) && (
                                    <div className={"track-audio"}>
                                        <audio
                                            ref={(el) => {
                                                if (el) audioRefs.current.set(index, el);
                                            }}
                                            controls
                                            className="audio-player"
                                            onPlay={() => handlePlay(index)}
                                        >
                                            <source src={`/Mystique/audios/${track.audio}`} type={"audio/mpeg"}/>
                                            Votre navigateur ne supporte pas l'élément audio.
                                        </audio>
                                    </div>
                                )}

                                {track.pdf && validPdfs.has(track.pdf) && (
                                    <div className={"track-download"}>
                                        <a href={`/Mystique/partitions/${track.pdf}`} target={"_blank"}
                                           rel={"noopener noreferrer"}
                                           className={"download-link"}>
                                            Voir la partition
                                        </a>
                                        <a href={`/Mystique/partitions/${track.pdf}`} download
                                           className={"download-link"}>
                                            Télécharger la partition
                                        </a>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </main>
        </div>
    );
};

export default MusicListApp;