module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Category);
  }

  return Post;
}