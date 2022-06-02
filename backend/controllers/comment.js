const connexion = require("../mysql_connect");

// Met les données dans la table commentaire
exports.saveComment = async (req, res, next) => {
  try {
    connexion.query(
      `insert into comment (comment_message, date_comment, comment_updated, id_post, id_user) values (?, now(), now(), ?, ?);`,
      [req.body.message, req.params.id_post, req.auth.userId],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: "Commentaire non publié" });
          return;
        }
        res.status(201).json({
          message: "commentaire publié !",
          id_comment: result.insertId,
        });
        return;
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.getAllCommentsOfPost = async (req, res, next) => {
  try {
    connexion.query(
      `select id_comment, comment_message, date_comment, comment.id_user, nickname, picture, comment.id_user from comment join user on comment.id_user = user.id_user where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ error: "Les comments n'ont pu être récupérés!" });
          return;
        }
        res.status(200).json(result);
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Compte le nombre de commentaires d'un post
exports.getCountPostComments = async (req, res, next) => {
  try {
    connexion.query(
      `select count(1) from comment where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ message: "impossible de récupérer l'information" });
          return;
        }
        res.status(200).json({ value: result[0]["count(1)"] });
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Compte le nombre de commentaires d'un post
exports.deleteComment = async (req, res, next) => {
  try {
    connexion.query(
      `delete from comment where id_comment = ?`,
      [req.params.id_comment],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ message: "impossible de récupérer l'information" });
          return;
        }
        res.status(200).json({ message: "Commentaire supprimé" });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    connexion.query(
      `update comment set comment_message = ?, comment_updated = now() where id_comment = ?`,
      [req.body.text, req.params.id_comment],
      function (err, result) {
        if (err) {
          res.status(400).json({ message: "Impossible de modifier" });
          return;
        }
        res.status(200).json({ message: "Commentaire mis à jour!" });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
