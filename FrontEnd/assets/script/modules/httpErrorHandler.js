/**
 * Generates a human-readable error message based on the HTTP response status.
 *
 * @param {Object} response - The HTTP response object.
 * @param {number} response.status - The HTTP status code from the response.
 * @returns {string} The error message corresponding to the provided HTTP status code.
 */
export function handleHttpErrors(response) {
    switch (response.status) {
        // 4xx Client errors
        case 400:
            return "Requête invalide. Veuillez vérifier vos données.";
        case 401:
            return "Email ou mot de passe incorrect. Veuillez réessayer.";
        case 402:
            return "Paiement requis pour accéder à cette ressource.";
        case 403:
            return "Vous n'êtes pas autorisé(e) à effectuer cette action.";
        case 404:
            return "Ressource introuvable.";
        case 405:
            return "Méthode non autorisée pour cette ressource.";
        case 406:
            return "Format de réponse non acceptable.";
        case 407:
            return "Authentification proxy requise.";
        case 408:
            return "La requête a expiré. Veuillez réessayer.";
        case 409:
            return "Conflit détecté. Veuillez vérifier vos données.";
        case 410:
            return "La ressource demandée n'existe plus.";
        case 411:
            return "Longueur de la requête requise.";
        case 412:
            return "Précondition de la requête échouée.";
        case 413:
            return "La charge utile de la requête est trop volumineuse.";
        case 414:
            return "URI trop longue.";
        case 415:
            return "Type de média non supporté.";
        case 416:
            return "Plage de requête non satisfaisante.";
        case 417:
            return "Échec de l'attente de la requête.";
        case 418:
            return "I'm a teapot.";
        case 422:
            return "Entité non traitable.";
        case 425:
            return "Trop tôt pour traiter la requête.";
        case 426:
            return "Mise à niveau requise.";
        case 428:
            return "Précondition requise.";
        case 429:
            return "Trop de requêtes. Veuillez patienter.";
        case 431:
            return "Champs d'en-tête trop volumineux.";
        case 451:
            return "Indisponible pour des raisons légales.";

        // 5xx Server errors
        case 500:
            return "Erreur serveur. Veuillez réessayer plus tard.";
        case 501:
            return "Fonctionnalité non implémentée.";
        case 502:
            return "Mauvaise passerelle.";
        case 503:
            return "Service indisponible. Veuillez réessayer plus tard.";
        case 504:
            return "Délai d'attente de la passerelle dépassé.";
        case 505:
            return "Version HTTP non supportée.";
        case 506:
            return "Négociation de variante échouée.";
        case 507:
            return "Stockage insuffisant.";
        case 508:
            return "Boucle détectée.";
        case 510:
            return "Extension requise non supportée.";
        case 511:
            return "Authentification réseau requise.";

        default:
            return `Erreur inattendue (${response?.status ?? "inconnue"}).`;
    }
}

