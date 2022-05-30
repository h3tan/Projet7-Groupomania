const connexion = require("../mysql_connect");

module.exports = (req, res, next) => {
  connexion.query(
    `SELECT password FROM user WHERE id_user = ?`,
    [req.auth.userId],
    function (err, result) {
      req.password = result[0].password;
      next();
    }
  );
};
