// Vérifie si "email" est bien de type "email"
isEmailValid = (email) => {
  const emailRegex = /^[\w\-\.]+@[\w\-\.]+\.[a-z]{2,3}$/;
  return emailRegex.test(email);
};

// Middleware pour vérifier si l'email entré est correct
exports.checkMailInput = (req, res, next) => {
  if (!isEmailValid(req.body.email)) {
    res.status(400).json({ message: "email non valide" });
    return;
  }
  next();
};

// Vérifie qu'un password est suffisamment sécurisé
// Comporte 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial
isPasswordValid = (password) => {
  const regex = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  return regex.test(password);
};

// Middleware pour vérifier qu'un mot de passe est suffisamment sécurisé
// contient au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et une longueur d'au moins 10
exports.checkPasswordInput = (req, res, next) => {
  if (!isPasswordValid(req.body.password)) {
    res
      .status(400)
      .json({ message: "Veuillez entrer un mot de passe plus sécurisé" });
    return;
  }
  next();
};

// Vérifie si "name" n'est pas composé de chiffres
isNameValid = (name) => {
  const regex = /^[a-z ,.'-]+$/i;
  return regex.test(name);
};
