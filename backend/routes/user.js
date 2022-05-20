const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// Route pour créer un compte utilisateur
router.post("/signup", userCtrl.signup);

// Route pour se connecter à un compte utilisateur
router.post("/login", userCtrl.login);

// Route pour obtenir les infos utilisateurs
router.get("/user/:id", userCtrl.getUserInfos);

module.exports = router;
