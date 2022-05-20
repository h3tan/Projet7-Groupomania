const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/", postCtrl.post);

// Route pour récupérer tous les messages
router.get("/", postCtrl.getAllPosts);

// Route pour récupérer un message
router.get("/:id", postCtrl.getPostFromAPI);

module.exports = router;
