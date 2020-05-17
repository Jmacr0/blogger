const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = {
	staticLogin: (_req, res) => {
		res.render('login');
	},
	staticSignUp: (_req, res) => {
		res.render('sign-up');
	},
	staticProfile: (req, res) => {
		if (req.user) {
			const loggedIn = req.user;
			db.Users.findOne({
				where: {
					id: req.user.id,
				},
				include: [
					{
						model: db.Posts,
					},
				],
			}).then((User) => {
				res.render('profile', { User, loggedIn });
			});
		} else {
			res.redirect('login');
		}
	},
	staticProfileEdit: (req, res) => {
		if (req.user) {
			db.Users.findOne({
				where: {
					id: req.user.id,
				},
			})
				.then(({ dataValues }) => {
					res.render('profile-edit', { dataValues });
				})
				.catch((err) => {
					res.json(err);
				});
		} else {
			res.redirect('/login');
		}
	},
	apiLogin: (req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/static/user/profile',
			failureRedirect: '/static/user/login',
			failureFlash: true,
		})(req, res, next);
	},
	apiSignUp: (req, res) => {
		const {
			signUpEmail,
			signUpFirstName,
			signUpLastName,
			signUpUsername,
			signUpPassword,
			confirmPassword,
			signUpCountry,
		} = req.body;
		const errors = [];
		// check required fields have an entry
		if (!signUpEmail || !signUpFirstName || !signUpLastName || !signUpUsername || !signUpPassword || !confirmPassword || !signUpCountry) {
			errors.push({ msg: 'Please fill in all fields' });
		}
		// check passwords match
		if (signUpPassword !== confirmPassword) {
			errors.push({ msg: 'Passwords do not match' });
		}
		// check password length
		if (signUpPassword.length < 8) {
			errors.push({ msg: 'Password must be at least 8 characters' });
		}
		// if there is an error, re-render the page with the errors displayed
		if (errors.length > 0) {
			res.render('sign-up', {
				errors,
			});
		} else {
			// check if email already exists in the database
			db.Users.findOne({
				where: {
					email: signUpEmail,
				},
			}).then((user) => {
				if (user) {
					errors.push({ msg: 'There is already an account with this email address' });
					res.render('sign-up', {
						errors,
					});
					return;
				}
				// check if username already exists in the database
				db.Users.findOne({
					where: {
						username: signUpUsername,
					},
				}).then((user) => {
					if (user) {
						errors.push({ msg: 'This username is already taken, please try another' });
						res.render('sign-up', {
							errors,
						});
					} else {
						// all validations successful, create the user & redirect to the login page
						const hashedPassword = bcrypt.hashSync(signUpPassword, 10);
						db.Users.create({
							email: signUpEmail,
							username: signUpUsername,
							password: hashedPassword,
							firstName: signUpFirstName,
							lastName: signUpLastName,
							country: signUpCountry,
						}).then(() => {
							req.flash('success_msg', 'You are now registered, please log in');
							res.redirect('/login');
						});
					}
				});
			});
		}
	},
	apiProfileEdit: (req, res) => {
		const {
			editEmail,
			editFirstName,
			editLastName,
			editUsername,
			editCountry,
			editImg,
			editBio,
		} = req.body;
		const errors = [];
		// check required fields have an entry
		if (!editEmail || !editFirstName || !editLastName || !editUsername || !editCountry || !editImg
			|| !editBio) {
			errors.push({ msg: 'Please fill in all fields' });
		}
		// if there is an error, re-render the page with the errors displayed
		if (errors.length > 0) {
			res.render('profile-edit', {
				errors,
			});
		} else {
			// check if email already exists in the database
			db.Users.update({
				email: editEmail,
				username: editUsername,
				firstName: editFirstName,
				lastName: editLastName,
				country: editCountry,
				img: editImg,
				bio: editBio,
			}, {
				where: {
					id: req.user.id,
				},
			})
				.then(() => {
					res.status(200).redirect('/static/user/profile');
				})
				.catch((err) => {
					res.status(500).render('error-page', { err });
				});
		}
	},
};
