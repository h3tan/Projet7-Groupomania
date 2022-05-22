const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
//const multer = require("../middlewares/multer-config");

const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/", auth, postCtrl.post);

// Route pour récupérer tous les messages
router.get("/", auth, postCtrl.getAllPosts);

// Route pour récupérer un message
router.get("/:id", auth, postCtrl.getPostFromAPI);

// Route pour modifier un message
router.put("/:id", auth, postCtrl.updatePost);

// Route pour supprimer un message
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
