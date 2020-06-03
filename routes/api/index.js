const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/like', likeRoutes);

module.exports = router;
