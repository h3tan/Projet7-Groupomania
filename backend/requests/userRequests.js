const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
const connexion = require("../mysql_connect");

exports.requestSignUp = async (req, res, next) => {
  try {
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    connexion.query(
      `INSERT INTO user (nickname, last_name, first_name, email, password)
        values (?, ?, ?, ?, ?)`,
      [
        req.body.nickname,
        req.body.lastName,
        req.body.firstName,
        req.body.email,
        passwordHash,
      ],
      function (err, result) {
        req.passwordHash = passwordHash;
        req.errorSignUpResult = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

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

exports.requestUpdateUserInfos = async (req, res, next) => {
  try {
    connexion.query(
      `update user set last_name = ?, first_name = ? where id_user = ?;`,
      [req.body.last_name, req.body.first_name, req.params.id],
      function (err, result) {
        req.errorUpdate = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.getPassword = (req, res, next) => {
  try {
    connexion.query(
      `SELECT password FROM user WHERE id_user = ?`,
      [req.auth.userId],
      function (err, result) {
        req.password = result[0].password;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.requestUpdatePassword = async (req, res, next) => {
  try {
    connexion.query(
      `update user set password = ? where id_user = ?;`,
      [req.passwordHash, req.auth.userId],
      function (err, result) {
        req.errorUpdatePassword = err;
        next();
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
