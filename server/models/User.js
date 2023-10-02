module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
  }

  return User;
}