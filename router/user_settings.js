const express = require("express");
const path = require('path');
const jwt = require("jsonwebtoken")
const router = express.Router();


function authenticateUser(req, res, next) {
  console.log("Incoming cookies:", req.cookies); // 👀

  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}
// router.use(express.static(path.join( __dirname)));

router.get("/user_settings", authenticateUser ,(req, res, next) =>{
    res.sendFile( `/home/Jaskaran/freedom-flights/public/user_settings.html`);
    // console.log( `D:\\globallinktravel\\public\\cars` );
});

module.exports = router;