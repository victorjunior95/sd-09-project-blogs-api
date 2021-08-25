const fields = (DataTypes) => ({
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
});

module.exports = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', fields(DataTypes), {
    timestamps: false,
  });
  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return blogpost;
};