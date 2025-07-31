// async function getItinerary() {
//   const response = await fetch("http://localhost:5000/itinirary");
//   // const response = await fetch("../json/itinerary.json");
//   const data = await response.json();
//   const itinerary = data[0];
//   const container = document.getElementById("itinerary-container");
//   if (!itinerary) {
//     container.innerHTML = "<p>No itinerary found.</p>";
//     return;
//   }

//   // Helper for formatting date/time
//   function formatDateTime(dt) {
//     const d = new Date(dt);
//     return d.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
//   }

//   // Start big card
//   let html = `<div class="itinerary-card" style="flex-direction: column;">
//     <div class="d-flex flex-wrap justify-content-between align-items-start w-100">
//       <div class="itinerary-segments" style="flex:2 1 350px; min-width:300px;">`;

//   const segments = itinerary.itineraries[0].segments;
//   const fareDetails = itinerary.travelerPricings[0].fareDetailsBySegment;

//   segments.forEach((seg, i) => {
//     html += `
//       <div class="mb-4 pb-3" style="border-bottom:1px solid #eee;">
//         <div class="flight-title mb-2">
//           ${seg.departure.iataCode} &rarr; ${seg.arrival.iataCode}
//         </div>
//         <div class="mb-2 text-muted">${formatDateTime(seg.departure.at)}</div>
//         <div class="mb-2">Terminal ${seg.departure.terminal || "N/A"}</div>
//         <div class="d-flex align-items-center mb-2">
       
//           <span class="fw-bold">${seg.carrierCode} ${seg.number}</span>
//         </div>
//         <div class="mb-2">Flight ${seg.carrierCode} ${seg.number}</div>
//         <div class="mb-2">Aircraft ${seg.aircraft.code || ""}</div>
//         <div class="mb-2">Cabin: ${fareDetails[i].cabin || ""}</div>
//         <div class="mb-2">Checked Bags: ${fareDetails[i].includedCheckedBags?.quantity ?? "0"}</div>
//         <div class="mb-2">Cabin Bags: ${fareDetails[i].includedCabinBags?.quantity ?? "0"}</div>
//         <div class="mb-2">
//           <strong>Arrival:</strong> ${formatDateTime(seg.arrival.at)}
//           ${seg.arrival.terminal ? `, Terminal ${seg.arrival.terminal}` : ""}
//         </div>
//       </div>
//     `;
//   });

//   html += `</div>
//       <div class="itinerary-info" style="flex:1 1 220px; min-width:200px; border-left:1px solid #eee; padding-left:2rem;">
//         <div class="mb-3">
//           <div class="fw-bold">Ticket Info</div>
//           <div>Ticket ID: <span class="fw-bold">${itinerary.id}</span></div>
//           <div class="progress my-2">
//             <div class="progress-bar bg-warning" role="progressbar" style="width: ${itinerary.numberOfBookableSeats * 10}%"></div>
//           </div>
//           <div>Number of Seats Available: <span class="fw-bold">${itinerary.numberOfBookableSeats}</span></div>
//           <div>Payment Due: <span class="fw-bold">${itinerary.lastTicketingDate}</span></div>
//         </div>
//         <div class="mt-4">
//           <div class="fw-bold mb-1">Total cost</div>
//           <div style="font-size:1.5rem;font-weight:700;">${itinerary.price.grandTotal} ${itinerary.price.currency}</div>
//           <div class="text-muted mb-2" style="font-size:0.95rem;">Includes taxes and fees</div>
//           <button class="btn btn-confirm">Confirm Purchase</button>
//         </div>
//       </div>
//     </div>
//   </div>`;

//   container.innerHTML = html;
// }

// getItinerary();


// async function getItinerary() {
//   const response = await fetch("http://localhost:5000/itinirary");
//   const data = await response.json();
//   const itinerary = data[0];
//   const container = document.getElementById("itinerary-container");
//   if (!itinerary) {
//     container.innerHTML = "<p>No itinerary found.</p>";
//     return;
//   }

//   // Helper for formatting date/time
//   function formatDateTime(dt) {
//     const d = new Date(dt);
//     return d.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
//   }

//   // Start big card
//   let html = `<div class="itinerary-card" style="flex-direction: column;">
//     <div class="d-flex flex-wrap justify-content-between align-items-start w-100">
//       <div class="itinerary-segments" style="flex:2 1 350px; min-width:300px;">`;

//   const segments = itinerary.itineraries[0].segments;
//   const fareDetails = itinerary.travelerPricings[0].fareDetailsBySegment;

//   segments.forEach((seg, i) => {
//     // Airhex logo URL using carrierCode
//     const logoUrl = `https://content.airhex.com/content/logos/airlines_${seg.carrierCode}_350_100_r.png`;

//     html += `
//       <div class="mb-4 pb-3" style="border-bottom:1px solid #eee;">
//         <div class="flight-title mb-2">
//           ${seg.departure.iataCode} &rarr; ${seg.arrival.iataCode}
//         </div>
//         <div class="mb-2 text-muted">${formatDateTime(seg.departure.at)}</div>
//         <div class="mb-2">Terminal ${seg.departure.terminal || "N/A"}</div>
//         <div class="d-flex align-items-center mb-2">
//           <img src="${logoUrl}" class="airline-logo" alt="Airline Logo" onerror="this.style.display='none'">
//           <span class="fw-bold">${seg.carrierCode} ${seg.number}</span>
//         </div>
//         <div class="mb-2">Flight ${seg.carrierCode} ${seg.number}</div>
//         <div class="mb-2">Aircraft ${seg.aircraft.code || ""}</div>
//         <div class="mb-2">Cabin: ${fareDetails[i].cabin || ""}</div>
//         <div class="mb-2">Checked Bags: ${fareDetails[i].includedCheckedBags?.quantity ?? "0"}</div>
//         <div class="mb-2">Cabin Bags: ${fareDetails[i].includedCabinBags?.quantity ?? "0"}</div>
//         <div class="mb-2">
//           <strong>Arrival:</strong> ${formatDateTime(seg.arrival.at)}
//           ${seg.arrival.terminal ? `, Terminal ${seg.arrival.terminal}` : ""}
//         </div>
//       </div>
//     `;
//   });

//   html += `</div>
//       <div class="itinerary-info" style="flex:1 1 220px; min-width:200px; border-left:1px solid #eee; padding-left:2rem;">
//         <div class="mb-3">
//           <div class="fw-bold">Ticket Info</div>
//           <div>Ticket ID: <span class="fw-bold">${itinerary.id}</span></div>
//           <div class="progress my-2">
//             <div class="progress-bar bg-warning" role="progressbar" style="width: ${itinerary.numberOfBookableSeats * 10}%"></div>
//           </div>
//           <div>Number of Seats Available: <span class="fw-bold">${itinerary.numberOfBookableSeats}</span></div>
//           <div>Payment Due: <span class="fw-bold">${itinerary.lastTicketingDate}</span></div>
//         </div>
//         <div class="mt-4">
//           <div class="fw-bold mb-1">Total cost</div>
//           <div style="font-size:1.5rem;font-weight:700;">${itinerary.price.grandTotal} ${itinerary.price.currency}</div>
//           <div class="text-muted mb-2" style="font-size:0.95rem;">Includes taxes and fees</div>
//           <button class="btn btn-confirm">Confirm Purchase</button>
//         </div>
//       </div>
//     </div>
//   </div>`;

//   container.innerHTML = html;
// }

// getItinerary();

async function getItinerary() {
  // Fetch itinerary data
  const response = await fetch("http://localhost:5000/itinirary");
  const data = await response.json();
  const itinerary = data[0];
  const container = document.getElementById("itinerary-container");
  if (!itinerary) {
    container.innerHTML = "<p>No itinerary found.</p>";
    return;
  }

  // Fetch airport data (replace with Airhex API if you have a key)
  const airportsRes = await fetch("../json/airports.json");
  const airportsData = await airportsRes.json();
  // Build a map: IATA code -> airport name
  const airportMap = {};
  airportsData.forEach(a => {
    airportMap[a.iata] = a.name;
  });

  function formatDateTime(dt) {
    const d = new Date(dt);
    return d.toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" });
  }

  let html = `<div class="itinerary-card" style="flex-direction: column;">
    <div class="d-flex flex-wrap justify-content-between align-items-start w-100">
      <div class="itinerary-segments" style="flex:2 1 350px; min-width:300px;">`;

  const segments = itinerary.itineraries[0].segments;
  const fareDetails = itinerary.travelerPricings[0].fareDetailsBySegment;

  segments.forEach((seg, i) => {
    // Airhex logo URL using carrierCode
    const logoUrl = `https://content.airhex.com/content/logos/airlines_${seg.carrierCode}_350_100_r.png`;
    // Get airport names
    const depName = airportMap[seg.departure.iataCode] || "";
    const arrName = airportMap[seg.arrival.iataCode] || "";

    html += `
      <div class="mb-4 pb-3" style="border-bottom:1px solid #eee;">
        <div class="flight-title mb-2">
          ${seg.departure.iataCode} &rarr; ${seg.arrival.iataCode}
        </div>
        <div class="mb-2 text-muted">
          <span title="${depName}">${depName ? depName + " – " : ""}${seg.departure.iataCode}</span>
          &rarr;
          <span title="${arrName}">${arrName ? arrName + " – " : ""}${seg.arrival.iataCode}</span>
        </div>
        <div class="mb-2 text-muted">${formatDateTime(seg.departure.at)}</div>
        <div class="mb-2">Terminal ${seg.departure.terminal || "N/A"}</div>
        <div class="d-flex align-items-center mb-2">
          <img src="${logoUrl}" class="airline-logo" style="width:100px;height:40px;object-fit:contain;margin-right:1rem;" alt="Airline Logo" onerror="this.style.display='none'">
          <span class="fw-bold">${seg.carrierCode} ${seg.number}</span>
        </div>
        <div class="mb-2">Flight ${seg.carrierCode} ${seg.number}</div>
        <div class="mb-2">Aircraft ${seg.aircraft.code || ""}</div>
        <div class="mb-2">Cabin: ${fareDetails[i].cabin || ""}</div>
        <div class="mb-2">Checked Bags: ${fareDetails[i].includedCheckedBags?.quantity ?? "0"}</div>
        <div class="mb-2">Cabin Bags: ${fareDetails[i].includedCabinBags?.quantity ?? "0"}</div>
        <div class="mb-2">
          <strong>Arrival:</strong> ${formatDateTime(seg.arrival.at)}
          ${seg.arrival.terminal ? `, Terminal ${seg.arrival.terminal}` : ""}
        </div>
      </div>
    `;
  });

  html += `</div>
      <div class="itinerary-info" style="flex:1 1 220px; min-width:200px; border-left:1px solid #eee; padding-left:2rem;">
        <div class="mb-3">
          <div class="fw-bold">Ticket Info</div>
          <div>Ticket ID: <span class="fw-bold">${itinerary.id}</span></div>
          <div class="progress my-2">
            <div class="progress-bar bg-warning" role="progressbar" style="width: ${itinerary.numberOfBookableSeats * 10}%"></div>
          </div>
          <div>Number of Seats Available: <span class="fw-bold">${itinerary.numberOfBookableSeats}</span></div>
          <div>Payment Due: <span class="fw-bold">${itinerary.lastTicketingDate}</span></div>
        </div>
        <div class="mt-4">
          <div class="fw-bold mb-1">Total cost</div>
          <div style="font-size:1.5rem;font-weight:700;">${itinerary.price.grandTotal} ${itinerary.price.currency}</div>
          <div class="text-muted mb-2" style="font-size:0.95rem;">Includes taxes and fees</div>
          <button class="btn btn-confirm">Confirm Purchase</button>
        </div>
      </div>
    </div>
  </div>`;

  container.innerHTML = html;
}

getItinerary();