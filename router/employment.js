const express = require("express");

const router = express.Router();

router.get("/employment", (req, res, next) =>{
    res.sendFile( `D:\\globallinktravel\\public\\employment.html`);
    // res.send("This is the hotels page request");
});

module.exports = router;