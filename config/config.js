const path = require('path');

require('dotenv').config({
	path: path.resolve(__dirname, '..', '.env'),
});

const {
	LOCAL_USERNAME,
	LOCAL_PASSWORD,
	LOCAL_DATABASE,
	LOCAL_HOST,
	DB_USERNAME,
	DB_PASSWORD,
	DB_DATABASE,
	DB_HOST,
	DB_DIALECT,
} = process.env;

module.exports = {
	development: {
		username: LOCAL_USERNAME,
		password: LOCAL_PASSWORD,
		database: LOCAL_DATABASE,
		host: LOCAL_HOST,
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
