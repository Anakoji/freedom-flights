const express = require("express");
const path = require('path');
const router = express.Router();

// router.use(express.static(path.join( __dirname)));

router.get("/cars", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/cars.html`);
    // console.log( `D:\\globallinktravel\\public\\cars` );
});

module.exports = router;