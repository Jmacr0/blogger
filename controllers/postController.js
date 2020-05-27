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
			body: req.body.editordata,
			UserId: req.user.id,
		}).then((response) => {
			res.status(200);
		}).catch((error) => {
			res.json(error);
		});
	},
	apiDeletePost: (req, res) => {
		db.Posts.destroy({
			where: {
				id: req.body.postId,
				userId: req.user.id,
			},
		}).then((response) => {
			res.json(response);
		}).catch((error) => {
			res.json(error);
		});
	},
};
