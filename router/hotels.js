const express = require("express");

const router = express.Router();

router.get("/hotels", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/hotels.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;