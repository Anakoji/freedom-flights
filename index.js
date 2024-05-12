const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000; 
// var Amedeus = require('amadeus');
const carsRoute = require("./router/cars");
const hotelsRoute = require("./router/hotels");
var Amadeus = require('amadeus');
require('dotenv').config()
const api_key = process.env.API_KEY;
const api_key_secret = process.env.API_KEY_SECRET;
var amadeus = new Amadeus({
  clientId: api_key,
  clientSecret: api_key_secret
});

console.log(api_key_secret)
console.log(api_key)
async function getFlights(flightData){
  console.log("Waited for flights");
  console.log(flightData);
}
// 
app.get("/flights", (req, res) =>{
    let flightData;
    let text = "";
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: 'SYD',
        destinationLocationCode: 'BKK',
        departureDate: '2024-09-09',
        // returnDate:'2023-12-12',
        adults: '1'
    }).then(async function(response){
        flightData = response.data;
        await getFlights(flightData)
        res.send(response.data);
     
    }).catch(function(responseError){
      console.log(responseError.code);
    });
    // console.log(flightData);
});
// var amadeus = new Amadeus({
//     hostname: 'production'
//   });

app.use(express.static(path.join(__dirname, 'public')));






app.use("/", carsRoute);
app.use("/", hotelsRoute);


app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});