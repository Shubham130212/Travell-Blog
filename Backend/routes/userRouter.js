const userController = require('../controllers/userControllers.js')
const validateData = require('../middlewares/validation.js')
const router = require('express').Router();

router.post('/signup', validateData, userController.signup)
router.post('/login', userController.login)
router.get('/getusers', userController.getUsers)
router.get('/getoneuser', userController.getOneUser)
router.get('/getblogbyuser/:id', userController.getBlogByUserId)
router.patch('/resetPassword', userController.resetPassword)
router.post('/logout', userController.logout)


module.exports = router;