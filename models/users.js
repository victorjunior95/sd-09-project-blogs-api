/* este codigo foi desenvolvido com a trica de 9 16 : Joao Vitor, Joao Pedro e ANtonio arieiro && WARROM*/
const createUser = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return Users;
};

module.exports = createUser;
