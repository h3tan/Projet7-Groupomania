const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connexion = require("../mysql_connect");

exports.signup = async (req, res, next) => {
  try {
    let emailHash = await bcrypt.hash(req.body.email, 10);
    let passwordHash = await bcrypt.hash(req.body.password, 10);
    connexion.query(
      `INSERT INTO user (nickname, email, password)
        values ('${req.body.nickname}', '${emailHash}', '${passwordHash}')`,
      function (err, result) {
        if (err) throw err;
        res.status(200).json({
          nickname: req.body.nickname,
          email: emailHash,
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
    `SELECT user.id, user.password FROM user WHERE nickname = "${req.body.nickname}"`,
    function (err, result) {
      let userId = result[0].id;
      let password = result[0].password;
      console.log(userId);
      console.log(password);
      console.log(req.body.password);
      bcrypt
        .compare(req.body.password, password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Wrong password" });
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
