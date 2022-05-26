const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const checkLike = require("../middlewares/checkLike");
const checkPost = require("../middlewares/checkPost");
const multer = require("../middlewares/multer-config");
const fileCtrl = require("../middlewares/fileCtrl");
const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/", auth, multer, postCtrl.post);

// Route pour récupérer tous les messages
router.get("/", auth, postCtrl.getAllPosts);

// Route pour récupérer un message
router.get("/:id", auth, checkPost.checkPost, postCtrl.getPostFromAPI);

// Route pour modifier un message
router.put("/:id", auth, postCtrl.updatePost);

// Route pour supprimer un message
router.delete(
  "/:id",
  auth,
  checkPost.checkPost,
  fileCtrl.deleteFile,
  postCtrl.deletePost
);

// Route pour récupérer un like
router.get(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.countPostLike,
  checkLike.checkUserLike,
  postCtrl.getLike
);

// Route pour modifier un like
router.put(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.checkUserLike,
  postCtrl.updateLike
);

// Route pour afficher tous les commentaires d'un post
router.get("/:id_post/comments", auth, postCtrl.getAllCommentsOfPost);

// Route pour poster un commentaire
router.post("/:id_post/comments", auth, postCtrl.saveComment);

module.exports = router;
