const connexion = require("../mysql_connect");

exports.requestAllPosts = async (req, res, next) => {
  try {
    connexion.query(
      `select * from post join user on post.user_id = user.id_user order by post.id_post desc`,
      function (err, result) {
        req.resultAllPosts = result;
        req.errorAllPosts = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
