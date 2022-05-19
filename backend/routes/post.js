const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

// Route pour poster un message
router.post("/post", postCtrl.post);

module.exports = router;
