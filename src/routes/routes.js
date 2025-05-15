const express = require('express');
const router= express.Router();

router.get('/',(req,res)=> {
    console.log("pagina de inicio");
    res.send('pagina de inicio');
})



module.exports= router;