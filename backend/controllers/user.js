const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  if (req.errorSignUpResult) {
    res.status(401).json({ error: "Email ou pseudo déjà utilisé" });
    return;
  }
  res.status(200).json({
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.passwordHash,
  });
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
        token: jwt.sign(
          { userId: userId, privilege: privilege },
          "RANDOM_TOKEN_SECRET",
          {
            expiresIn: "24h",
          }
        ),
        avatar: avatar,
        privilege: privilege,
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.sendUserInfosToFront = async (req, res, next) => {
  if (req.userInfos == undefined) {
    res.status(401).json({ error: "Nom d'utilisateur incorrect" });
    return;
  }
  return res.status(200).json(req.userInfos);
};

exports.sendDeleteUserResult = async (req, res, next) => {
  if (req.errorDeleteUser) {
    return res.status(400).json({ message: "Impossible de supprimer" });
  }
  res.status(200).json({ message: "Compte supprimé!" });
};

exports.sendUpdatePictureResult = async (req, res, next) => {
  if (req.errorUpdatePicture) {
    res.status(400).json({ message: "Impossible de modifier l'image" });
    return;
  }
  res.status(200).json({ imageUrl: req.imageUrl });
};

exports.updateUserInfos = async (req, res, next) => {
  if (req.errorUpdate) {
    res
      .status(400)
      .json({ message: "Impossible de modifier vos informations" });
    return;
  }
  res.status(200).json({ message: "Vos informations ont bien été modifiées" });
};

exports.sendUpdatePasswordResultToFront = async (req, res, next) => {
  if (req.errorUpdatePassword) {
    res.status(400).json({ error: "Impossible de modifier le mot de passe" });
    return;
  }
  res.status(200).json({ message: "Votre mot de passe a bien été modifié" });
};
