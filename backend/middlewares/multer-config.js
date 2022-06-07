const multer = require("multer");

const MIME_TYPES = {
  // Permet de résoudre l'extension de fichier appropriée
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Endroit où le fichier sera enregistré (dossier "images")
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    // Nom par lequel le fichier sera enregistré
    const fileWithoutExtension = file.originalname.split(".");
    const name = fileWithoutExtension[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("file"); // "file" doit correspondre à la clé de formData du frontend
