const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/post", postCtrl.post);

// Route pour récupérer tous les messages
router.get("/post", postCtrl.getAllPosts);

module.exports = router;
