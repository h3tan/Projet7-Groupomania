const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const commentCtrl = require("../controllers/comment");
const reqComment = require("../requests/commentRequests");

// Route pour récupérer tous les commentaires d'un post
router.get(
  "/:id_post/comments",
  auth,
  reqComment.requestAllCommentsOfPost,
  commentCtrl.sendAllCommentsOfPost
);

// Route pour poster un commentaire
router.post(
  "/:id_post/comments",
  auth,
  reqComment.requestSaveComment,
  commentCtrl.sendPostCommentResult
);

// Route pour modifier un commentaire
router.put(
  "/:id_post/comments/:id_comment",
  auth,
  reqComment.requestIdOfCommentCreator,
  reqComment.requestUpdateComment,
  commentCtrl.sendUpdateCommentResult
);

// Route pour supprimer un commentaire
router.delete(
  "/:id_post/comments/:id_comment",
  auth,
  reqComment.requestIdOfCommentCreator,
  reqComment.requestDeleteComment,
  commentCtrl.sendDeleteCommentResult
);

module.exports = router;
