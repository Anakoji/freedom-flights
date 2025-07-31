const baseUrl = "http://localhost:5000/itinirary";
const baseUrl2 = "../json/itinerary.json";



// async function getItinerary() {
//   const response = await fetch("../json/itinerary.json");
//   const data = await response.json();
//   const itinerary = data[0];

//   const container = document.getElementById("itinerary-container");
//   if (!itinerary) {
//     container.innerHTML = "<p>No itinerary found.</p>";
//     return;
//   }

//   // Ticket Info
//   let html = `
//     <div class="mb-4">
//       <h4>Ticketing Info</h4>
//       <p><strong>Ticket ID:</strong> ${itinerary.id}</p>
//       <p><strong>Last Payment Date:</strong> ${itinerary.lastTicketingDate}</p>
//       <p><strong>Seats Available:</strong> ${itinerary.numberOfBookableSeats}</p>
//     </div>
//   `;

//   // Flight Segments Table
//   html += `
//     <div class="table-responsive">
//       <table class="table table-bordered table-striped">
//         <thead class="table-dark">
//           <tr>
//             <th>Type</th>
//             <th>IATA Code</th>
//             <th>Terminal</th>
//             <th>Carrier</th>
//             <th>Flight #</th>
//             <th>Aircraft</th>
//             <th>Operating Carrier</th>
//             <th>Cabin</th>
//             <th>Checked Bags</th>
//             <th>Cabin Bags</th>
//             <th>Date & Time</th>
//           </tr>
//         </thead>
//         <tbody>
//   `;

//   const segments = itinerary.itineraries[0].segments;
//   const fareDetails = itinerary.travelerPricings[0].fareDetailsBySegment;

//   segments.forEach((seg, i) => {
//     // Departure row
//     html += `
//       <tr>
//         <td>Departure</td>
//         <td>${seg.departure.iataCode || ""}</td>
//         <td>${seg.departure.terminal || ""}</td>
//         <td>${seg.carrierCode || ""}</td>
//         <td>${seg.number || ""}</td>
//         <td>${seg.aircraft.code || ""}</td>
//         <td>${seg.operating.carrierCode || ""}</td>
//         <td>${fareDetails[i].cabin || ""}</td>
//         <td>${fareDetails[i].includedCheckedBags?.quantity ?? ""}</td>
//         <td>${fareDetails[i].includedCabinBags?.quantity ?? ""}</td>
//         <td>${seg.departure.at.replace("T", " ")}</td>
//       </tr>
//     `;
//     // Arrival row
//     html += `
//       <tr>
//         <td>Arrival</td>
//         <td>${seg.arrival.iataCode || ""}</td>
//         <td>${seg.arrival.terminal || ""}</td>
//         <td>${seg.carrierCode || ""}</td>
//         <td>${seg.number || ""}</td>
//         <td>${seg.aircraft.code || ""}</td>
//         <td>${seg.operating.carrierCode || ""}</td>
//         <td>${fareDetails[i].cabin || ""}</td>
//         <td>${fareDetails[i].includedCheckedBags?.quantity ?? ""}</td>
//         <td>${fareDetails[i].includedCabinBags?.quantity ?? ""}</td>
//         <td>${seg.arrival.at.replace("T", " ")}</td>
//       </tr>
//     `;
//   });

//   html += `
//         </tbody>
//       </table>
//     </div>
//   `;

//   // Price
//   html += `
//     <div class="mt-4">
//       <h4>Grand Total</h4>
//       <p><strong>${itinerary.price.grandTotal} ${itinerary.price.currency}</strong></p>
//       <button id="confirm-Button" class="btn btn-warning">Confirm</button>
//     </div>
//   `;

//   container.innerHTML = html;
// }

// getItinerary();


async function getData(){

    const getLocalJson = await fetch(baseUrl2, {
        method: "GET"
    });
    
    const data = await getLocalJson.json();
    // let normalizeData = JSON.parse(data)
    const displayData = JSON.stringify(data, null, 4);
    
    const ticketingInfoDiv = document.createElement("div");
    document.getElementById("data1").append(ticketingInfoDiv)
    ticketingInfoDiv.id = "ticketing-info"
    document.getElementById("ticketing-info").innerHTML ="<h1>Ticketing Info</h1>" 

    const getId = JSON.stringify(data[0].id, null, 4)
    const getIdChild = document.createElement("span");
    document.getElementById("data1").append(getIdChild);
    getIdChild.id = "flight-Id";
    document.getElementById("flight-Id").append("Ticket Id: " + getId.slice(1, -1) + "\n");

    const lastTicketingDate = JSON.stringify(data[0].lastTicketingDate, null, 4)
    const lastTicketingDateSpan = document.createElement("span");
    lastTicketingDateSpan.id = "last-Ticketing-Date";
    document.getElementById("data1").append(lastTicketingDateSpan)
    document.getElementById("last-Ticketing-Date").append("Last Payment Date: " + lastTicketingDate.slice(1, -1) + "\n")

    const numberOfBookableSeats = JSON.stringify(data[0].numberOfBookableSeats, null, 4)
    const numberOfBookableSeatsSpan = document.createElement("span");
    numberOfBookableSeatsSpan.id = "number-Of-Bookable-Seats";
    document.getElementById("data1").append(numberOfBookableSeatsSpan);
    document.getElementById("number-Of-Bookable-Seats").append("Number of Seats Available: " + numberOfBookableSeats + "\n")

    
    const flightDataDiv = document.createElement("div");
    flightDataDiv.id = "flight-Data-Div";
    document.getElementById("data1").append(flightDataDiv);

    flightDataDiv.style.display = "grid"
    flightDataDiv.style.gridTemplateColumns = "1fr 1fr"



    const departureDiv = document.createElement("div");
    departureDiv.id = "departure-div";
    document.getElementById("flight-Data-Div").append(departureDiv);

    const departureTitleSpan = document.createElement("span");
    departureTitleSpan.id = "departure-title";
    document.getElementById("departure-div").append(departureTitleSpan);
    departureTitleSpan.innerHTML= "<h4><b>Departure</b><h4>"

    console.log(data[0].itineraries[0].segments.length);
    for(let i = 0; i < data[0].itineraries[0].segments.length; i++){
        const departureIataCode = JSON.stringify(data[0].itineraries[0].segments[i].departure.iataCode);
        let departureIataCodeSpan = document.createElement("span");
        departureIataCodeSpan.id = "departure-Iata-Code-" + i;
        document.getElementById("departure-div").append(departureIataCodeSpan);
        document.getElementById("departure-Iata-Code-" + i).append("Iata Code: " + departureIataCode.slice(1, -1) + "\n")

        const departureTerminal= JSON.stringify(data[0].itineraries[0].segments[i].departure.terminal);
        let departureTerminalSpan = document.createElement("span");
        departureTerminalSpan.id = "departure-Terminal-" + i;
        document.getElementById("departure-div").append(departureTerminalSpan);
        document.getElementById("departure-Terminal-" + i).append("Terminal: " + departureTerminal + "\n");

        const departureCarrierCode= JSON.stringify(data[0].itineraries[0].segments[i].carrierCode);
        let departureCarrierCodeSpan = document.createElement("span");
        departureCarrierCodeSpan.id = "departure-Carrier-Code-" + i;
        document.getElementById("departure-div").append(departureCarrierCodeSpan);
        document.getElementById("departure-Carrier-Code-" + i).append("Carrier Code: " + departureCarrierCode.slice(1, -1) + "\n");

        const departureCarrierNumber= JSON.stringify(data[0].itineraries[0].segments[i].number);
        let departureCarrierNumberSpan = document.createElement("span");
        departureCarrierNumberSpan.id = "departure-Carrier-Number-" + i;
        document.getElementById("departure-div").append(departureCarrierNumberSpan);
        document.getElementById("departure-Carrier-Number-" + i).append("Carrier Number: " + departureCarrierNumber.slice(1, -1) + "\n");

        const departureAircraftCode= JSON.stringify(data[0].itineraries[0].segments[i].aircraft.code);
        let departureAircraftCodeSpan = document.createElement("span");
        departureAircraftCodeSpan.id = "departure-aircraft-code-" + i;
        document.getElementById("departure-div").append(departureAircraftCodeSpan);
        document.getElementById("departure-aircraft-code-" + i).append("Aircraft Code: " + departureAircraftCode.slice(1, -1) + "\n");
        
        const departureOperating= JSON.stringify(data[0].itineraries[0].segments[i].operating.carrierCode);
        let departureOperatingSpan = document.createElement("span");
        departureOperatingSpan.id = "departure-Operating-code-" + i;
        document.getElementById("departure-div").append(departureOperatingSpan);
        document.getElementById("departure-Operating-code-" + i).append("Operating Carrier Code: " + departureOperating + "\n");

          const departureCabin= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].cabin);
        let departureCabinSpan = document.createElement("span");
        departureCabinSpan.id = "departure-Cabin-" + i;
        document.getElementById("departure-div").append(departureCabinSpan);
        document.getElementById("departure-Cabin-" + i).append("Cabin: " + departureCabin.slice(1, -1) + "\n");

        const departureIncludedCheckedBags= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].includedCheckedBags.quantity);
        let departureIncludedCheckedBagsSpan = document.createElement("span");
        departureIncludedCheckedBagsSpan.id = "departure-IncludedCheckedBags-" + i;
        document.getElementById("departure-div").append(departureIncludedCheckedBagsSpan);
        document.getElementById("departure-IncludedCheckedBags-" + i).append("Included Checked Bags: " + departureIncludedCheckedBags + "\n");

        const departureIncludedCheckedBagsCabin= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].includedCabinBags.quantity);
        let departureIncludedCheckedBagsCabinSpan = document.createElement("span");
        departureIncludedCheckedBagsCabinSpan.id = "departure-IncludedCheckedBags-Cabin-" + i;
        document.getElementById("departure-div").append(departureIncludedCheckedBagsCabinSpan);
        document.getElementById("departure-IncludedCheckedBags-Cabin-" + i).append("Included Cabin Bags: " + departureIncludedCheckedBagsCabin + "\n");
        
        const departureAt= JSON.stringify(data[0].itineraries[0].segments[i].departure.at);
        let departureAtSpan = document.createElement("span");
        departureAtSpan.id = "departure-At-" + i;
        document.getElementById("departure-div").append(departureAtSpan);
        document.getElementById("departure-At-" + i).append("Departure Date: " + departureAt.slice(1, -1).replace(/T/g, " Time: ") + "\n" + "\n")
        // console.log(data[0].itineraries[0].segments[i].departure);

    }

     const arrivalDiv = document.createElement("div");
    arrivalDiv.id = "arrival-div";
    document.getElementById("flight-Data-Div").append(arrivalDiv);

    const arrivalTitleSpan = document.createElement("span");
    arrivalTitleSpan.id = "arrival-title";
    document.getElementById("arrival-div").append(arrivalTitleSpan);
    arrivalTitleSpan.innerHTML = "<h4><b>Arrival</b></h4>"

    for(let i = 0; i < data[0].itineraries[0].segments.length; i++){

        const arrivalIataCode = JSON.stringify(data[0].itineraries[0].segments[i].arrival.iataCode);
        let arrivalIataCodeSpan = document.createElement("span");
        arrivalIataCodeSpan.id = "arrival-Iata-Code-" + i;
        document.getElementById("arrival-div").append(arrivalIataCodeSpan);
        document.getElementById("arrival-Iata-Code-" + i).append("Iata Code: " + arrivalIataCode.slice(1, -1) + "\n")

        const arrivalTerminal= JSON.stringify(data[0].itineraries[0].segments[i].arrival.terminal);
        let arrivalTerminalSpan = document.createElement("span");
        arrivalTerminalSpan.id = "arrival-Terminal-" + i;
        document.getElementById("arrival-div").append(arrivalTerminalSpan);
        document.getElementById("arrival-Terminal-" + i).append("Terminal: " + arrivalTerminal + "\n")
        
        const arrivalCarrierCode= JSON.stringify(data[0].itineraries[0].segments[i].carrierCode);
        let arrivalCarrierCodeSpan = document.createElement("span");
        arrivalCarrierCodeSpan.id = "arrival-Carrier-Code-" + i;
        document.getElementById("arrival-div").append(arrivalCarrierCodeSpan);
        document.getElementById("arrival-Carrier-Code-" + i).append("Carrier Code: " + arrivalCarrierCode.slice(1, -1) + "\n");
        
        const arrivalCarrierNumber= JSON.stringify(data[0].itineraries[0].segments[i].number);
        let arrivalCarrierNumberSpan = document.createElement("span");
        arrivalCarrierNumberSpan.id = "arrival-Carrier-Number-" + i;
        document.getElementById("arrival-div").append(arrivalCarrierNumberSpan);
        document.getElementById("arrival-Carrier-Number-" + i).append("Carrier Number: " + arrivalCarrierNumber.slice(1, -1) + "\n");

        const arrivalAircraftCode= JSON.stringify(data[0].itineraries[0].segments[i].aircraft.code);
        let arrivalAircraftCodeSpan = document.createElement("span");
        arrivalAircraftCodeSpan.id = "arrival-aircraft-code-" + i;
        document.getElementById("arrival-div").append(arrivalAircraftCodeSpan);
        document.getElementById("arrival-aircraft-code-" + i).append("Aircraft Code: " + arrivalAircraftCode.slice(1, -1) + "\n");

        const arrivalOperating= JSON.stringify(data[0].itineraries[0].segments[i].operating.carrierCode);
        let arrivalOperatingSpan = document.createElement("span");
        arrivalOperatingSpan.id = "arrival-Operating-code-" + i;
        document.getElementById("arrival-div").append(arrivalOperatingSpan);
        document.getElementById("arrival-Operating-code-" + i).append("Operating Carrier Code: " + arrivalOperating + "\n");

        const arrivalCabin= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].cabin);
        let arrivalCabinSpan = document.createElement("span");
        arrivalCabinSpan.id = "arrival-Cabin-" + i;
        document.getElementById("arrival-div").append(arrivalCabinSpan);
        document.getElementById("arrival-Cabin-" + i).append("Cabin: " + arrivalCabin.slice(1, -1) + "\n");

        const arrivalIncludedCheckedBags= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].includedCheckedBags.quantity);
        let arrivalIncludedCheckedBagsSpan = document.createElement("span");
        arrivalIncludedCheckedBagsSpan.id = "arrival-IncludedCheckedBags-" + i;
        document.getElementById("arrival-div").append(arrivalIncludedCheckedBagsSpan);
        document.getElementById("arrival-IncludedCheckedBags-" + i).append("Included Checked Bags: " + arrivalIncludedCheckedBags + "\n");

        const arrivalIncludedCheckedBagsCabin= JSON.stringify(data[0].travelerPricings[0].fareDetailsBySegment[i].includedCabinBags.quantity);
        let arrivalIncludedCheckedBagsCabinSpan = document.createElement("span");
        arrivalIncludedCheckedBagsCabinSpan.id = "arrival-IncludedCheckedBags-Cabin-" + i;
        document.getElementById("arrival-div").append(arrivalIncludedCheckedBagsCabinSpan);
        document.getElementById("arrival-IncludedCheckedBags-Cabin-" + i).append("Included Cabin Bags: " + arrivalIncludedCheckedBagsCabin + "\n");

        const arrivalAt= JSON.stringify(data[0].itineraries[0].segments[i].arrival.at);
        let arrivalAtSpan = document.createElement("span");
        arrivalAtSpan.id = "arrival-At-" + i;
        document.getElementById("arrival-div").append(arrivalAtSpan);
        document.getElementById("arrival-At-" + i).append("Arrival Date: " + arrivalAt.slice(1, -1).replace(/T/g, " Time: ") + "\n" + "\n")
       
    }

    const priceSpan = document.createElement("span");
    priceSpan.id = "price-tag";
    document.getElementById("data1").append(priceSpan);
    priceSpan.innerHTML = "<h4>Grand Total</h4>";

    const grandTotalSpan = document.createElement("span");
    grandTotalSpan.id = "grand-total";
    document.getElementById("data1").append(grandTotalSpan);
    grandTotalSpan.innerText = JSON.stringify(data[0].price.grandTotal + " ").slice(1, -1);

    const currencyCodeSpan = document.createElement("span");
    currencyCodeSpan.id = "currency-code";
    document.getElementById("data1").append(currencyCodeSpan);
    currencyCodeSpan.innerText = JSON.stringify(data[0].price.currency).slice(1, -1) + "\n"  + "\n";

    const confirmButton = document.createElement("button");
    confirmButton.id = "confirm-Button";
    confirmButton.classList.add("btn-warning")
    confirmButton.classList.add("btn")
    document.getElementById("data1").append(confirmButton);
    confirmButton.innerText ="Confirm"

 
    // for(let i = 0; i < data[0].itineraries[0].segments.length; i++){
    //     const departureDateTerminal= JSON.stringify(data[0].itineraries[0].segments[i].departure.terminal);
    //     console.log(departureDateTerminal);
    //     let departureDateTerminalSpan = document.createElement("span");
    //     departureDateTerminalSpan.id = "departure-Terminal-" + i;
    //     document.getElementById("data1").append(departureDateTerminalSpan);
    //     document.getElementById("departure-Terminal-" + i).append("Terminal: " + departureDateTerminal.slice(1, -1) + "\n")
    //     // console.log(data[0].itineraries[0].segments[i].departure);

    // }


    // document.getElementById("data1").append(displayData)



}

// getData()