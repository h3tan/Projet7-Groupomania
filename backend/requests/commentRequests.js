const connexion = require("../mysql_connect");

// Requête pour enregistrer un commentaire
exports.requestSaveComment = async (req, res, next) => {
  try {
    connexion.query(
      `insert into comment (comment_message, date_comment, comment_updated, id_post, id_user) values (?, now(), now(), ?, ?);`,
      [req.body.message, req.params.id_post, req.auth.userId],
      function (err, result) {
        req.errorSaveCommentResult = err;
        req.idOfCommentInserted = result.insertId;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour récupérer tous les commentaires d'un post
exports.requestAllCommentsOfPost = async (req, res, next) => {
  try {
    connexion.query(
      `select id_comment, comment_message, date_comment, comment.id_user, nickname, picture, comment.id_user
      from comment join user on comment.id_user = user.id_user where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        req.errorGetAllComments = err;
        req.comments = result;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour compter le nombre de commentaires d'un post
exports.requestCountPostComments = async (req, res, next) => {
  try {
    connexion.query(
      `select count(1) from comment where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        req.errorCountPostComments = err;
        req.countPostComments = result[0]["count(1)"];
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour supprimer un commentaire
exports.requestDeleteComment = async (req, res, next) => {
  try {
    connexion.query(
      `delete from comment where id_comment = ?`,
      [req.params.id_comment],
      function (err, result) {
        req.errorDeleteComment = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour modifier un commentaire
exports.requestUpdateComment = async (req, res, next) => {
  try {
    connexion.query(
      `update comment set comment_message = ?, comment_updated = now() where id_comment = ?`,
      [req.body.text, req.params.id_comment],
      function (err, result) {
        req.errorUpdateComment = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
