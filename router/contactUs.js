const express = require("express");

const router = express.Router();

router.get("/contactUs", (req, res, next) =>{
    res.sendFile( `D:\\globallinktravel\\public\\contact-us.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;