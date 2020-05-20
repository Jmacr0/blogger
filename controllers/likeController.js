const db = require('../models');

module.exports = {
	apiNewLike: (req, res) => {
		console.log(req.body)
		if (req.user) {
			db.Likes.create({
				postId: req.body.postId,
				userId: req.user.id,
			}).then(() => {
				res.redirect('/');
			}).catch((err) => {
				res.json(err);
			})
		} else {
			res.redirect('/static/user/login');
		}
	},
	apiDeleteLike: (req, res) => {
		console.log(req.body)
		if (req.user) {
			db.Likes.destroy({
				where: {
					postId: req.body.postId,
					userId: req.user.id,
				},
			}).then(() => {
				res.status(200);
			}).catch((err) => {
				res.json(err);
			})
		} else {
			res.redirect('/static/user/login');
		}
	},
};
