const connexion = require("../mysql_connect");

exports.post = async (req, res, next) => {
  try {
    connexion.query(
      `INSERT INTO post (title, message, date_post, user_id)
        values ('${req.body.title}', '${req.body.text}', now(), 1)`,
      function (err, result) {
        if (err) {
          res.status(401).json({ error: "Le post n'a pas pu être créé" });
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

exports.getAllPosts = async (req, res, next) => {
  try {
    connexion.query(`select * from post`, function (err, result) {
      if (err) {
        res.status(401).json({ error: "Les posts n'ont pu être récupérés!" });
        return;
      }
      res.status(200).json(result);
    });
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.getPostFromAPI = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on user.id = post.user_id where post.id = ${req.params.id}`,
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
