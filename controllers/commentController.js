const db = require('../models');

module.exports = {
	apiNewComment: (req, res) => {
		if (req.user) {
			db.Comments.create({
				body: req.body.comment,
				PostId: req.body.PostId,
				UserId: req.user.id,
			}).then(() => {
				res.status(200);
			}).catch((err) => {
				res.json(err);
			});
		} else {
			res.redirect('/static/user/login');
		}
	},
};
