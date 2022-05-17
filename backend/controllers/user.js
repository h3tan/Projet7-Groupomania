const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connexion = require("../mysql_connect");

exports.signup = async (req, res, next) => {
  try {
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    connexion.query(
      `INSERT INTO user (nickname, email, password)
        values ('${req.body.nickname}', '${req.body.email}', '${passwordHash}')`,
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
  connexion.query(
    `SELECT user.id, user.nickname, user.password FROM user WHERE nickname = "${req.body.nickname}"`,
    function (err, result) {
      if (result[0] == undefined) {
        res.status(401).json({ error: "Nom d'utilisateur incorrect" });
        return;
      }
      let userId = result[0].id;
      let password = result[0].password;
      bcrypt
        .compare(req.body.password, password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: userId,
            token: jwt.sign({ userId: userId }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    }
  );
};

exports.getUserInfos = async (req, res, next) => {
  connexion.query(
    `SELECT user.id, user.nickname, user.email, user.privilege FROM user WHERE id = "${req.params.id}"`,
    function (err, result) {
      if (result[0] == undefined) {
        res.status(401).json({ error: "Nom d'utilisateur incorrect" });
        return;
      }
      return res.status(200).json(result);
    }
  );
};