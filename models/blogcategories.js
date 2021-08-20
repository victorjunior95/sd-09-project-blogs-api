module.exports = (sequelize, _DataTypes) => {
  const BlogCategories = sequelize.define('BlogCategories', {}, { timestamps: false });

  BlogCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts,
      {
        as: 'blogPosts',
        through: BlogCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    models.BlogPosts.belongsToMany(models.Categories,
      {
        as: 'categories',
        through: BlogCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  };

  return BlogCategories;
};