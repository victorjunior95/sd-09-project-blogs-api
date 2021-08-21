module.exports = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define('Users',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING,
      validate: { isEmail: { msg: 'Must be a valid email address' } },
    },
    displayName: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: false, tableName: 'Users' });

  UsersModel.associate = (models) => {
    UsersModel.hasMany(models.BlogPosts, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return UsersModel;
};
