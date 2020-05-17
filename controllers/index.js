const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController.js');
const likeController = require('./likeController');

module.exports = {
	user: userController,
	post: postController,
	comment: commentController,
	like: likeController,
};
