module.exports = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
   { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
   { timestamps: false, tableName: 'PostCategories' });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId' });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId' });
  };
  return PostsCategory;
};