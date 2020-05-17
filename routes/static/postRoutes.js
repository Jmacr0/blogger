const router = require('express').Router();
const controller = require('../../controllers');

router.route('/new')
	.get(controller.post.staticNewPost);

module.exports = router;
