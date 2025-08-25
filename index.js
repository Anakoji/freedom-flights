const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000; 
const mysql = require('mysql2/promise');
const multer = require("multer");
const fs = require('fs/promises');
const cookieParser = require("cookie-parser");
 const jwt = require("jsonwebtoken");
const upload = multer({ dest: "uploads/" });
const carsRoute = require("./router/cars");
const user_settings = require("./router/user_settings");
const hotelsRoute = require("./router/hotels");
const aboutUsRoute = require("./router/aboutUs");
const contactUsRoute = require("./router/contactUs");
const employmentRoute = require("./router/employment");
const errorRoute = require("./router/error");
const loginRoute = require("./router/login");
const registerRoute = require("./router/register");
const testF = require("./router/testFlight");
const bcrypt = require('bcrypt');
var Amadeus = require('amadeus');
require('dotenv').config()
const api_key = process.env.API_KEY;
const api_key_secret = process.env.API_KEY_SECRET;
// const flightTestData = require("./json/flightNewData");
var amadeus = new Amadeus({
  clientId: api_key,
  clientSecret: api_key_secret
  // ,
  // hostname: 'production'
});
// const flightTestData = require("./json/flightNewData");
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
// app.post("/flightCreateOrder", async function (req, res) {
//   res.json(req.body);

//   let inputFlightCreateOrder = req.body;
//   console.log(req.body);
//   const returnBokkin = amadeus.booking.flightOrders
//     .post(
//       JSON.stringify({
//         data: {
//           type: "flight-order",
//           flightOffers: [inputFlightCreateOrder],
//           travelers: [
//             {
//               id: "1",
//               dateOfBirth: "2012-10-11",
//               gender: "FEMALE",
//               contact: {
//                 emailAddress: "jorge.gonzales833@telefonica.es",
//                 phones: [
//                   {
//                     deviceType: "MOBILE",
//                     countryCallingCode: "34",
//                     number: "480080076",
//                   },
//                 ],
//               },
//               name: {
//                 firstName: "ADRIANA",
//                 lastName: "GONZALES",
//               },
//             },
//           ],
//         },
//       })
//     )
//     .then(function (response) {
//       console.log(response.result);
//       confirmOrder = response.result;
//     })
//     .catch(function (responseError) {
//       console.log(responseError);
//     });
// });



app.get("/", (req, res) =>{
  res.sendFile(__dirname + "/public/index.html");
 
});

app.post("/postIataOriginRoute", (req, res) =>{
  console.log("Origin: ");
  console.log( req.body.iataOrigin);
  app.set('iataOrigin', req.body.iataOrigin);
 
 
});
app.post("/postIataDestRoute", (req, res) =>{
  console.log("Destination: ");
  console.log( req.body.iataDestination);
  // console.log( req.body.iataDest);
  app.set('iataDestination', req.body.iataDestination);
  
});
app.post("/postDestDateRoute", (req, res) =>{
  console.log("Destination Date: ");
  console.log( req.body.destDate);
  app.set('destinationDate', req.body.destDate);
});
app.post("/postReturnDateRoute", (req, res) =>{
  console.log("Return Date: ");
  console.log( req.body.returnDate);
  app.set('returnDate', req.body.returnDate);
});
app.post("/cabin", (req, res) =>{
  console.log("Cabin: " + req.body.selectedCabin);
  app.set('typeOfCabin', req.body.selectedCabin);
});
app.post("/adults", (req, res) =>{
  console.log("Adults: " + req.body.amountOfAdults);
  app.set('numberOfAdults', req.body.amountOfAdults);
});
app.post("/gettingPricingFlightNumber", (req, res) =>{
  console.log("Pricing Number: " + req.body.priceNumber);
  app.set('pricingNumber', req.body.priceNumber);
  const flightOffersResponse = app.get("flightFlightData");
  const flightOffersPrice = app.get("pricingNumber");

  console.log("Flight: " + JSON.stringify(flightOffersResponse[flightOffersPrice]));

  app.set('priceValidated', flightOffersResponse[flightOffersPrice]);
  res.redirect('/pricingRoute')
});

app.get("/sendDataToItinirary", (req, res) =>{

  res.sendFile(__dirname + "/public/itinerary.html");
  // res.redirect("/itinirary");
});

// app.get("/itinirary", (req, res) =>{
//   const data = [];
  
//   data.push(app.get('priceValidated'))

//   console.log("Itinirary Route");

//   res.send(data);

 
// });

// app.get("/itinirary", (req, res) => {
//   const flightData = app.get("priceValidated");

//   if (!flightData) {
//     return res.status(404).send("No itinerary data found.");
//   }

//   console.log("Itinerary Route Accessed");
//   res.send(flightData);
// });

app.get("/itinirary-data", (req, res) => {
  const flightData = app.get("priceValidated");

  if (!flightData) {
    return res.status(404).json({ error: "No itinerary data found." });
  }

  res.json(flightData); // ✅ sends valid JSON
});

app.get("/itinirary", (req, res) => {
  res.sendFile(__dirname + "/public/itinierary.html");
});
app.get("/itinirary", (req, res) => {
  const flightData = app.get("priceValidated");

  if (!flightData) {
    return res.status(404).send("No itinerary data found.");
  }

  console.log("Itinerary Route Accessed");
  res.send([flightData]); // ✅ Wrap in array
});

app.post("/api/sendDataToItinirary", (req, res) => {
  const selectedFlight = req.body;

  // Store the selected flight in app memory
  app.set("priceValidated", selectedFlight);

  console.log("Flight data stored for itinerary:", selectedFlight);
  res.json({ message: "Flight data stored successfully" });
});

app.post("/pricingRoute", async (req, res) => {
  console.log("Received flight data for pricing");

  try {
    const flightOffer = req.body; // This is the flight data sent from frontend

    const response = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flightOffer],
        },
      }),
      { include: "credit-card-fees,detailed-fare-rules" }
    );

    console.log("Pricing response:", response);
    res.json(response); // Send back the validated pricing
  } catch (error) {
    console.error("Pricing error:", error);
    res.status(500).send("Failed to validate pricing");
  }
});


app.get("/flights", (req, res, next) =>{
    let flightData;
    let text = "";
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: app.get("iataOrigin"),
        destinationLocationCode: app.get("iataDestination"),
        departureDate: app.get("destinationDate"),
        returnDate: app.get("returnDate"),
        travelClass: app.get("typeOfCabin"),
        adults: app.get("numberOfAdults"),
        currencyCode : "USD"
        
    }).then(async function(response){
        flightData = response.data;
       
        app.set('flightFlightData', flightData)
       
        console.log(flightData);
        // res.redirect("/pricingRoute");
        res.redirect("/htmlFlights");
        // res.redirect();
        // console.log(flightData);
        // await getFlights(flightData)
        // res.send(await getFlights(flightData));
        // res.send(flightData);
       
     
    }).catch(function(responseError){
      // next(responseError);
      console.log(responseError.code);
    });
    // console.log(flightData);
});



// app.get("/pricingRoute", (req, res) =>{
//   console.log("Test");
//  async function main() {
//   try {
//     // Confirm availability and price from MAD to ATH in summer 2024
//     const flightOffersResponse = app.get("priceValidated");

//     const response = await amadeus.shopping.flightOffers.pricing.post(
//       JSON.stringify({
//         data: {
//           type: "flight-offers-pricing",
//           flightOffers: [flightOffersResponse],
//         },
//       },
//       { include: "credit-card-fees,detailed-fare-rules" }
//     ));
//     console.log(response);
//     res.send(response)
//   } catch (error) {
//     console.error(error);
//     console.log("The Error is right here!");
//   }
// }

// main()
// });

app.get("/getHtmlFlights", (req, res) =>{

  console.log("Test flight");
   const flightTestData = app.get("flightFlightData");
  res.send(flightTestData);
});

app.get("/htmlFlights", (req, res) =>{
  res.sendFile(__dirname + "/public/htmlFlightListings.html");
  console.log("Test flight");
  
});

app.post('/register', async (req, res) => {
  let { username, firstname, lastname, email ,password, confirmPassword, phoneNumber, address, gender, day, month, birthYear, country } = req.body;

 // let connection;
console.log( "First and last name: "+ firstname + " "+ lastname);
try{
  const usernameError = validateUsername(username);
  const checkFirstName = validateFirstName(firstname);
  const checkLastName = validateLastName(lastname);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password)
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword)
  const phoneError = validatePhoneNumber(phoneNumber)
  const addressError = validateAddress(address)
  const checkGender = validateGender(gender);
  const dob = dobVerification(day, month, birthYear)
  const countryCheck = countryValidate(country)
  const checkValidDate = validateDateComponents(day, month, birthYear);
  const errors = usernameError|| checkFirstName || checkLastName || emailError || passwordError || confirmPasswordError || phoneError || addressError || checkGender || dob || countryCheck || checkValidDate ;


  if (errors) {
    
    return res.status(400).json({ error: errors });
  
  }else{
    // res.status(200).json({ message: 'User registered successfully!' });
    await insertIntoDatabase(username, firstname, lastname, email, password, phoneNumber, address, gender, day, month, birthYear, country, res);
  }
}catch(error){
  console.log("Regisitration error: ", error);
  if(!res.headersSent){

    res.status(500).json({ error: "Internal Error Please try again later!" });
  }
}


async function insertIntoDatabase(username, firstname, lastname, email, password, phoneNumber, address, gender, day, month, birthYear, country, res) {
  let connection;

  try {
    const paddedDay = day.toString().padStart(2, '0');
    const paddedMonth = month.toString().padStart(2, '0');
    const birthday = `${birthYear}-${paddedMonth}-${paddedDay}`;

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Connected to MySQL!');

// Proceed with STR_TO_DATE insert

    const [usernameExisting] = await connection.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (usernameExisting.length > 0)
      {
        
        return res.status(409).json({ error: 'Username already registered' });
      } 

    const [emailExisting] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (emailExisting.length > 0) return res.status(409).json({ error: 'Email already registered' });

    const [phoneNumberExisting] = await connection.execute('SELECT id FROM users WHERE phoneNumber = ?', [phoneNumber]);
    if (phoneNumberExisting.length > 0) return res.status(409).json({ error: 'Phone number already registered' });

    const sanitized = v => (v === undefined ? null : v);

    const hashedPassword = await bcrypt.hash(password, 10);

const sql = `
  INSERT INTO users (
    username, firstname, lastname, email, password, phoneNumber, address, gender, birthday, country
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?)
`;

    const values = [
      sanitized(username),
      sanitized(firstname),
      sanitized(lastname),
      sanitized(email),
      sanitized(hashedPassword),
      sanitized(phoneNumber),
      sanitized(address),
      sanitized(gender),
      sanitized(birthday),
      sanitized(country)
    ];

    // await connection.execute(sql, values);

const [result] = await connection.execute(sql, values);
const userId = result.insertId;

await connection.execute(`
  INSERT INTO user_settings (user_id, theme, notifications, language, avatar)
  VALUES (?, 'light', true, 'en', '/images/user.png')
`, [userId]);

const userFolder = path.join(__dirname, 'user_data', username);

try {
  // Create user folder if it doesn't exist
  await fs.mkdir(userFolder, { recursive: true });

  // Define default settings
  const defaultSettings = {
    theme: "light",
    notifications: true,
    language: "en",
    avatar: "./images/user.png"
  };

  // Write settings to file
  const settingsPath = path.join(userFolder, 'user_settings.json');
  await fs.writeFile(settingsPath, JSON.stringify(defaultSettings, null, 2));

  console.log(`✅ Settings file created for ${username}`);
} catch (fileErr) {
  console.error(`⚠️ Failed to create settings file for ${username}:`, fileErr);
}



    return res.status(200).json({ message: 'User registered successfully, redirecting now!' });

  } catch (err) {
    console.error('Database error:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Database Error. Please try again.' });
    }
  } finally {
    if (connection) connection.end();
  }
}

  function validateUsername(username) {
  if (typeof username !== "string") {
    return "Username must be a string.";
  }
  if (username.length > 20) {
    return "Username must be no longer than 20 characters.";
  }
  if (username.length < 8) {
    return "Username must be longer than 8 characters.";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only include letters, numbers, and underscores.";
  }
  return null; // No errors!
}

function validateFirstName(firstname) {
  if (!firstname || firstname.trim() === "") {
    return "First name is required.";
  }
  return null;
}

function validateLastName(lastname) {
  if (!lastname || lastname.trim() === "") {
    return "Last name is required.";
  }
  return null;
}

function validateEmail(email) {
  if (typeof email !== "string") {
    return "Email must be a string.";
  }
  // Simple regex for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return null; // No errors
}


function validatePassword(password) {
  if (typeof password !== "string") {
    return "Password must be a string.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!complexityRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character.";
  }
  return null; // No errors
}

function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null; // No errors
}

function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber || phoneNumber.trim() === "") {
    return "Phone number is required.";
  }
  return null;
}

function validateAddress(address) {
  if (!address || address.trim() === "") {
    return "Address is required.";
  }
  return null;
}

function validateGender(gender) {
  const validOptions = ["Male", "Female", "Other"];

  if (!gender || gender.trim() === "") {
    return "Gender is required.";
  }

  if (!validOptions.includes(gender)) {
    return "Invalid gender selection.";
  }

  return null;
}

function dobVerification(day, month, birthYear) {
  const today = new Date();
  const birthDate = new Date(birthYear, month - 1, day); // month is zero-indexed

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) {
   return ("You must be at least 18 years old.");
  }

  return null; // Valid age
}

function validateDateComponents(day, month, birthYear) {
  // Convert inputs to numbers
  const y = Number(birthYear);
  const m = Number(month);
  const d = Number(day);

  // Check for NaN or out-of-range values
  if (
    isNaN(y) || isNaN(m) || isNaN(d) ||
    y < 1000 || y > 9999 ||
    m < 1 || m > 12 ||
    d < 1 || d > 31
  ) {
    return "Please enter a valid date.";
  }

  // Create the date object
  const date = new Date(y, m - 1, d);

  // Validate that the components match exactly
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return "Please enter a valid date.";
  }

  return null;
}


function countryValidate(country){
  if(country === 'Select a country'){
    return "Please select a country"
  }else{
    return null;
  }
}

});



// app.post('/register', (req, res) => {
//   const errors = "Failure!"
//   return res.status(200).json({ message: "success! redirecting" });
//   // return res.status(400).json({ error: errors });
    
// });

app.get('/mysqlError', (req, res) => {
    console.log("reirect: MYSQL ERROR!");
    
});



const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5000",
  credentials: true,
}));

app.post("/login", (req, res) => {
  const { username, password } = req.body;

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

  const sql = `
    SELECT u.password, s.avatar
    FROM users u
    JOIN user_settings s ON u.id = s.user_id
    WHERE u.username = ?
  `;

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Error: Please check your username or password" });
    }

    const storedHash = results[0].password;
    const avatar = results[0].avatar;

    bcrypt.compare(password, storedHash, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ error: "Error validating password" });
      }

      if (!isMatch) {
        console.log("❌ Incorrect password.");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      console.log("✅ Password is valid!");
      db.end();

      // 🔐 Generate JWT
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });

      // 🍪 Set secure cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "Strict",
        path:"/",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
console.log("✅ Setting authToken cookie:", token);
      // 🎯 Send response
      return res.status(200).json({
        message: "Login successful!",
        username,
        avatar,
      });
    });
  });
});


// app.post("/logout", (req, res) => {
//   console.log("🔓 Logout request received");

// const isProduction = process.env.NODE_ENV === "production";

// res.cookie("authToken", "", {
//   httpOnly: true,
//   secure: isProduction, // false in dev
//   sameSite: isProduction ? "Strict" : "Lax", // Lax in dev
//   path: "/",
//   expires: new Date(0),
//   maxAge: 0,
// });

//   // Step 2: Explicitly clear the cookie
//   res.clearCookie("authToken", {
//     httpOnly: true,
//     secure: isProduction,
//     sameSite: isProduction ? "Strict" : "Lax",
//     path: "/",
//   });
// console.log(res.getHeaders());
//   return res.status(200).json({ message: "Logged out" });
// });


app.post("/logout", (req, res) => {
  // Clear the real cookie
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });
  
  // Set a debug cookie for visibility
  res.cookie("debugToken", "", {
    httpOnly: false, // So you can see it in DevTools
    sameSite: "Lax",
    path: "/",
    expires: new Date(0), // Expire immediately
  });
  
  res.status(200).json({ message: "Logged out" });
  
  console.log("🍪 Incoming cookies:", req.cookies);
  console.log(res.getHeaders());
});

// app.get("/user_settings", (req, res) =>{
 
 
// });



const libphonenumber = require('google-libphonenumber');
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();


app.post("/submit-profile", upload.single("profileImage"), (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    address: req.body.address,
    country: req.body.country,
    gender: req.body.gender,
    birthDay: req.body.birthDay,
    birthMonth: req.body.month,
    birthYear: req.body.birthYear,
    image: req.file, // contains uploaded file info
  };

 
 
const selected = JSON.parse(req.body.country); // assuming body parser is enabled
const dialCode = selected.dial_code;
const countryCode = selected.code;
const nameValid = validateName(data.firstName);
const lastNameValid = validateLastName(data.lastName);
const emailValid = validateEmail(data.email);
const phoneNumberValid = validatePhoneNumber(data.phoneNumber, countryCode);
const addressValid = validateAddress(data.address);
const countryValid = validateCountrySelection(data.country);
const genderValid = validateGender(data.gender);
const ageValid = validateAge(req.body.birthDay, req.body.month, req.body.birthYear);


if(!nameValid.valid){
  return res.status(400).json({error: nameValid.message})
}

if(!lastNameValid.valid){
  return res.status(400).json({lastNameError: lastNameValid.message})
}

if(!emailValid.valid){
  return res.status(400).json({emailError: emailValid.message})
}

if(!phoneNumberValid.valid){
  return res.status(400).json({phoneNumValid: phoneNumberValid.message})
}

if(!addressValid.valid){
  return res.status(400).json({addrError: addressValid.message})
}

if (!countryValid.valid) {
  return res.status(400).json({ countryError: countryValid.message });
}
if (!genderValid.valid) {
  return res.status(400).json({ genderError: genderValid.message });
}

if (!ageValid.valid) {
  return res.status(400).json({ ageError: ageValid.message });
}

function validateName(firstName) {
  if (typeof firstName !== 'string') {
    return { valid: false, message: "Name must be a string." };
  }

  const trimmed = firstName.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters long." };
  }

  const regex = /^[A-Za-z\s\-]+$/;

  if (!regex.test(trimmed)) {
    return { valid: false, message: "Name can only contain letters, spaces, and hyphens." };
  }

  return { valid: true };
}

function validateLastName(lastName) {
  if (typeof lastName !== 'string') {
    return { valid: false, message: "Last name must be a string." };
  }

  const trimmed = lastName.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "Last name must be at least 2 characters long." };
  }

  const regex = /^[A-Za-z\s\-]+$/;

  if (!regex.test(trimmed)) {
    return { valid: false, message: "Last name can only contain letters, spaces, and hyphens." };
  }

  return { valid: true };
}

function validateEmail(email) {
  if (typeof email !== 'string') {
    return { valid: false, message: "Email must be a string." };
  }

  const trimmed = email.trim();

  // Basic but effective email regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(trimmed)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  return { valid: true };
}


console.log("Dial Code & Country Code: " + dialCode + " " + countryCode);


function validatePhoneNumber(phone, regionCode) {
  if (typeof phone !== 'string') {
    return { valid: false, message: "Phone number must be a string." };
  }

  const trimmed = phone.trim();
  const regex = /^[\d\s\-\+\(\)]+$/;
  const digitCount = trimmed.replace(/\D/g, "").length;

  if (!regex.test(trimmed)) {
    return { valid: false, message: "Phone number contains invalid characters." };
  }

  if (digitCount < 10) {
    return { valid: false, message: "Phone number must contain at least 10 digits." };
  }

  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(trimmed, regionCode);
    const isValid = phoneUtil.isValidNumber(parsedNumber);

    if (!isValid) {
      return { valid: false, message: "Phone number is not valid for region: " + regionCode };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, message: "Phone number could not be parsed: " + error.message };
  }
}

function validateAddress(addressInput) {
  if (typeof addressInput !== 'string' || addressInput.trim().length < 2) {
    return { valid: false, message: "Address must be at least 2 characters long." };
  }

  return { valid: true };
}

function validateCountrySelection(countryRaw) {
  if (typeof countryRaw !== "string" || !countryRaw.trim()) {
    return { valid: false, message: "Please select a valid country." };
  }

  if (countryRaw === "Select your country" || countryRaw === "undefined" || countryRaw === "null") {
    return { valid: false, message: "Please select a valid country." };
  }

  return { valid: true, data: { code: countryRaw } };
}

function validateGender(genderInput, allowed = ["Male", "Female", "Other"]) {
  if (genderInput == null) {
    return { valid: false, message: "Please select at least one gender option." };
  }

  const values = Array.isArray(genderInput) ? genderInput : [genderInput];

  const cleaned = values
    .filter(v => typeof v === "string")
    .map(v => v.trim())
    .filter(v => v.length > 0);

  if (cleaned.length === 0) {
    return { valid: false, message: "Please select at least one gender option." };
  }

  const allAllowed = cleaned.every(v => allowed.includes(v));
  if (!allAllowed) {
    return { valid: false, message: "Invalid gender selection." };
  }

  return { valid: true };
}

function validateAge(birthDay, birthMonth, birthYear) {
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // month is 0-indexed

  if (isNaN(birthDate.getTime())) {
    return { valid: false, message: "Invalid birth date." };
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const d = today.getDate() - birthDate.getDate();

  if (m < 0 || (m === 0 && d < 0)) {
    age--;
  }

  if (age < 18) {
    return { valid: false, message: "You must be at least 18 years old." };
  }

  return { valid: true };
}

});



app.get("/logout", (req, res) => {
  res.send("Use POST to log out.");
});

console.log("NODE_ENV:", process.env.NODE_ENV);



app.use("/", carsRoute);
app.use("/", hotelsRoute);
app.use("/", testF);
app.use("/", aboutUsRoute);
app.use("/", contactUsRoute);
app.use("/", employmentRoute);
app.use("/", errorRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/", user_settings);

app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});