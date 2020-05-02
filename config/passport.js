const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'username' },
			(username, password, done) => {
				// match user
				db.Users.findOne({
					where: {
						username,
					},
				}).then((user) => {
					if (!user) {
						return done(null, false, { message: 'Email is not registered' });
					}
					// match password
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;
						if (isMatch) {
							return done(null, user);
						}
						return done(null, false, { message: 'Password incorrect' });
					});
				})
					// eslint-disable-next-line no-console
					.catch((err) => console.log(err));
			}),
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		const user = await db.Users.findOne({
			where: {
				id,
			},
		});
		done(null, user);
	});
};
