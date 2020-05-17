const db = require('../models');

module.exports = {
	apiNewComment: (req, res) => {
		if (req.user) {
			db.Comments.create({
				body: req.body.comment,
				PostId: req.body.PostId,
				UserId: req.user.id,
			}).then((err) => {
				if (err) { res.json(err); }
				res.redirect('/');
			});
		} else {
			res.redirect('/static/user/login');
		}
	},
};
