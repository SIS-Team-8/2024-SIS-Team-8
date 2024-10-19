const {updateProfile} = require('../controllers/ProfileController')
const {logEmote} = require('../controllers/EmoteController')
const {requestHistory} = require('../controllers/HistoryController')
const {requestJournal} = require('../controllers/CalendarController')
const { Signup, Login } = require('../controllers/AuthController')
const router = require("express").Router();

router.post('/sign-up', Signup);
router.post('/login', Login);
router.post('/profile', updateProfile);
router.post('/logEmote', logEmote);
router.post('/requestHistory', requestHistory);
router.post('/requestJournal', requestJournal);

module.exports = router;
