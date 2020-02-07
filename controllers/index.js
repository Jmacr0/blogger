const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const passport = require("passport");

const db = require("../models");

router.get("/", function (req, res) {
	if (req.user) {
		const loggedIn = req.user;
		db.Posts.findAll({
			order: [
				['id', 'DESC']
			],
			include: [
				{
					model: db.Comments,
					include: [
						db.Users
					]
				},
				db.Comments,
				db.Likes,
				db.Users
			]
		}).then((Posts) => {
			console.log(Posts[0])
			res.render("index", { Posts, loggedIn });
		});
	} else {
		res.render("login");
	}
});

router.get("/login", function (req, res) {
	res.render("login");
});

router.get("/sign-up", function (req, res) {
	res.render("sign-up");
});

router.get("/post", function (req, res) {
	const loggedIn = req.body;
	res.render("post", { loggedIn });
});

router.post("/post/like", function (req, res) {
	db.Likes.create({
		postId: req.body.PostId,
		userId: req.user.id
	}).then((err, data) => {
		if(err){ console.log(err)}
		console.log(data)
	})
})

router.post("/post/comment", function (req, res) {
	db.Comments.create({
		body: req.body.comment,
		PostId: req.body.PostId,
		UserId: req.user.id
	}).then((err, data) => {
		if (err) { console.log(err) }
		res.redirect("/");
	})
})

router.get("/profile", (req, res) => {
	const loggedIn = req.user;
	const user = {
		username: req.user.username,
		firstName: req.user.firstName,
		lastName: req.user.lastName,
	}
	db.Posts.findAll({
		where: {
			UserId: req.user.id
		},
	}).then((Posts) => {
		console.log({ Posts, user });
		res.render("profile", { Posts, user, loggedIn });
	})

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

module.exports = router;