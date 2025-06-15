const express = require('express');
const router = express.Router();
const { register,getAllUsers } = require('../controllers/user')
const {verifyToken} = require('../middlewares/authMiddleware');

router.post('/create', register)
router.get('/',verifyToken, getAllUsers);

module.exports = router 