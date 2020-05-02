module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define('Comments', {
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				len: [1],
			},
		},
	});
	Comments.associate = (models) => {
		Comments.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false,
			},
		});
		Comments.belongsTo(models.Posts, {
			foreignKey: {
				allowNull: false,
			},
		});
	};

	return Comments;
};
