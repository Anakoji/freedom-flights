const express = require("express");
const path = require('path');
const router = express.Router();

// router.use(express.static(path.join( __dirname)));

router.get("/cars", (req, res, next) =>{
    res.sendFile( `E:\\globallinktravel\\public\\cars.html`);
    console.log( `E:\\globallinktravel\\public\\cars` );
});

module.exports = router;