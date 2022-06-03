const bcrypt = require("bcrypt");

// Vérification du mot de passe actuel de l'utilisateur en vue de sa modification
exports.checkPassword = async (req, res, next) => {
  let valid = await bcrypt.compare(req.body.actualPassword, req.password);
  if (!valid) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }
  req.passwordHash = await bcrypt.hash(req.body.newPassword, 10);
  next();
};
