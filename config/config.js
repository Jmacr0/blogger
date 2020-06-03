const path = require('path');

require('dotenv').config({
	path: path.resolve(__dirname, '..', '.env'),
});

const {
	DB_USERNAME,
	DB_PASSWORD,
	DB_DATABASE,
	DB_HOST,
	DB_DIALECT,
} = process.env;

module.exports = {
	development: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		host: DB_HOST,
		dialect: DB_DIALECT,
	},
	production: {
		username: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		host: DB_HOST,
		dialect: DB_DIALECT,
	},
};