import React from "react";
import "./LegalMentions.css";

const LegalMentions: React.FC = () => {
    return (
        <div className={"legal-mentions"}>
            <h1>Mentions Légales</h1>

            <section>
                <h2>1. Éditeur du site</h2>
                <p>
                    Ce site est édité et maintenu par <strong>Théo DILL</strong>. <br/>
                    Il est hébergé sur le compte GitHub de <strong>OlniFlo</strong>, qui peut également le modifier si
                    nécessaire. <br/>
                    Contact : <a href="mailto:dill.fisselbrand.theo@gmail.com">dill.fisselbrand.theo@gmail.com</a>
                </p>
            </section>

            <section>
                <h2>2. Hébergement</h2>
                <p>
                    Ce site est hébergé par <strong>GitHub Pages</strong>, un service proposé par GitHub Inc. <br/>
                    Adresse : <strong>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA</strong> <br/>
                    Site web : <a href={"https://pages.github.com/"} target={"_blank"}
                                  rel={"noopener noreferrer"}>pages.github.com</a>
                </p>
            </section>

            <section>
                <h2>3. Réalisation du site</h2>
                <p>
                    Ce site a été conçu et développé par <strong>Théo DILL</strong>. <br/>
                    Pour toute question relative au développement, vous pouvez nous contacter à :{" "}
                    <a href={"mailto:dill.fisselbrand.theo@gmail.com"}>dill.fisselbrand.theo@gmail.com</a>.
                </p>
            </section>

            <section>
                <h2>4. Responsable du site</h2>
                <p>
                    Le site est administré par <strong>OlniFlo</strong>. <br/>
                    Le responsable de la publication est <strong>OlniFlo</strong>.
                </p>
            </section>

            <section>
                <h2>5. Propriété intellectuelle</h2>
                <p>
                    Tout le contenu de ce site (textes, images, logos, vidéos, etc.) est protégé par le droit
                    d’auteur et est la propriété exclusive de <strong>OlniFlo</strong>. Toute reproduction,
                    diffusion ou modification sans autorisation est interdite.
                </p>
            </section>

            <section>
                <h2>6. Responsabilité</h2>
                <p>
                    Les informations fournies sur ce site sont données à titre indicatif. <strong>OlniFlo</strong>{" "}
                    ne peut être tenu responsable en cas d’inexactitude ou d’omission.
                </p>
            </section>

            <section>
                <h2>7. Données personnelles</h2>
                <p>
                    Ce site ne collecte aucune donnée personnelle. Aucune information personnelle n'est enregistrée,
                    traitée ou partagée avec des tiers.
                </p>
            </section>
        </div>
    );
};

export default LegalMentions;