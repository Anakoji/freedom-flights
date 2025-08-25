const express = require("express");
const path = require('path');
const router = express.Router();

// router.use(express.static(path.join( __dirname)));

router.get("/aboutUs", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/about-us.html`);
});

module.exports = router;