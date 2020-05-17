const router = require('express').Router();
const controller = require('../../controllers');

router.route('/login')
	.get(controller.user.staticLogin);

router.route('/sign-up')
	.get(controller.user.staticSignUp);

router.route('/profile')
	.get(controller.user.staticProfile);

router.route('/profile/edit')
	.get(controller.user.staticProfileEdit)

module.exports = router;
