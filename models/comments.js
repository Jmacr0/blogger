module.exports = function(sequelize, DataTypes) {
  const Comments = sequelize.define("Comments", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Comments.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });

    Comments.belongsTo(models.Posts, {
      foreignKey: {
        allowNull: false
      }
    });   
  };

  return Comments;
};

// POSSIBLE COLUMNS TO ADD:
// like count?
