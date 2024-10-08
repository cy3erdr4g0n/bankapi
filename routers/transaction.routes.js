const express = require('express');

const { } = require('../controllers/transtaction');
const { verify_X_API_KEY } = require('../middleware/auth');
const { userIsSignedIn } = require('../middleware/auth.users');

const router = express.Router();

router.post('/transfer',  verify_X_API_KEY, userIsSignedIn)
router.get('/transaction/history',  verify_X_API_KEY, userIsSignedIn)



module.exports = router;