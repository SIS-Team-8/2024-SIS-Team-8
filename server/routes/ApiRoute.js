const {updateProfile} = require('../controllers/ProfileController')
const { Signup, Login } = require('../controllers/AuthController')
const {authMiddleware} = require('../middlewares/AuthMiddleware')
const router = require("express").Router();

//router.post('*', authMiddleware);
router.post('/sign-up', Signup);
router.post('/login', Login);
router.post('/profile', updateProfile);

module.exports = router;
