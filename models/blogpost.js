module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  { 
    timestamps: false,
    
  });
  BlogPosts.associate = (models) => {
    models.BlogPosts.belongsTo(models.Users, { foreignKey: 'id', as: 'user' });
  };
  return BlogPosts;
};
