const router = require('express').Router();
const controller = require('../../controllers');

router.route('/new')
	.post(controller.post.apiNewPost);

router.route('/delete')
	.delete(controller.post.apiDeletePost);

router.route('/update')
	.post(controller.post.apiUpdatePost);

module.exports = router;