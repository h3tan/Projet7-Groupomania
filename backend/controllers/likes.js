exports.getLike = async (req, res, next) => {
  res.status(200).json({ isLiked: req.like, countLikes: req.count });
  return;
};

exports.sendUpdateLikeResult = async (req, res, next) => {
  res.status(200).json({ message: req.updateLikeResult });
};
