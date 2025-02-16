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
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

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

    // Extrait les genres uniques pour le menu déroulant.
    const genres = Array.from(new Set(tracks.map(track => track.genre).filter(Boolean))) as string[];
    const availableGenres = genres.filter(genre => !selectedGenres.has(genre) && genre.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleAddGenre = (genre: string, shouldShowOptions: boolean = false) => {
        setSelectedGenres(prev => new Set([...prev, genre]));
        setSearchTerm("");
        setShowSuggestions(shouldShowOptions);
    };

    const handleRemoveGenre = (genre: string) => {
        setSelectedGenres(prev => {
            const newSet = new Set(prev);
            newSet.delete(genre);
            return newSet;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && availableGenres.length > 0)
        {
            handleAddGenre(availableGenres[0], true);
        }
    };

    // Filtre les morceaux par genre sélectionné tout en conservant l'ordre.
    const filteredTracks =
        selectedGenres.size > 0
            ? tracks.map((track, index) => (selectedGenres.has(track.genre!) ? { ...track, index } : null))
                .filter(Boolean) as (Track & { index: number })[]
            : tracks.map((track, index) => ({ ...track, index }));

    if (loading)
        return <p>Chargement...</p>;

    return (
        <div className={"music-list-container"}>
            <div className={"genre-filter"}>
                <label>Filtrer par genres :</label>
                <div className={"filter-input-container"}>
                    {Array.from(selectedGenres).map((genre) => (
                        <span key={genre} className={"filter-tag"}>
                            {genre}
                            <button onClick={() => handleRemoveGenre(genre)} className={"remove-tag"}>×</button>
                        </span>
                    ))}
                    <input
                        type={"text"}
                        placeholder={"Rechercher un genre"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {showSuggestions && availableGenres.length > 0 && (
                    <ul className={"genre-suggestions"}>
                        {availableGenres.map((genre) => (
                            <li key={genre} onClick={() => handleAddGenre(genre)}>
                                {genre}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <main className={"music-main"}>
                <ul className={"music-items"}>
                    {filteredTracks.map((track, index) => {
                        return (
                            <li key={track.index} className={"music-item"}>
                                <div className={"track-header"}>
                                    <span className={"track-number"}>{track.index + 1}.</span>
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
                                            <span className={"eye-icon"}></span>
                                            Voir la partition
                                        </a>
                                        <a href={`/Mystique/partitions/${track.pdf}`} download
                                           className={"download-link"}>
                                            <span className={"upload-icon"}></span>
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