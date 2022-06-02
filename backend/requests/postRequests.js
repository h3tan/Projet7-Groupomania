const connexion = require("../mysql_connect");

exports.requestAllPosts = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on post.user_id = user.id_user order by post.id_post desc`,
      function (err, result) {
        req.resultAllPosts = result;
        req.errorAllPosts = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.savePostInDatabase = async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    connexion.query(
      `insert into post (title, message, post_picture, date_post, user_id) values (?, ?, ?, now(), ?);`,
      [req.body.title, req.body.text, imageUrl, req.body.userId],
      function (err, result) {
        req.errorPost = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
