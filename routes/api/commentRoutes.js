const router = require('express').Router();
const controller = require('../../controllers');

router.route('/one')
	.post(controller.comment.apiNewComment);

module.exports = router;