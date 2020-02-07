module.exports = function (sequelize, DataTypes) {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Posts.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Posts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    Posts.hasMany(models.Comments, {
      foreignKey: {
        allowNull: false
      }
    });

    Posts.hasMany(models.Likes, {
      foreignKey: {
        name: 'postId',
        allowNull: false
      }
    });    
  };
  return Posts;
};

// POSSIBLE COLUMNS TO ADD:
// like count
// like username (to see who likes the post)
// comment count
// comment username (to see who commented)