const router = require('express').Router();
const controller = require('../../controllers');

router.route('/new')
	.post(controller.post.apiNewPost);

module.exports = router;