// Envoie le résultat de l'enregistrement d'un commentaire dans la BDD
exports.sendPostCommentResult = async (req, res, next) => {
  if (req.errorSaveCommentResult) {
    res.status(400).json({ error: "Votre commentaire n'a pas pu être publié" });
    return;
  }
  res.status(201).json({
    message: "Commentaire publié",
    id_comment: req.idOfCommentInserted,
  });
  return;
};

// Envoie le résultat de la récupéreration de tous les commentaires
exports.sendAllCommentsOfPost = async (req, res, next) => {
  if (req.errorGetAllComments) {
    res
      .status(400)
      .json({ error: "Les commentaires n'ont pu être récupérés!" });
    return;
  }
  res.status(200).json(req.comments);
};

// Envoie le résultat de la suppression d'un commentaire
exports.sendDeleteCommentResult = async (req, res, next) => {
  if (req.errorDeleteComment) {
    res.status(400).json({ error: "Impossible de récupérer l'information" });
    return;
  }
  res.status(200).json({ message: "Commentaire supprimé" });
};

// Envoie le résultat de la modification d'un commentaire
exports.sendUpdateCommentResult = async (req, res, next) => {
  if (req.errorUpdateComment) {
    res
      .status(400)
      .json({ message: "Votre commentaire n'a pas pu être modifié" });
    return;
  }
  res.status(200).json({ message: "Commentaire mis à jour!" });
};
