const express = require("express");
const helmet = require("helmet");
const connexion = require("./mysql_connect");
const path = require("path");
const app = express();
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");

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

app.use("/api/auth/", userRoutes);
app.use("/api/auth/posts", postRoutes);

// Envoie le fichier statique
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
