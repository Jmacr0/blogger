/* eslint-disable */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const passport = require("passport");

const db = require("../models");

const apiRoutes = require('./api');
const staticRoutes = require('./static');

router.use('/api', apiRoutes);
router.use('/static', staticRoutes);

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
				for (like of dataValues.Likes) {
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
		res.redirect("/static/user/login");
	}
});

module.exports = router;