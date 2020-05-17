const db = require('../models');

module.exports = {
	apiNewLike: (req, res) => {
		if (req.user) {
			db.Likes.create({
				postId: req.body.PostId,
				userId: req.user.id,
			}).then((err) => {
				if (err) { res.json(err); }
				res.redirect('/');
			});
		} else {
			res.redirect('/static/user/login');
		}
	},
	apiDeleteLike: (req, res) => {
		if (req.user) {
			db.Likes.destroy({
				where: {
					postId: req.body.PostId,
					userId: req.user.id,
				},
			}).then((err) => {
				if (err) { res.json(err); }
				res.redirect('/');
			});
		} else {
			res.redirect('/static/user/login');
		}
	},
};
