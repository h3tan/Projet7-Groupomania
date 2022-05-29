const connexion = require("../mysql_connect");

// Contrôleur pour enregistrer un post dans la Base de données
exports.post = async (req, res, next) => {
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
        if (err) {
          res.status(400).json({ error: "Le post n'a pas pu être créé" });
          return;
        }
        res.status(201).json({ message: "post publié !" });
        return;
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Contrôleur pour récupérer tous les posts de la base de données avec les informations du créateur et dans l'ordre inverse
exports.getAllPosts = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on post.user_id = user.id_user order by post.id_post desc`,
      function (err, result) {
        if (err) {
          res.status(400).json({ error: "Les posts n'ont pu être récupérés!" });
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

exports.getPostFromAPI = async (req, res, next) => {
  res.status(200).json(req.post);
};

// Contrôleur pour mettre à jour un post dans la base de données
exports.updatePost = async (req, res, next) => {
  try {
    connexion.query(
      `update post set title = ?, message = ?, date_post = now() where id_post = ?`,
      [req.body.title, req.body.text, req.params.id],
      function (err, result) {
        if (err) {
          res.status(400).json({ message: "Impossible de modifier" });
          return;
        }
        res.status(200).json({ message: "Post mis à jour!" });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Contrôleur pour supprimer un post de la base de données
exports.deletePost = async (req, res, next) => {
  try {
    connexion.query(
      `delete from post where id_post = ?`,
      [req.params.id],
      function (err, result) {
        if (err) {
          res.status(400).json({ message: "impossible de supprimer" });
          return;
        }
      }
    );
    res.status(200).json({ message: "Ce post a été supprimé!" });
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.getLike = async (req, res, next) => {
  res.status(200).json({ isLiked: req.like, countLikes: req.count });
};

exports.updateLike = async (req, res, next) => {
  try {
    if (req.like == 0) {
      connexion.query(
        `insert into likes (id_post, id_user) values (?, ?)`,
        [req.params.id_post, req.params.id_user],
        function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ message: "impossible de récupérer l'information" });
            return;
          }
          res.status(200).json({ message: "post liké!" });
        }
      );
    }
    if (req.like == 1) {
      connexion.query(
        `delete from likes where id_post = ? and id_user = ?`,
        [req.params.id_post, req.params.id_user],
        function (err, result) {
          if (err) {
            res
              .status(400)
              .json({ message: "impossible de mettre à jour le like" });
            return;
          }
          res.status(200).json({ message: "Annulation du like!" });
        }
      );
    }
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

// Section comments

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
      `select id_comment, comment_message, date_comment, nickname, picture from comment join user on comment.id_user = user.id_user where id_post = ?`,
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
