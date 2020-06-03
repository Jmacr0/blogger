const router = require('express').Router();
const controller = require('../../controllers');

router.route('/one')
	.post(controller.like.apiNewLike)
	.delete(controller.like.apiDeleteLike);

module.exports = router;
