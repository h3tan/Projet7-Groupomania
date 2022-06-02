const fs = require("fs");

// Suppression de l'image actuelle du post
exports.deleteOldFile = (req, res, next) => {
  if (req.body.oldfile && req.body.oldfile != "") {
    const filename = req.body.oldfile.split("/images/")[1];
    console.log(filename);
    fs.unlink(`images/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};

// Suppression de l'image dans le dossier 'images'
exports.deleteFile = (req, res, next) => {
  if (req.post_picture != null) {
    const filename = req.post_picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};

// Suppression de plusieurs images dans le dossier 'images'
exports.deleteUserAllPostFiles = (req, res, next) => {
  for (let i in req.file) {
    if (req.file[i].post_picture != null) {
      const filename = req.file[i].post_picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
    }
  }
  next();
}

// Suppression de l'avatar actuel
exports.deleteOldAvatar = (req, res, next) => {
  if (req.body.oldfile && req.body.oldfile != "") {
    const filename = req.body.oldfile.split("/avatar/")[1];
    console.log(filename);
    fs.unlink(`avatar/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};

// Suppression de l'avatar dans le dossier 'avatar'
exports.deleteAvatar = (req, res, next) => {
  if (req.file != null) {
    const filename = req.file.picture.split("/avatar/")[1];
    fs.unlink(`avatar/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};
