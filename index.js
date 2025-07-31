const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000; 
const mysql = require('mysql2/promise');
const carsRoute = require("./router/cars");
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

app.get("/itinirary", (req, res) =>{
  const data = [];
  
  data.push(app.get('priceValidated'))

  console.log("Itinirary Route");

  res.send(data);

 
});



app.get("/flights", (req, res, next) =>{
    let flightData;
    let text = "";
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: app.get("iataOrigin"),
        destinationLocationCode: app.get("iataDestination"),
        departureDate: app.get("destinationDate"),
        // returnDate: app.get("returnDate"),
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



app.get("/pricingRoute", (req, res) =>{
  console.log("Test");
 async function main() {
  try {
    // Confirm availability and price from MAD to ATH in summer 2024
    const flightOffersResponse = app.get("priceValidated");

    const response = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flightOffersResponse],
        },
      },
      { include: "credit-card-fees,detailed-fare-rules" }
    ));
    console.log(response);
    res.send(response)
  } catch (error) {
    console.error(error);
    console.log("The Error is right here!");
  }
}

main()
});

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
  let { username, email ,password, confirmPassword, phoneNumber, address, day, month, birthYear, country } = req.body;

 // let connection;

try{
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password)
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword)
  const phoneError = validatePhoneNumber(phoneNumber)
  const addressError = validateAddress(address)
  const dob = dobVerification(day, month, birthYear)
  const countryCheck = countryValidate(country)
  const checkValidDate = validateDateComponents(day, month, birthYear);
  const errors = usernameError || emailError || passwordError || confirmPasswordError || phoneError || addressError || dob || countryCheck || checkValidDate ;


  if (errors) {
    
    res.status(400).json({ error: errors });
  
  }else{
    // res.status(200).json({ message: 'User registered successfully!' });
    await insertIntoDatabase(username, email, password, phoneNumber, address, day, month, birthYear, country);
  }
}catch(error){
  if(!res.headersSent){

    res.status(500).json({ error: "Internal Error Please try again later!" });
  }
}


async function insertIntoDatabase(username, email, password, phoneNumber, address, day, month, birthYear, country) {
  let connection;

  try {
    const paddedDay = day.toString().padStart(2, '0');
    const paddedMonth = month.toString().padStart(2, '0');
    const birthday = `${birthYear}-${paddedMonth}-${paddedDay}`;

    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Lol123Admin!',
      database: 'registration'
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
        username, email, password, phoneNumber, address, birthday, country
      ) VALUES (?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?)
    `;

    const values = [
      sanitized(username),
      sanitized(email),
      sanitized(hashedPassword),
      sanitized(phoneNumber),
      sanitized(address),
      sanitized(birthday),
      sanitized(country)
    ];

    await connection.execute(sql, values);

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



app.post('/login', (req, res) => {

  const { username, password } = req.body;

  const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lol123Admin!',
  database: 'registration'
});
console.log(typeof db);       // should say 'object'
console.log(typeof db.query); // should say 'function'

  // Fetch the stored hashed password from the database
  const sql = 'SELECT password FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Error: Please check your username or password' });
    }

    const storedHash = results[0].password;

    // Compare entered password with stored hash
    bcrypt.compare(password, storedHash, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ error: 'Error validating password' });
      }

      if (isMatch) {
        console.log('✅ Password is valid!');
        return res.status(200).json({ message: 'Login successful!' });
      } else {
        console.log('❌ Incorrect password.');
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});


app.use("/", carsRoute);
app.use("/", hotelsRoute);
app.use("/", testF);
app.use("/", aboutUsRoute);
app.use("/", contactUsRoute);
app.use("/", employmentRoute);
app.use("/", errorRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);

app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});