const connexion = require("../mysql_connect");

// Contrôleur pour récupérer un like
module.exports = async (req, res, next) => {
  try {
    connexion.query(
      `select count(*) from likes where id_post = ${req.params.id_post} and id_user = ${req.params.id_user}`,
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ message: "impossible de récupérer l'information" });
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
