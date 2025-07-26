const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000; 
// var Amedeus = require('amadeus');
const carsRoute = require("./router/cars");
const hotelsRoute = require("./router/hotels");
const aboutUsRoute = require("./router/aboutUs");
const contactUsRoute = require("./router/contactUs");
const employmentRoute = require("./router/employment");
const testF = require("./router/testFlight");
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

// app.get("/getItinirary", (req, res) =>{
//   console.log("Send Data To Itinirary");
//   res.sendFile(__dirname + "/public/itinerary.html");
  
// });
// app.get("/jsonMyRoute", (req, res) =>{
//  console.log("Test Route json my route");
// //  console.log(app.get("flightFlightData"));
//  let flightData = app.get("flightFlightData")
// let myError;
//  console.log(typeof flightData);
//  amadeus.shopping.flightOffers.pricing.post(
//    JSON.stringify({  
//      data: {
//       type: "flight-offers-pricing",
//        flightOffers: flightData,
//       },
//     }
//   )
//   ).catch((err) => res.send(err));
// // res.send(JSON.stringify(myError));
// console.log("My Error " + myError);
// });


// const AbortController = require("abort-controller"); // Required in Node.js <18

// app.get("/flights", async (req, res, next) => {
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

//   try {
//     const response = await amadeus.shopping.flightOffersSearch.get({
//       originLocationCode: app.get("iataOrigin"),
//       destinationLocationCode: app.get("iataDestination"),
//       departureDate: app.get("destinationDate"),
//       returnDate: app.get("returnDate"),
//       travelClass: app.get("typeOfCabin"),
//       adults: app.get("numberOfAdults"),
//       currencyCode: "USD",
//     }, { signal: controller.signal });

//     clearTimeout(timeout); // Clears timeout on success

//     const flightData = response.data;
//     app.set("flightFlightData", flightData);
//     console.log(flightData);
//     res.redirect("/htmlFlights");

//   } catch (error) {
//     clearTimeout(timeout);

//     if (error.name === "AbortError") {
//       console.error("Request timed out.");
//       res.redirect("/errorTimeout"); // ✅ Customize your timeout error route
//     } else {
//       console.error("API Error:", error);
//       next(error); // Let your global error handler take over
//     }
//   }
// });

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






app.use("/", carsRoute);
app.use("/", hotelsRoute);
app.use("/", testF);
app.use("/", aboutUsRoute);
app.use("/", contactUsRoute);
app.use("/", employmentRoute);


app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});