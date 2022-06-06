-- Création de la base de données --

CREATE DATABASE groupomania_social;

-- Création des tables

-- Table user --

CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `privilege` varchar(100) NOT NULL DEFAULT 'normal',
  `picture` text,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table post --

CREATE TABLE `post` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `post_text` text,
  `image` text,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `FK_id_user_post` (`id_user`),
  CONSTRAINT `FK_id_user_post` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table likes --

CREATE TABLE `likes` (
  `id_post` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  UNIQUE KEY `UC_likes` (`id_post`,`id_user`),
  KEY `FK_id_user_likes` (`id_user`),
  CONSTRAINT `FK_id_post_likes` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE,
  CONSTRAINT `FK_id_user_likes` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table comment --

CREATE TABLE `comment` (
  `id_comment` int NOT NULL AUTO_INCREMENT,
  `comment_text` text,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  `id_post` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `FK_id_post_comment` (`id_post`),
  KEY `FK_id_user_comment` (`id_user`),
  CONSTRAINT `FK_id_post_comment` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE,
  CONSTRAINT `FK_id_user_comment` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Création du compte admin --

INSERT INTO user (nickname, email, password, privilege) values ('Admin', 'admin@groupomania.com', '@dminGroup0mania', 'admin');