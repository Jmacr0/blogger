/* eslint-disable */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const passport = require("passport");

const db = require("../models");

// dashboard route
router.get("/", function (req, res) {
	if (req.user) {
		const loggedIn = req.user;
		db.Posts.findAll({
			order: [
				['id', 'DESC']
			],
			include: [
				db.Users,
				db.Likes,
				{
					model: db.Comments,
					include: [
						db.Users
					]
				},
			]
		}).then((Posts) => {
			console.log(Posts)
			for (post of Posts) {
				const { dataValues } = post;
				for (like of post.dataValues.Likes) {
					if (like.dataValues.userId === loggedIn.id) {
						// set property of post.dataValues to "isLiked"
						dataValues.isLiked = true;
					};
				}
			}
			res.render("index", {
				Posts,
				loggedIn
			});
		});
	} else {
		res.redirect("/login");
	}
});

router.get("/login", function (req, res) {
	res.render("login");
});

router.get("/sign-up", function (req, res) {
	res.render("sign-up");
});

router.get("/post", function (req, res) {
	if (req.user) {
		const loggedIn = req.body;
		res.render("post", { loggedIn });
	}
});

router.get("/profile-edit", function (req, res) {
	if (req.user) {
		db.Users.findOne({
			where: {
				id: req.user.id
			}
		})
			.then(({ dataValues }) => {
				console.log(dataValues);
				res.render("profile-edit", { dataValues });
			})
			.catch(err => {
				console.log(err);
			})
	} else {
		res.redirect('/login');
	}


});

router.post("/post/like", function (req, res) {
	if (req.user) {
		db.Likes.create({
			postId: req.body.PostId,
			userId: req.user.id
		}).then((err, data) => {
			if (err) { console.log(err) }
			console.log(data);
			res.redirect("/");
		});
	} else {
		res.redirect("/login");
	}
});

router.delete("/post/like", function (req, res) {
	if (req.user) {
		db.Likes.destroy({
			where: {
				postId: req.body.PostId,
				userId: req.user.id
			}
		}).then((err, data) => {
			if (err) { console.log(err) }
			console.log(data);
			res.redirect("/");
		});
	} else {
		res.redirect("/login");
	}
})

router.post("/post/comment", function (req, res) {
	if (req.user) {
		db.Comments.create({
			body: req.body.comment,
			PostId: req.body.PostId,
			UserId: req.user.id
		}).then((err, data) => {
			if (err) { console.log(err) }
			res.redirect("/");
		});
	} else {
		res.redirect("/login");
	}
})

router.get("/profile", (req, res) => {
	if (req.user) {
		const loggedIn = req.user;
		db.Users.findOne({
			where: {
				id: req.user.id
			},
			include: [
				{
					model: db.Posts,
				}
			]
		}).then((User) => {
			// send data of the logged in user
			res.render("profile", { User, loggedIn });
		});
	} else {
		res.redirect("login")
	}
});

// Sign Up route
router.post("/users/signup", (req, res) => {
	const {
		signUpEmail,
		signUpFirstName,
		signUpLastName,
		signUpUsername,
		signUpPassword,
		confirmPassword,
		signUpCountry
	} = req.body;
	let errors = [];
	// check required fields have an entry
	if (!signUpEmail || !signUpFirstName || !signUpLastName || !signUpUsername || !signUpPassword || !confirmPassword || !signUpCountry) {
		errors.push({ msg: "Please fill in all fields" });
	}
	// check passwords match
	if (signUpPassword !== confirmPassword) {
		errors.push({ msg: "Passwords do not match" });
	}
	// check password length
	if (signUpPassword.length < 8) {
		errors.push({ msg: "Password must be at least 8 characters" })
	}
	// if there is an error, re-render the page with the errors displayed
	if (errors.length > 0) {
		res.render("sign-up", {
			errors
		})
	} else {
		// check if email already exists in the database
		db.Users.findOne({
			where: {
				email: signUpEmail
			}
		}).then((user) => {
			if (user) {
				errors.push({ msg: "There is already an account with this email address" });
				console.log("email already in use");
				res.render("sign-up", {
					errors
				})
				return;
			}
			// check if username already exists in the database
			db.Users.findOne({
				where: {
					username: signUpUsername
				}
			}).then((user) => {
				if (user) {
					errors.push({ msg: "This username is already taken, please try another" });
					console.log("username already in use");
					res.render("sign-up", {
						errors
					})
				} else {
					// all validations successful, create the user & redirect to the login page
					const hashedPassword = bcrypt.hashSync(signUpPassword, 10);
					db.Users.create({
						email: signUpEmail,
						username: signUpUsername,
						password: hashedPassword,
						firstName: signUpFirstName,
						lastName: signUpLastName,
						country: signUpCountry
					}).then(function () {
						req.flash("success_msg", "You are now registered, please log in")
						res.redirect("/login");
					})
				}
			})
		})
	}
});

// Login route
router.post("/users/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
});

// new post route
router.post("/users/new/post", (req, res) => {
	console.log(req.body);
	console.log(req.user.id);

	db.Posts.create({
		title: req.body.title,
		body: req.body.body,
		UserId: req.user.id
	}).then(() => {
		res.redirect("/profile");
	});

})

router.post('/users/edit', (req, res) => {
	const {
		editEmail,
		editFirstName,
		editLastName,
		editUsername,
		editCountry,
		editImg,
		editBio
	} = req.body;
	let errors = [];
	// check required fields have an entry
	if (!editEmail || !editFirstName || !editLastName || !editUsername || !editCountry || !editImg ||
		!editBio) {
		errors.push({ msg: "Please fill in all fields" });
	}
	// check passwords match
	if (editPassword !== confirmPassword) {
		errors.push({ msg: "Passwords do not match" });
	}
	// check password length
	if (editPassword.length < 8) {
		errors.push({ msg: "Password must be at least 8 characters" })
	}
	// if there is an error, re-render the page with the errors displayed
	if (errors.length > 0) {
		res.render("profile-edit", {
			errors
		})
	} else {
		// check if email already exists in the database
		db.Users.update({
			email: editEmail,
			username: editUsername,
			firstName: editFirstName,
			lastName: editLastName,
			country: editCountry,
			img: editImg,
			bio: editBio
		},
			{
				where: {
					id: req.user.id
				}
			}
		)
			.then(result => {
				console.log('User Update! : ', result)
				res.status(200).redirect('/profile')
			})
			.catch(err => {
				console.log(err);
				res.status(500).render('error-page', { err })
			});
	}
});

module.exports = router;