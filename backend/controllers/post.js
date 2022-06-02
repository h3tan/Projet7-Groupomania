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
exports.sendAllPostsToFront = async (req, res, next) => {
  if (req.errorAllPosts) {
    res.status(400).json({ error: "Les posts n'ont pu être récupérés!" });
    return;
  }
  res.status(200).json(req.resultAllPosts);
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

exports.updateFile = async (req, res, next) => {
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
      `update post set post_picture = ? where id_post = ?;`,
      [imageUrl, req.params.id_post],
      function (err, result) {
        if (err) {
          res.status(400).json({ message: "Impossible de modifier l'image" });
          return;
        }
        res.status(200).json({ imageUrl: imageUrl });
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
