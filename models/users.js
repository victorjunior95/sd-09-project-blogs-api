const fields = (DataTypes) => ({
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: DataTypes.STRING,
});

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', fields(DataTypes), {
    timestamps: false,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPost',
    });
  };
  return User;
};