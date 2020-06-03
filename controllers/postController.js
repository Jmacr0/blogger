const db = require('../models');

module.exports = {
	staticNewPost: (req, res) => {
		if (req.user) {
			const loggedIn = req.body;
			res.render('post', { loggedIn });
		} else {
			res.render('login');
		}
	},
	staticEditPost: (req, res) => {
		if (req.user) {
			const loggedIn = req.body;
			const { id } = req.params;
			console.log(id)
			db.Posts.findByPk(id)
				.then(post => {
					console.log(post)
					const { dataValues } = post;
					res.render('post-edit', { dataValues, loggedIn });
				});
		} else {
			res.render('login');
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
	apiUpdatePost: async (req, res) => {
		try {
			const loggedIn = req.body;
			const {
				postId,
				title,
				editordata,
			} = req.body;
			const post = await db.Posts.update({
				title,
				body: editordata,
			}, { where: { id: postId } });
			res.redirect('/static/user/profile');
		} catch (error) {
			res.json(error);
		}
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
