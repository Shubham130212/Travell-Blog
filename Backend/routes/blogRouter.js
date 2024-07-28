const blogController = require('../controllers/blogControllers.js')
const router = require('express').Router();

router.post('/addblog', blogController.addBlog)
router.get('/getblogs', blogController.getBlogs)
router.get('/getoneblog/:id', blogController.getOneBlog)
router.put('/updateblog/:id', blogController.updateBlog)
router.patch('/upload/:id', blogController.fileUpload)
router.delete('/deleteblog/:id', blogController.deleteBlog)

module.exports = router;