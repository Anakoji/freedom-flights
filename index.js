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
const flightTestData = require("./json/flightNewData");
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
app.use(express.json());


// async function getFlights(flightData){
//   console.log("Waited for flights");
//   console.log(flightData);
  
// }


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
  console.log( req.body.iataDest);
  app.set('iataDestination', req.body.iataDestination);
  

 
});
app.post("/postDestDateRoute", (req, res) =>{
  console.log("Date: ");
  console.log( req.body.destDate);
  app.set('destinationDate', req.body.destDate);
});
app.post("/postTestRoute", (req, res) =>{
  console.log("posting");
  console.log( req.body.iataDestination);
  console.log( req.body.iataOrigin);
  app.set('data', req.body.iataDestination);
  
  res.redirect();
 
});
app.get("/getTestRoute", (req, res) =>{
  console.log("Redirecting.... ");

  res.redirect("/testFlights");
console.log("redirected");
  // console.log( req.body.test);
  // console.log({retrieveIataOrginData:app.get('iataOrigin')});
  // console.log({retrieveIataDestData:app.get('iataDestination')});
  // console.log({retrieveIataDestData:app.get('destinationDate')});
 
});
app.get("/testFlights", (req, res) =>{
  res.sendFile(__dirname + "/public/testFlight.html");
  console.log("Test flight");
  // console.log({retrieveData:app.get('data')});
 
});
app.get("/flightData", (req, res) =>{
  // res.send(flightTestData);
 
  let c = 0; 
  let testFlightDataFinal = [];
  let flightListings = [];
  for(let i = 0; i < flightTestData.length; i++){
    // console.log("Flight ID: "+flightTestData[i].id);
    let departureArrayVariable=[];
    let arrivalArrayVariable=[];
    let departureTerminalArray=[];
    let arrivalTerminalArray=[];
    let departureAtArray=[];
    let arrivalAtArray=[];
    let segmentIdArray=[];
    let cabinArray=[];
    let classArray=[];
    let carrierCodeArray = [];
    let aircraftCodeArray = [];
    let currency1 = flightTestData[i].price.currency;
    let grandTotal1 = flightTestData[i].price.grandTotal;
  
  
    // console.log("Last Ticketing Date: "+flightTestData[i].lastTicketingDate);
    // console.log("Number of Seats avaialable: "+flightTestData[i].numberOfBookableSeats);

    for(let d = 0; d < flightTestData[i].itineraries.length; d++){
      // console.log("Duration: "+flightTestData[i].itineraries[d].duration);
      function flightDurration(){
        return flightTestData[i].itineraries[d].duration
      }
      for(let c = 0; c < flightTestData[i].itineraries[d].segments.length; c++ ){
       
        
        let departure = flightTestData[i].itineraries[d].segments[c].departure.iataCode;
        let arrival = flightTestData[i].itineraries[d].segments[c].arrival.iataCode
        let carrierCode = flightTestData[i].itineraries[d].segments[c].carrierCode;
        let aircraftCode = flightTestData[i].itineraries[d].segments[c].aircraft.code;
        
        aircraftCodeArray.push(aircraftCode);
        carrierCodeArray.push(carrierCode);
       
        departureArrayVariable.push(departure);
        arrivalArrayVariable.push(arrival);
        
        
        if(flightTestData[i].itineraries[d].segments[c].arrival.terminal){
      
          let arrivalTerminal = flightTestData[i].itineraries[d].segments[c].arrival.terminal;
         
          arrivalTerminalArray.push(arrivalTerminal);
        
          
        }
        if(flightTestData[i].itineraries[d].segments[c].departure.terminal){
          let departureTerminal = flightTestData[i].itineraries[d].segments[c].departure.terminal;
          departureTerminalArray.push(departureTerminal);
        }
        let departAt = flightTestData[i].itineraries[d].segments[c].departure.at;
        let arriveAt = flightTestData[i].itineraries[d].segments[c].arrival.at;
        departureAtArray.push(departAt);
        arrivalAtArray.push(arriveAt);
       
      }

    }
    
    for(let a = 0 ; a < flightTestData[i].travelerPricings.length; a++ ){

      // console.log("Traveler Type: "+flightTestData[i].travelerPricings[a].travelerType);
      for(let b = 0; b < flightTestData[i].travelerPricings[a].fareDetailsBySegment.length; b++){
        // console.log("Fare by segment: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].segmentId);
        // console.log("Cabin: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].cabin);
        // console.log("Class: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].class);
        let segmentId = flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].segmentId;
        segmentIdArray.push(segmentId);
       let cabin = flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].cabin;
       cabinArray.push(cabin);
        let classOfService = flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].class;
        classArray.push(classOfService);
      }
    }
    testFlightDataFinal = [
      {"flight_ID":flightTestData[i].id},
      {"last_Ticketing_Date":flightTestData[i].lastTicketingDate },
      {"test_Function": [testDataFunction()]},
      {"number_of_Seats_avaialable": flightTestData[i].numberOfBookableSeats},
      {"duration": flightDurration()},
      {"departure": departureArrayVariable},
      {"arrival": arrivalArrayVariable},
      {"departure_terminal": departureTerminalArray},
      {"arrival_terminal": arrivalTerminalArray},
      {"departure_at": departureAtArray},
      {"arrival_at": arrivalAtArray},
      {"currency": currency1},
      {"grand_Total": grandTotal1},
      {"segment_id": segmentIdArray},
      {"cabin": cabinArray},
      {"class": classArray},
      {"carrier": carrierCodeArray},
      {"aircraft_code": aircraftCodeArray},
     
    ];
    function testDataFunction(){
      return "Hello World"
    }
    flightListings.push(testFlightDataFinal);
  
    console.log("Flight Id function: "+JSON.stringify(testFlightDataFinal, null, 2));
  }
  res.send(flightListings)
});

// async function getFlights(flightData){
//   console.log("Waited for flights");
//   let c = 0; 
//   let testFlightDataFinal = [];
//   let flightListings = [];
//   for(let i = 0; i < flightData.length; i++){
    
//     let departureArrayVariable=[];
//     let arrivalArrayVariable=[];
//     let departureTerminalArray=[];
//     let arrivalTerminalArray=[];
//     let departureAtArray=[];
//     let arrivalAtArray=[];
//     let segmentIdArray=[];
//     let cabinArray=[];
//     let classArray=[];
//     let carrierCodeArray = [];
//     let aircraftCodeArray = [];
//     let currency1 = flightData[i].price.currency;
//     let grandTotal1 = flightData[i].price.grandTotal;
  
  
  

//     for(let d = 0; d < flightData[i].itineraries.length; d++){
//       // console.log("Duration: "+flightTestData[i].itineraries[d].duration);
//       function flightDurration(){
//         return flightData[i].itineraries[d].duration
//       }
//       for(let c = 0; c < flightData[i].itineraries[d].segments.length; c++ ){
       
        
//         let departure = flightData[i].itineraries[d].segments[c].departure.iataCode;
//         let arrival = flightData[i].itineraries[d].segments[c].arrival.iataCode
//         let carrierCode = flightData[i].itineraries[d].segments[c].carrierCode;
//         let aircraftCode = flightData[i].itineraries[d].segments[c].aircraft.code;
        
//         aircraftCodeArray.push(aircraftCode);
//         carrierCodeArray.push(carrierCode);
       
//         departureArrayVariable.push(departure);
//         arrivalArrayVariable.push(arrival);
        
        
//         if(flightData[i].itineraries[d].segments[c].arrival.terminal){
      
//           let arrivalTerminal = flightData[i].itineraries[d].segments[c].arrival.terminal;
         
//           arrivalTerminalArray.push(arrivalTerminal);
        
          
//         }
//         if(flightData[i].itineraries[d].segments[c].departure.terminal){
//           let departureTerminal = flightData[i].itineraries[d].segments[c].departure.terminal;
//           departureTerminalArray.push(departureTerminal);
//         }
//         let departAt = flightData[i].itineraries[d].segments[c].departure.at;
//         let arriveAt = flightData[i].itineraries[d].segments[c].arrival.at;
//         departureAtArray.push(departAt);
//         arrivalAtArray.push(arriveAt);
       
//       }

//     }
    
//     for(let a = 0 ; a < flightData[i].travelerPricings.length; a++ ){

//       // console.log("Traveler Type: "+flightTestData[i].travelerPricings[a].travelerType);
//       for(let b = 0; b < flightData[i].travelerPricings[a].fareDetailsBySegment.length; b++){
//         // console.log("Fare by segment: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].segmentId);
//         // console.log("Cabin: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].cabin);
//         // console.log("Class: "+flightTestData[i].travelerPricings[a].fareDetailsBySegment[b].class);
//         let segmentId = flightData[i].travelerPricings[a].fareDetailsBySegment[b].segmentId;
//         segmentIdArray.push(segmentId);
//        let cabin = flightData[i].travelerPricings[a].fareDetailsBySegment[b].cabin;
//        cabinArray.push(cabin);
//         let classOfService = flightData[i].travelerPricings[a].fareDetailsBySegment[b].class;
//         classArray.push(classOfService);
//       }
//     }
//     testFlightDataFinal = [
//       {"flight_ID":flightData[i].id},
//       {"last_Ticketing_Date":flightData[i].lastTicketingDate },
//       {"test_Function": [testDataFunction()]},
//       {"number_of_Seats_avaialable": flightData[i].numberOfBookableSeats},
//       {"duration": flightDurration()},
//       {"departure": departureArrayVariable},
//       {"arrival": arrivalArrayVariable},
//       {"departure_terminal": departureTerminalArray},
//       {"arrival_terminal": arrivalTerminalArray},
//       {"departure_at": departureAtArray},
//       {"arrival_at": arrivalAtArray},
//       {"currency": currency1},
//       {"grand_Total": grandTotal1},
//       {"segment_id": segmentIdArray},
//       {"cabin": cabinArray},
//       {"class": classArray},
//       {"carrier": carrierCodeArray},
//       {"aircraft_code": aircraftCodeArray},
     
//     ];
//     function testDataFunction(){
//       return "Hello World"
//     }
//     flightListings.push(testFlightDataFinal);
  
//     console.log("Flight Id function: "+JSON.stringify(testFlightDataFinal, null, 2));
//   }
//   return flightListings;

//   // console.log(flightData);
  
// }
// app.get("/flights", (req, res) =>{
//     let flightData;
//     let text = "";
//     amadeus.shopping.flightOffersSearch.get({
//         originLocationCode: 'YYZ',
//         destinationLocationCode: 'LOS',
//         departureDate: '2024-09-09',
//         // returnDate:'2023-12-12',
//         travelClass: 'BUSINESS',
//         adults: '1'
//     }).then(async function(response){
//         flightData = response.data;
//         // await getFlights(flightData)
//         res.send(await getFlights(flightData));
       
     
//     }).catch(function(responseError){
//       console.log(responseError.code);
//     });
//     // console.log(flightData);
// });






// var amadeus = new Amadeus({
//     hostname: 'production'
//   });








app.use("/", carsRoute);
app.use("/", hotelsRoute);


app.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});