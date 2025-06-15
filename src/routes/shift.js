const express = require('express');
const router= express.Router();
const {createShift} = require('../controllers/shifts')
const {verifyToken} = require('../middlewares/authMiddleware')

router.post('/create',verifyToken,createShift)

module.exports= router;