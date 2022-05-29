const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/user");
const multer = require("../middlewares/multer-config");
const fileCtrl = require("../middlewares/fileCtrl");

// Route pour créer un compte utilisateur
router.post("/signup", userCtrl.signup);

// Route pour se connecter à un compte utilisateur
router.post("/login", userCtrl.login);

// Route pour obtenir les infos utilisateurs
router.get("/users/:id", auth, userCtrl.getUserInfos);

// Route pour supprimer un utilisateur
router.delete("/users/:id", auth, userCtrl.deleteUser);

// Route pour modifier l'image d'un utilisateur
router.put(
  "/users/:id/avatar",
  auth,
  multer,
  fileCtrl.deleteOldFile,
  userCtrl.updatePicture
);

// Route pour modifier les infos d'un utilisateur
router.put("/users/:id", auth, userCtrl.updateUserInfos);

module.exports = router;
