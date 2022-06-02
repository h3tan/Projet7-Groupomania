const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const fs = require("fs");
const connexion = require("../mysql_connect");

exports.signup = async (req, res, next) => {
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
        if (err) {
          res.status(401).json({ error: "Nom ou email déjà utilisé" });
          return;
        }
        res.status(200).json({
          nickname: req.body.nickname,
          email: req.body.email,
          password: passwordHash,
        });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.login = (req, res, next) => {
  if (req.loginResult == undefined) {
    res.status(401).json({ error: "Nom d'utilisateur incorrect" });
    return;
  }
  let password = req.loginResult.password;
  bcrypt
    .compare(req.body.password, password)
    .then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
      }
      let userId = req.loginResult.id_user;
      let nickname = req.loginResult.nickname;
      let avatar = req.loginResult.picture;
      let privilege = req.loginResult.privilege;
      res.status(200).json({
        userId: userId,
        nickname: nickname,
        token: jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
        avatar: avatar,
        privilege: privilege,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserInfos = async (req, res, next) => {
  connexion.query(
    `SELECT user.id_user, user.nickname, user.last_name, user.first_name, user.email, user.privilege, user.picture FROM user WHERE id_user = ?`,
    [req.params.id],
    function (err, result) {
      if (result[0] == undefined) {
        res.status(401).json({ error: "Nom d'utilisateur incorrect" });
        return;
      }
      return res.status(200).json(result);
    }
  );
};

exports.deleteUser = async (req, res, next) => {
  try {
    connexion.query(
      `delete from user where id_user = ?`,
      [req.params.id],
      function (err, result) {
        if (err) {
          return res.status(400).json({ message: "Impossible de supprimer" });
        }
      }
    );
    res.status(200).json({ message: "Compte supprimé!" });
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.updatePicture = async (req, res, next) => {
  try {
    if (req.file) {
      let imageUrl = `${req.protocol}://${req.get("host")}/avatar/${
        req.file.filename
      }`;
      connexion.query(
        `update user set picture = ? where id_user = ?;`,
        [imageUrl, req.params.id],
        function (err, result) {
          if (err) {
            res.status(400).json({ message: "Impossible de modifier l'image" });
            return;
          }
          res.status(200).json({ imageUrl: imageUrl });
        }
      );
    }
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.updateUserInfos = async (req, res, next) => {
  try {
    connexion.query(
      `update user set last_name = ?, first_name = ?, email = ? where id_user = ?;`,
      [req.body.last_name, req.body.first_name, req.body.email, req.params.id],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ message: "Impossible de modifier vos informations" });
          return;
        }
        res
          .status(200)
          .json({ message: "Vos informations ont bien été modifiées" });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    let valid = await bcrypt.compare(req.body.actualPassword, req.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }
    let passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    connexion.query(
      `update user set password = ? where id_user = ?;`,
      [passwordHash, req.auth.userId],
      function (err, result) {
        if (err) {
          res
            .status(400)
            .json({ error: "Impossible de modifier le mot de passe" });
          return;
        }
        res
          .status(200)
          .json({ message: "Votre mot de passe a bien été modifié" });
      }
    );
  } catch (err) {
    let message = "Erreur avec les données";
    throw new Error(message);
  }
};
