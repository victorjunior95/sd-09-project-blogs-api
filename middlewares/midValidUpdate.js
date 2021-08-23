const validUpdate = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  if (categoryIds === null || categoryIds === undefined) {
    return res.status(401).json({ message: 'Categories cannot be edited' });
  }

  next();
};

module.exports = { validUpdate };
