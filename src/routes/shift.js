const express = require('express');
const router= express.Router();
const {createShift, getAvailableTimes} = require('../controllers/shifts')
const {verifyToken} = require('../middlewares/authMiddleware')


router.post('/create',verifyToken,createShift),
router.get('/available',verifyToken,getAvailableTimes)

module.exports= router;