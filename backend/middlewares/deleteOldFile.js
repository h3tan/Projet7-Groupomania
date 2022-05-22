const fs = require("fs");

module.exports = (req, res, next) => {
  if (req.body.oldfile && req.body.oldfile != "") {
    const filename = req.body.oldfile.split("/images/")[1];
    console.log(filename);
    fs.unlink(`images/${filename}`, () => {
      console.log(`${filename} deleted`);
    });
  }
  next();
};
