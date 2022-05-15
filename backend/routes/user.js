const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

// Route pour créer un compte utilisateur
router.post("/signup", userCtrl.signup);

// Route pour se connecter à un compte utilisateur
/* router.post(
  "/login",
  checking.checkMailInput,
  //checking.checkPassword,
  userCtrl.login
); */

module.exports = router;