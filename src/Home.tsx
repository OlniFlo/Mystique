import React, { useEffect, useState } from "react";
import "./Home.css";

interface HomeContent
{
    title: string;
    description: string;
    image: string;
    additionalImage?: string;
}

const Home: React.FC = () => {
    const [content, setContent] = useState<HomeContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("./homeData.json")
            .then((response) => {
                if (!response.ok) throw new Error("Erreur lors du chargement du fichier JSON");
                return response.json();
            })
            .then(async (data: HomeContent) => {
                // Vérifie si le JSON contient bien les données attendues
                const isValid = data.title && data.description;

                if (isValid)
                    setContent(data);
                else
                    throw new Error("Le fichier JSON ne contient pas les données attendues");

                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, []);

    if (loading)
    {
        return <p>Chargement...</p>;
    }

    if (!content)
    {
        return <p>Erreur lors du chargement du contenu.</p>;
    }

    return (
        <div className={"home-container"}>
            <div className={"home-content"}>
                <h1 className={"home-title"}>{content.title}</h1>
                <p className={"home-description"}>{content.description}</p>
                <img src={content.image} alt={"Logo"} className={"home-image"}/>
                {content.additionalImage && <img src={content.additionalImage} alt={"Groupe"} className={"additional-image"} />}
            </div>
        </div>
    );
};

export default Home;
