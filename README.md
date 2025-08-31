# 🏛️ Site d'Architecte d'Intérieur - Page Web Dynamique

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)

---

## 📌 Description

Projet de création d'une **page web dynamique** pour présenter les travaux d'une architecte d'intérieur.  

Fonctionnalités principales :

- Page de présentation des travaux.
- Page de **connexion administrateur**.
- Modale pour **upload de médias**.
- Communication avec une **API**.

Développement entièrement **Front-End**, avec HTML, CSS et JavaScript.

---

## 🎯 Objectifs

- Récupérer et gérer les données utilisateurs via **formulaires**.
- Manipuler le **DOM** et gérer les **événements utilisateurs**.
- Communiquer avec une **API**.

---

## 🛠️ Outils

- JavaScript, HTML, CSS  
- Figma (maquettes)  
- Visual Studio Code (développement)  
- GitHub (versioning)

## 🛠️ Étapes du projet

### Étape 1-1 : Récupération des travaux depuis le back-end
- **Objectif** : Afficher la galerie avec les travaux de l'architecte récupérés via l’API.
- **Pré-requis** :
  - Environnement de développement installé.
  - Vérification que le back-end renvoie les informations (ex. avec Postman ou Swagger).
- **À obtenir** : Galerie fonctionnelle avec les projets récupérés dynamiquement.
- **Recommandations** :
  - Utiliser `fetch` pour récupérer les projets.
  - Ajouter dynamiquement les travaux au DOM.
  - Supprimer les projets statiques du HTML.

---

### Étape 1-2 : Filtrage des travaux par catégorie
- **Objectif** : Ajouter un menu de filtres pour trier les travaux par catégorie.
- **Pré-requis** : Galerie fonctionnelle avec tous les projets.
- **À obtenir** : Menu dynamique permettant de filtrer les travaux par catégorie.
- **Recommandations** :
  - Récupérer dynamiquement les catégories depuis les données.
  - Vérifier si un appel supplémentaire à l’API est nécessaire.
  - Maintenir une option “Tous les travaux” par défaut.

---

### Étape 2-1 : Intégration du design de la page de formulaire
- **Objectif** : Intégrer la page de connexion en suivant la maquette.
- **Pré-requis** : Galerie fonctionnelle et filtrable.
- **À obtenir** : Page de login intégrée (non fonctionnelle pour l’instant).
- **Recommandations** :
  - Vérifier la conformité avec la maquette.

---

### Étape 2-2 : Authentification de l'utilisateur
- **Objectif** : Rendre le formulaire de connexion fonctionnel.
- **Pré-requis** : Formulaire intégré à la page de login.
- **À obtenir** :
  - Redirection vers la page d’accueil si connexion réussie.
  - Message d’erreur si identifiants incorrects.
- **Recommandations** :
  - Déterminer le type de requête à utiliser pour envoyer les données.
  - Gérer correctement la redirection et la conservation de l’état utilisateur.
  - Prévenir l’utilisateur si la combinaison identifiant/mot de passe est incorrecte.
- **Point de vigilance** : Stocker le token pour les futures opérations (ajout/suppression de travaux).
- **Ressources** : Chapitre “Sauvegarder les données grâce à une API HTTP” du cours “Créez des pages web dynamiques avec JavaScript”.

---

### Étape 3-1 : Ajout de la fenêtre modale
- **Objectif** : Créer la modale pour ajouter des médias et gérer son ouverture/fermeture.
- **Pré-requis** : Possibilité de se connecter comme administrateur.
- **À obtenir** :
  - Modale fonctionnelle pour ajouter des médias.
  - Déclenchement au clic sur le bouton Modifier, fermeture au clic sur la croix ou en dehors de la modale.
- **Recommandations** :
  - Étudier les maquettes pour organiser le contenu et les actions.
  - Intégrer les deux vues ("Galerie photo" et "Ajout photo") dans une seule modale.
- **Points de vigilance** :
  - S’assurer qu’une seule modale est présente dans le code même après plusieurs ouvertures/fermetures.

---

### Étape 3-2 : Suppression de travaux existants
- **Objectif** : Rendre la suppression des travaux fonctionnelle avec mise à jour du DOM.
- **Pré-requis** : Modale fonctionnelle pour ajouter des projets.
- **À obtenir** : Possibilité de supprimer un projet depuis la galerie.
- **Recommandations** :
  - Construire correctement la requête `fetch` pour supprimer un élément (voir Swagger).
  - Retirer dynamiquement l’élément du DOM après confirmation de suppression.
- **Points de vigilance** :
  - Aucune nécessité de recharger la page pour voir la suppression.
  ---

### Étape 3-3 : Envoi d’un nouveau projet via le formulaire de la modale
- **Objectif** : Ajouter de nouveaux travaux pour l’architecte.
- **Pré-requis** : Modale fonctionnelle.
- **À obtenir** :
  - Message d’erreur si le formulaire est mal rempli.
  - Réponse de l’API si le formulaire est correctement envoyé.
  - Nouveau projet visible dans la galerie après rechargement.
- **Recommandations** :
  - Vérifier que toutes les informations nécessaires sont présentes avant l’envoi via `fetch`.

---

### Étape 3-4 : Traitement dynamique de la réponse de l’API
- **Objectif** : Ajouter dynamiquement le projet dans la galerie sans recharger la page.
- **Pré-requis** : Réponse correcte de l’API après envoi du formulaire.
- **À obtenir** : Projet ajouté dynamiquement dans la galerie.
- **Recommandations** :
  - Mettre à jour le DOM comme pour les projets existants.
- **Points de vigilance** :
  - Ajouter l’image dans le portfolio et dans la liste des images de la modale.

---

### Étape 4 : Vérification finale et gestion des erreurs
- **Objectif** : Tester et valider toutes les fonctionnalités.
- **Pré-requis** : Galerie et modale fonctionnelles avec toutes les fonctionnalités implémentées.
- **À obtenir** : Projet complet et prêt pour la soutenance.
- **Recommandations** :
  - Vérifier le comportement des formulaires avec des données erronées.
  - Vérifier la conformité visuelle avec les maquettes.
  - Tester la mise à jour dynamique du DOM lors des ajouts et suppressions.
