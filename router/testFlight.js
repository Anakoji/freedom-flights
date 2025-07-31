const express = require("express");
const path = require('path');
const router = express.Router();

// router.use(express.static(path.join( __dirname)));

router.get("/testFlight", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/globallinktravel/public/testFlight.html`);
    console.log( `Test Flight Route` );
});

module.exports = router;