const express = require('express');
const router= express.Router();
const {createService} = require('../controllers/service')
const verifyToken = require('../middlewares/authMiddleware')

router.post('/create',verifyToken,createService)

module.exports= router;