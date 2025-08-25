const express = require("express");

const router = express.Router();

router.get("/register", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/register.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;