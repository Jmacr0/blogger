const router = require('express').Router();
const controller = require('../../controllers');

router.route('/new')
	.get(controller.post.staticNewPost);

router.route('/edit/:id')
	.get(controller.post.staticEditPost);

module.exports = router;
