const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//const checkLike = require("../middlewares/checkLike");
const checkPost = require("../middlewares/checkPost");
const postReq = require("../requests/postRequests");
const multer = require("../middlewares/multer-config");
const fileCtrl = require("../middlewares/fileCtrl");
const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/", auth, multer, postCtrl.post);

// Route pour récupérer tous les messages
router.get("/", auth, postReq.requestAllPosts, postCtrl.sendAllPostsToFront);

// Route pour récupérer un message
router.get("/:id", auth, checkPost.checkPost, postCtrl.getPostFromAPI);

// Route pour modifier un message
router.put("/:id", auth, postCtrl.updatePost);

// Route pour modifier l'image d'un message
router.put("/:id_post/file", auth, multer, fileCtrl.deleteOldFile, postCtrl.updateFile);

// Route pour supprimer un message
router.delete(
  "/:id",
  auth,
  checkPost.checkPost,
  fileCtrl.deleteFile,
  postCtrl.deletePost
);

module.exports = router;
