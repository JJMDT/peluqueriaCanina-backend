const express = require('express');
const router = express.Router();
const { register,getAllUsers, turno,crearServicio } = require('../controllers/user')
const {verifyToken} = require('../middlewares/authMiddleware');

router.post('/create', register)
router.post('/turno',verifyToken, turno)
router.post('/servicio',verifyToken,crearServicio)
router.get('/',verifyToken, getAllUsers);

module.exports = router 