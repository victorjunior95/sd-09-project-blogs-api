module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, 
  { 
    timestamps: false,
  });

  BlogPost.associate = (mod) => {
    BlogPost.belongsTo(mod.User, {
      foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
}; 
