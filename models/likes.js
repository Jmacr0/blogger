module.exports = (sequelize, DataTypes) => {
	const Likes = sequelize.define('Likes', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		postId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	Likes.associate = (models) => {
		// We're saying that a Post should belong to an Author
		// A Post can't be created without an Author due to the foreign key constraint
		Likes.belongsTo(models.Users, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
		});

		Likes.belongsTo(models.Posts, {
			foreignKey: {
				name: 'postId',
				allowNull: false,
			},
		});
	};
	return Likes;
};
