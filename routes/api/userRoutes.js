const router = require('express').Router();
const controller = require('../../controllers');

router.route('/login')
	.post(controller.user.apiLogin);

router.route('/sign-up')
	.post(controller.user.apiSignUp);

router.route('/edit')
	.post(controller.user.apiProfileEdit);

module.exports = router;
