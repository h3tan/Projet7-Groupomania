const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const likeReq = require("../requests/likeRequests");
const postReq = require("../requests/postRequests");
const multer = require("../middlewares/multer-config");
const fileCtrl = require("../middlewares/fileCtrl");
const postCtrl = require("../controllers/post");

// Route pour poster un post
router.post(
  "/",
  auth,
  multer,
  postReq.savePostInDatabase,
  postCtrl.sendPostResult
);

// Route pour récupérer tous les posts
router.get("/", auth, postReq.requestAllPosts, postCtrl.sendAllPostsToFront);

// Route pour récupérer un post
router.get(
  "/:id_post",
  auth,
  postReq.requestPost,
  likeReq.requestCountLikesOfPost,
  likeReq.requestUserLike,
  postCtrl.sendPostInfosToFront
);

// Route pour modifier un post
router.put(
  "/:id_post",
  auth,
  postReq.requestIdOfPostCreator,
  postReq.requestUpdatePost,
  postCtrl.SendUpdatePostResult
);

// Route pour modifier l'image d'un post
router.put(
  "/:id_post/file",
  auth,
  postReq.requestIdOfPostCreator,
  multer,
  fileCtrl.deleteOldFile,
  postReq.requestUpdatePostFile,
  postCtrl.sendResultOfUpdateFileOfPost
);

// Route pour supprimer un post
router.delete(
  "/:id_post",
  auth,
  postReq.requestIdOfPostCreator,
  postReq.requestPostPicture,
  fileCtrl.deleteFile,
  postReq.requestDeletePost,
  postCtrl.deletePost
);

module.exports = router;
