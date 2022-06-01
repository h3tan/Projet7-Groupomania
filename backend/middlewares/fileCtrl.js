const fs = require("fs");

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

exports.deleteFile = (req, res, next) => {
  if (req.post[0].post_picture != null) {
    const filename = req.post[0].post_picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};
