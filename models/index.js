const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require
const LOCAL_ENV = require(`${__dirname}/../config/config.local.json`)[env];

let config;
if (env === 'development') {
	config = LOCAL_ENV;
}

const db = {};

let sequelize;
if (!config) {
	sequelize = new Sequelize(process.env.JAWSDB_URL, { dialect: 'mysql' });
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
	.readdirSync(__dirname)
	.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
