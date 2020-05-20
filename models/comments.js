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
			onDelete: 'cascade',
		});
		Comments.belongsTo(models.Posts, {
			onDelete: 'cascade',
		});
	};

	return Comments;
};
