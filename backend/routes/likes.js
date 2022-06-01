const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const checkLike = require("../middlewares/checkLike");
//const checkPost = require("../middlewares/checkPost");
const likesCtrl = require("../controllers/likes");

// Route pour récupérer un like
router.get(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.countPostLike,
  checkLike.checkUserLike,
  likesCtrl.getLike
);

// Route pour modifier un like
router.put(
  "/:id_post/likes/:id_user",
  auth,
  checkLike.checkUserLike,
  likesCtrl.updateLike
);

module.exports = router;
