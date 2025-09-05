/**
 * Generates a human-readable error message based on the HTTP response status.
 *
 * @param {Object} response - The HTTP response object.
 * @param {number} response.status - The HTTP status code from the response.
 * @returns {string} The error message corresponding to the provided HTTP status code.
 */
export function handleHttpErrors(response) {
    switch (response.status) {
        case 400:
            return "Requête invalide. Veuillez vérifier vos données.";
        case 401:
            return "Email ou mot de passe incorrect. Veuillez réessayer.";
        case 403:
            return "Vous n'êtes pas autorisé(e) à effectuer cette action.";
        case 404:
            return "Ressource introuvable.";
        case 418:
            return "I'm a teapot.";
        case 500:
            return "Erreur serveur. Veuillez réessayer plus tard.";
        default:
            return `Erreur inattendue (${response?.status ?? "inconnue"}).`;
    }
}
