const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
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

/* exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not in the database" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Wrong password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}; */
