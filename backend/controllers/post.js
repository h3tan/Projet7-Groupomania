const connexion = require("../mysql_connect");

// Contrôleur pour enregistrer un post dans la Base de données
exports.post = async (req, res, next) => {
  try {
    connexion.query(
      `insert into post (title, message, date_post, user_id) values ('${req.body.title}', '${req.body.text}', now(), ${req.body.userId});`,
      function (err, result) {
        if (err) {
          res.status(400).json({ error: "Le post n'a pas pu être créé" });
          return;
        }
        res.status(201).json({ message: "post publié !" });
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

// Contrôleur pour récupérer un post à partir de son id
exports.getPostFromAPI = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on user.id_user = post.user_id where post.id_post = ${req.params.id}`,
      function (err, result) {
        if (err) {
          res.status(401).json({ error: "Le post n'existe pas!" });
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

// Contrôleur pour mettre à jour un post dans la base de données
exports.updatePost = async (req, res, next) => {
  try {
    connexion.query(
      `update post set title = '${req.body.title}' where id_post = ${req.params.id};
      update post set message = '${req.body.text}' where id_post = ${req.params.id};
      update post set date_post = now() where id_post = ${req.params.id};`,
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
      `delete from post where id_post = ${req.params.id}`,
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
  res.status(200).json(req.like);
};

exports.updateLike = async (req, res, next) => {
  try {
    if (req.like == 0) {
      console.log(req.params);
      console.log(req.like);
      connexion.query(
        `insert into likes (id_post, id_user) values (${req.params.id_post}, ${req.params.id_user})`,
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
        `delete from likes where id_post = ${req.params.id_post} and id_user = ${req.params.id_user}`,
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
