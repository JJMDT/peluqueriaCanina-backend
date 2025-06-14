const express = require('express');
const router= express.Router();
const {createService, getAllServices} = require('../controllers/service')
const {verifyToken} = require('../middlewares/authMiddleware')

router.post('/create',verifyToken,createService)
router.get('/', verifyToken, getAllServices)

module.exports= router;