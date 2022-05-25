const connexion = require("../mysql_connect");

exports.checkPost = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on user.id_user = post.user_id where post.id_post = ?`,
      [req.params.id],
      function (err, result) {
        if (err) {
          res.status(401).json({ error: "Le post n'existe pas!" });
          return;
        }
        req.post = result;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
