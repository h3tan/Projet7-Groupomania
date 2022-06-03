const connexion = require("../mysql_connect");

// Envoie le résultat de la requête pour publier un post
exports.sendPostResult = async (req, res, next) => {
  if (req.errorPost) {
    res.status(400).json({ error: "Le post n'a pas pu être créé" });
    return;
  }
  res.status(201).json({ message: "post publié !" });
  return;
};

// Envoie le résultat de la requête pour récupérer les informations d'un post
exports.sendPostInfosToFront = async (req, res, next) => {
  if (req.errorPost) {
    res.status(404).json({ error: "Le post n'existe pas!" });
    return;
  }
  req.post.isLiked = req.like; // Ajoute si le l'utilisateur a liké le post ou non dans les infos du post
  req.post.numLikes = req.count; // Ajoute le nombre de likes du post dans les infos du post
  res.status(200).json(req.post);
  return;
};

// Envoie les informations des posts
exports.sendAllPostsToFront = async (req, res, next) => {
  if (req.errorAllPosts) {
    res.status(404).json({ error: "Les posts n'ont pu être récupérés!" });
    return;
  }
  res.status(200).json(req.resultAllPosts);
  return;
};

// Contrôleur pour mettre à jour un post dans la base de données
exports.SendUpdatePostResult = async (req, res, next) => {
  if (req.errorUpdatePost) {
    res.status(400).json({ message: "Impossible de modifier" });
    return;
  }
  res.status(200).json({ message: "Post mis à jour!" });
  return;
};

exports.sendResultOfUpdateFileOfPost = async (req, res, next) => {
  if (req.errorUpdateFile) {
    res.status(400).json({ message: "Impossible de modifier l'image" });
    return;
  }
  res.status(200).json({ imageUrl: req.imageUrl });
  return;
};

// Contrôleur pour supprimer un post de la base de données
exports.deletePost = async (req, res, next) => {
  if (req.errorDeletePost) {
    res.status(400).json({ message: "Impossible de supprimer" });
    return;
  }
  res.status(200).json({ message: "Post supprimé" });
  return;
};
