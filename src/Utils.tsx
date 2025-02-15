/**
 * Vérifie si un fichier existe réellement en testant sa taille.
 * @param filePath - Chemin du fichier.
 * @returns {Promise<boolean>} - Retourne true si le fichier existe et a une taille correcte, sinon false.
 */
export const checkFileExists = async (filePath: string): Promise<boolean> => {
    try
    {
        const response = await fetch(filePath, {
            method: "HEAD",
            cache: "no-store",
        });

        const contentLength = response.headers.get("Content-Length");

        return !((response.status === 404 || !response.ok) || (!contentLength || parseInt(contentLength, 10) === 0));
    }
    catch (error)
    {
        return false;
    }
};