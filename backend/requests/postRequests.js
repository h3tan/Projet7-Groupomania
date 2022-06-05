const connexion = require("../mysql_connect");

// Requête vérifiant qu'un post existe et que l'utilisateur a les droits pour ce post
exports.requestIdOfPostCreator = async (req, res, next) => {
  try {
    connexion.query(
      `select id_user from post where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        if (result[0] == undefined) {
          res.status(400).json({ error: "Ce post n'existe pas" });
          return;
        }
        if (req.auth.userId != result[0].id_user) {
          res.status(401).json({
            error:
              "Vous ne pouvez pas modifier ou supprimer un post que vous n'avez pas créé",
          });
          return;
        }
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.requestAllPosts = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on post.id_user = user.id_user order by post.id_post desc`,
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
      `select post.id_post, post.title, post.image, post.date_created, post.id_user, post.post_text, user.nickname, user.picture
        from post join user on user.id_user = post.id_user where post.id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        if (result[0] == undefined) {
          res.status(400).json({ error: "Ce post n'existe pas" });
          return;
        }
        req.errorRequestPost;
        req.post = result[0];
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
      `select image from post where id_post = ?`,
      [req.params.id_post],
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
      `insert into post (title, post_text, image, date_created, date_updated, id_user) values (?, ?, ?, now(), now(), ?);`,
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

exports.requestUpdatePost = async (req, res, next) => {
  try {
    connexion.query(
      `update post set title = ?, message = ?, date_updated = now() where id_post = ?`,
      [req.body.title, req.body.text, req.params.id_post],
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

exports.requestUpdatePostFile = async (req, res, next) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      imageUrl = null;
    }
    connexion.query(
      `update post set image = ? where id_post = ?;`,
      [imageUrl, req.params.id_post],
      function (err, result) {
        req.errorUpdateFile = err;
        req.imageUrl = imageUrl;
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
      [req.params.id_post],
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
