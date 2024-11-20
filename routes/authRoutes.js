const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const blogController = require('../controllers/blogController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/api/blogs/create', authenticate, blogController.createBlog);

module.exports = router;