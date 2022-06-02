const bcrypt = require("bcrypt");

// Middleware pour vérifier si un utilisateur a les droits pour modifier ou supprimer un post ou un commentaire
/* exports.userRights = (req, res, next) => {
  if (req.body.userId !== req.auth.userId) {
    res.status(403).json({
      error: "Unauthorised User",
    });
    return;
  }
  next();
}; */

exports.checkPassword = async (req, res, next) => {
  let valid = await bcrypt.compare(req.body.actualPassword, req.password);
  if (!valid) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }
  req.passwordHash = await bcrypt.hash(req.body.newPassword, 10);
  next();
};
