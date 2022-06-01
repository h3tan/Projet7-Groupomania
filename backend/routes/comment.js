const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//const checkPost = require("../middlewares/checkPost");
const commentCtrl = require("../controllers/comment");

// Route pour récupérer tous les commentaires d'un post
router.get("/:id_post/comments", auth, commentCtrl.getAllCommentsOfPost);

// Route pour compter tous les commentaires d'un post
router.get(
  "/:id_post/comments/number_of",
  auth,
  commentCtrl.getCountPostComments
);

// Route pour poster un commentaire
router.post("/:id_post/comments", auth, commentCtrl.saveComment);

// Route pour modifier un commentaire
router.put("/:id_post/comments/:id_comment", auth, commentCtrl.updateComment);

// Route pour supprimer un commentaire
router.delete(
  "/:id_post/comments/:id_comment",
  auth,
  commentCtrl.deleteComment
);

module.exports = router;
