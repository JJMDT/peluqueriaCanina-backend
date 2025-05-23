const express = require('express');
const router= express.Router();
const registerController = require('../controllers/registerController');

router.get('/',(req,res)=> {
    console.log("pagina de inicio");
    res.send('pagina de inicio');
})

router.post('/register',registerController)

module.exports= router;