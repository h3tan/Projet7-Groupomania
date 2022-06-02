const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const connexion = require("../mysql_connect");

exports.requestLogin = async (req, res, next) => {
  try {
    connexion.query(
      `SELECT user.id_user, user.nickname, user.password, user.picture, user.privilege FROM user WHERE email = ?`,
      [req.body.email],
      function (err, result) {
        req.loginResult = result[0];
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.requestUserInfos = async (req, res, next) => {
  try {
    connexion.query(
      `SELECT user.id_user, user.nickname, user.last_name, user.first_name, user.email, user.privilege, user.picture FROM user WHERE id_user = ?`,
      [req.params.id],
      function (err, result) {
        req.userInfos = result[0];
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
