const express = require('express');
const router= express.Router();
const registerController = require('../controllers/registerController');
const userController = require('../controllers/userController');

router.get('/',(req,res)=> {
    console.log("pagina de inicio");
    res.send('pagina de inicio');
})

router.get('/users',userController.getAllUsers)

router.post('/register',registerController)

module.exports= router;