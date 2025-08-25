const express = require("express");

const router = express.Router();

router.get("/login", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/login.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;