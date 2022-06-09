# Projet7-Groupomania

I. Cloner le repository vers le dossier de votre choix

II. Installation du front-end:

Se positionnner sur le dossier "frontend" (à la racine du projet faites "cd frontend") et effectuer les commandes suivantes:

1. Installation de Vue-cli:

- npm install -g @vue/cli
- Si vue-router n'est pas installé de base: "vue add router" et "npm install vue-router"
- Si vuex n'est pas installé de base: "vue add vuex" et "npm install vuex"

- En cas de conflit éventuel avec d'autres dépendances (notamment fontawesome), utilisez "npm install --force" pour chaque installation

- "npm run serve" pour lancer le serveur frontend


III. Se positionner sur le dossier "backend" (à la racine du projet faites "cd backend") et effectuer les commandes suivantes:

1. Installation de express:
- npm install express

2. Installation de nodemon:
- npm install nodemon

3. Installation de helmet:
- npm install helmet

4. Installation de jsonwebtoken:
- npm install jsonwebtoken

5. Installation de multer:
- npm install multer

6. Installation de Bcrypt:
- npm install bcrypt

7. Installation de MySQL:

- sudo apt update
- sudo apt install mysql-server
- Lancer MySQL: "sudo service mysql start"
- Créer le mot de passe pour l'utilisateur "root": mysqladmin -u root password "votremotdepasse"
- Activer le terminal MySQL: mysql -u root -p (entrez le mot de passe défini au point précédent)
- A partir du terminal MySQL:
- Lancer les commandes SQL du fichier "groupomania_social.sql" du repository ou celui fourni avec le zip du projet pour créer la base avec ses tables
- Entrez la commande "use groupomania_social" pour se positionner sur cette base.

8. Installation de dotenv pour gérer les variables d'environnement:
npm install dotenv
Créer un fichier ".env" avec les variables d'environnement suivantes:
 
 - MYSQL_HOST = // Nom de l'hôte spécifié lors de l'installation de MySQL
 - MYSQL_ID = // ID de l'utilisateur ayant tous les droits spécifié lors de l'installation de MySQL
 - MYSQL_PASSWORD = // Le mot de passe de ce même utilisateur
 - MYSQL_DATABASE_NAME = // Le nom de la base de données, ici "groupomania_social" si vous avez utilisé les commandes données dans le fichier SQL

9. "node serve" ou "nodemon serve" pour lancer le serveur backend
- Créer les dossiers "images" et "avatar" pour stocker les fichiers images

IV. Fonctionnalités du projet: (au 06/06/2022)

- Inscription d'un utilisateur (Le mot de passe doit comporter 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial)
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
