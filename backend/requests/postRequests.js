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

exports.requestPost = async (req, res, next) => {
  try {
    connexion.query(
      `select post.id_post, post.title, post.date_post, post.user_id, post.message, user.nickname, user.picture
        from post join user on user.id_user = post.user_id where post.id_post = ?`,
      [req.params.id],
      function (err, result) {
        req.errorRequestPost;
        req.post = result;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.requestPostPicture = async (req, res, next) => {
  try {
    connexion.query(
      `select post_picture from post where id_post = ?`,
      [req.params.id],
      function (err, result) {
        req.post_picture = result[0].post_picture;
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

exports.RequestUpdatePost = async (req, res, next) => {
  try {
    connexion.query(
      `update post set title = ?, message = ?, date_post = now() where id_post = ?`,
      [req.body.title, req.body.text, req.params.id],
      function (err, result) {
        req.errorUpdatePost = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.requestDeletePost = async (req, res, next) => {
  try {
    connexion.query(
      `delete from post where id_post = ?`,
      [req.params.id],
      function (err, result) {
        req.errorDeletePost = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
