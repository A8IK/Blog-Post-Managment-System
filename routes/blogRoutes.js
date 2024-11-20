const express = require('express');
const router = express.Router();
const { getAllBlogs, createBlog, getBlogById, updateBlogById, deleteBlogById } = require('../controllers/blogController'); 
const {authenticate} = require('../middlewares/authMiddleware');
const blogController = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.post('/', authenticate, createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/edit/:id', authenticate, updateBlogById);
router.delete('/delete/:id', authenticate, deleteBlogById);

module.exports = router;
