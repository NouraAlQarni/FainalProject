const express = require ('express')
const router = express.Router();
const userController = require('../Controllers/userController')

router.use(express.json())


router.post('/singup',userController.signup_post);

router.post('/login',userController.login_post);

router.get('/logout',userController.logout_get)


module.exports = router;