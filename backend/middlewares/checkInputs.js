// Vérifie si "email" est bien de type "email"
isEmailValid = (email) => {
  const emailRegex = /^[\w\-\.]+@[\w\-\.]+\.[a-z]{2,3}$/;
  return emailRegex.test(email);
};

// Vérifie qu'un password est suffisamment sécurisé
// Comporte 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un caractère spécial
isPasswordValid = (password) => {
  const regex = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
  return regex.test(password);
};

// Vérifie si "name" n'est pas composé de chiffres
isNameValid = (name) => {
  const regex = /^[a-z ,.'-]+$/i;
  return regex.test(name);
};

// Vérifie les entrées utilisateurs du formulaire de connexion
exports.checkLoginInputs = (req, res, next) => {
  if (!isEmailValid(req.body.email)) {
    res.status(400).json({ error: "email non valide" });
  }
  if (!isPasswordValid(req.body.password)) {
    res
      .status(400)
      .json({ error: "Veuillez entrer un mot de passe plus sécurisé" });
    return;
  }
  next();
};

// Vérifie les entrées utilisateurs pour le formulaire d'inscription
exports.checkSignUpInputs = (req, res, next) => {
  if (!isNameValid(req.last_name)) {
    res.status(400).json({ error: "Nom non valide" });
    return;
  }
  if (!isNameValid(req.last_name)) {
    res.status(400).json({ error: "Prénom non valide" });
    return;
  }
  if (!isEmailValid(req.body.email)) {
    res.status(400).json({ error: "email non valide" });
  }
  if (!isPasswordValid(req.body.password)) {
    res
      .status(400)
      .json({ error: "Veuillez entrer un mot de passe plus sécurisé" });
    return;
  }
  next();
};
