const express = require('express');

const { getAccountBaance, transfer } = require('../controllers/transtaction');
const { verify_X_API_KEY } = require('../middleware/auth');
const { userIsSignedIn } = require('../middleware/auth.users');

const router = express.Router();

router.post('/transfer',  verify_X_API_KEY, userIsSignedIn, transfer)
router.get('/getAccountBalance', verify_X_API_KEY, userIsSignedIn, getAccountBaance)
router.get('/transaction/history',  verify_X_API_KEY, userIsSignedIn)



module.exports = router;