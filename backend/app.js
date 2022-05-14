const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const helmet = require("helmet");
const mysql = require("mysql");
const app = express();

const MY_HOST = process.env.MYSQL_HOST;
const MY_ID = process.env.MYSQL_ID;
const MY_PASSWORD = process.env.MYSQL_PASSWORD;
const MY_DATABASE = process.env.MYSQL_DATABASE_NAME;

const connexion = mysql.createConnection({
  host: MY_HOST,
  user: MY_ID,
  password: MY_PASSWORD,
  database: MY_DATABASE,
});

connexion.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

app.use(express.json()); // Express prend toutes les requêtes qui ont comme Content-Type application/json
app.use(helmet()); // Permet de sécuriser express en ajoutant une variété de headers
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } })); // Permet d'afficher les images bloquées par helmet

// Ajoute les headers suivant à la réponse pour éviter les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Permet d'accéder à l'API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // Ajoute les headers à la requête
  );
  res.setHeader(
    "Access-Control-Allow-Methods", //Autorise les requêtes avec les verbes suivants
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

module.exports = app;
