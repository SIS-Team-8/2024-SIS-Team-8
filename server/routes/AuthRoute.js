const { Signup, Login } = require('../controllers/AuthController')
const {userVerification} = require('../middlewares/authMiddlewares')
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification)

module.exports = router;
