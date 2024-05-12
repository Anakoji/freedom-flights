const express = require("express");

const router = express.Router();

router.get("/hotels", (req, res, next) =>{
    res.send("This is the hotels page request");
});

module.exports = router;