const connexion = require("../mysql_connect");

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
