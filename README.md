# Projet7-Groupomania

Installation du front-end:

A partir du dossier /frontend:
- npm install pour installer les dépendances
- npm run serve pour lancer le serveur frontend

A partir du dossier /backend:
- Lancer une application MySQL (base de données utilisée par ce projet) puis lancer les commandes SQL du fichier "groupomania_social.sql"
  pour créer la base avec ses tables
- Créer un fichier .env avec les variables d'environnement suivantes:
 
  MYSQL_HOST = // Nom de l'hôte spécifié lors de l'installation de MySQL
  MYSQL_ID = // ID de l'utilisateur ayant tous les droits spécifié lors de l'installation de MySQL
  MYSQL_PASSWORD = // Le mot de passe de ce même utilisateur
  MYSQL_DATABASE_NAME = // Le nom de la base de données, ici "groupomania_social" si vous avez utilisé 
  les commandes données dans le fichier "groupomania_social.sql"

- npm install pour installer les dépendances
- node serve ou nodemon serve pour lancer le serveur backend
- Créer les dossiers images et avatar pour stocker les fichiers images

Fonctionnalités du projet: (au 06/06/2022)
- Inscription d'un utilisateur
- Connexion d'un utilisateur
- Déconnexion de l'utilisateur
- Suppression d'un compte
- Affichage des informations de l'utilisateur
- Ajout et changement de l'avatar
- Changements des noms et prénoms
- Changement du mot de passe
- Affichage des posts du plus récent au plus ancien
- Ajout d'un post avec ou sans image
- Affichage individuel d'un post avec son texte et sa section likes et commentaires
- Possibilité de liker (une seule fois) ou annuler un like d'un post si utilisateur différent du créateur du post
- Possibilité de modifier ou supprimer un post pour le créateur du post ou l'administrateur/modérateur
- Ajout de commentaires pour tous les utilisateurs disposant d'un compte
- Possibilité de modifier ou supprimer un commentaire pour le créateur du commentaire ou l'administrateur/modérateur
