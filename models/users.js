module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		img: {
			type: DataTypes.STRING,
			defaultValue: 'https://via.placeholder.com/150',
		},
		bio: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'You can edit your bio through the profile page.',
		},
	});

	Users.associate = (models) => {
		Users.hasMany(models.Posts, {
			foreignKey: {
				allowNull: false,
			},
			onDelete: 'cascade',
		});
		Users.hasMany(models.Comments, {
			foreignKey: {
				allowNull: false,
			},
			onDelete: 'cascade',
		});
		Users.hasMany(models.Likes, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
			},
			onDelete: 'cascade',
		});
	};
	return Users;
};
