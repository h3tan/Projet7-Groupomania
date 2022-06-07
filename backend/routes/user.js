const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/user");
const userReq = require("../requests/userRequests");
const fileCtrl = require("../middlewares/fileCtrl");
const checkInputs = require("../middlewares/checkInputs");
const checkUser = require("../middlewares/checkUser");
const multerAvatar = require("../middlewares/multer-avatar");

// Route pour créer un compte utilisateur
router.post(
  "/signup",
  checkInputs.checkSignUpInputs,
  userReq.requestSignUp,
  userCtrl.signup
);

// Route pour se connecter à un compte utilisateur
router.post(
  "/login",
  checkInputs.checkLoginInputs,
  userReq.requestLogin,
  userCtrl.login
);

// Route pour obtenir les infos de tous les utilisateurs
router.get(
  "/users",
  auth,
  userReq.requestAllUsersInfos,
  userCtrl.sendAllUsersInfosToFront
);

// Route pour obtenir les infos utilisateurs
router.get(
  "/users/:id",
  auth,
  userReq.requestUserInfos,
  userCtrl.sendUserInfosToFront
);

// Route pour supprimer un utilisateur
router.delete(
  "/users/:id",
  auth,
  userReq.requestUserPostPictures,
  fileCtrl.deleteUserAllPostFiles,
  userReq.requestAvatar,
  fileCtrl.deleteAvatar,
  userReq.requestDeleteUser,
  userCtrl.sendDeleteUserResult
);

// Route pour modifier l'image d'un utilisateur
router.put(
  "/users/:id/avatar",
  auth,
  multerAvatar,
  fileCtrl.deleteOldAvatar,
  userReq.requestUpdatePicture,
  userCtrl.sendUpdatePictureResult
);

// Route pour modifier les infos d'un utilisateur
router.put(
  "/users/:id",
  auth,
  checkInputs.checkUpdateUserInfosInputs,
  userReq.requestUpdateUserInfos,
  userCtrl.updateUserInfos
);

// Route pour modifier le mot de passe d'un utilisateur
router.put(
  "/users/:id/password",
  auth,
  checkInputs.checkChangePasswordInputs,
  userReq.getPassword,
  checkUser.checkPassword,
  userReq.requestUpdatePassword,
  userCtrl.sendUpdatePasswordResultToFront
);

module.exports = router;
