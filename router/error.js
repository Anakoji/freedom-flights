const express = require("express");

const router = express.Router();

router.get("/error", (req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/error_page.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;