const connexion = require("../mysql_connect");

exports.post = async (req, res, next) => {
  try {
    console.log(req.body);
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
