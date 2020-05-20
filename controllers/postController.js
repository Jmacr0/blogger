const db = require('../models');

module.exports = {
	staticNewPost: (req, res) => {
		if (req.user) {
			const loggedIn = req.body;
			res.render('post', { loggedIn });
		}
	},
	apiNewPost: (req, res) => {
		db.Posts.create({
			title: req.body.title,
			body: req.body.body,
			UserId: req.user.id,
		}).then(() => {
			res.redirect('/profile');
		});
	},
	apiDeletePost: (req, res) => {
		console.log(req.body);
		db.Posts.destroy({
			where: {
				id: req.body.postId,
				userId: req.user.id,
			},
		}).then(() => {
			res.redirect('/profile');
		})
	},
};
