const connexion = require("../mysql_connect");

// Requête pour vérifier si un utilisateur a liké un post
exports.requestUserLike = async (req, res, next) => {
  try {
    connexion.query(
      `select count(*) from likes where id_post = ? and id_user = ?;`,
      [req.params.id_post, req.auth.userId],
      function (err, result) {
        if (!result) {
          res
            .status(400)
            .json({ error: "impossible de récupérer l'information" });
          return;
        }
        req.like = result[0]["count(*)"];
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour compter le nombre de likes d'un post
exports.requestCountLikesOfPost = async (req, res, next) => {
  try {
    connexion.query(
      `select count(1) from likes where id_post = ?`,
      [req.params.id_post],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ error: "impossible de récupérer l'information" });
          return;
        }
        req.count = result[0]["count(1)"];
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour ajouter un like d'un user à un post
exports.requestInsertLike = async (req, res, next) => {
  try {
    connexion.query(
      `insert into likes (id_post, id_user) values (?, ?)`,
      [req.params.id_post, req.auth.userId],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: "Post déjà liké" });
          return;
        }
        req.updateLikeResult = "Post liké";
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Requête pour enlever le like d'un post d'un user
exports.requestDeleteLike = async (req, res, next) => {
  try {
    connexion.query(
      `delete from likes where id_post = ? and id_user = ?`,
      [req.params.id_post, req.auth.userId],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(400).json({ error: "Post déjà non liké" });
          return;
        }
        req.updateLikeResult = "Annulation du like";
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
