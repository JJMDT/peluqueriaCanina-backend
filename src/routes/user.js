const express = require('express');
const router = express.Router();
const { register,getAllUsers } = require('../controllers/user')


router.post('/create', register)
router.get('/', getAllUsers);

module.exports = router 