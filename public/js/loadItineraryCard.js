
async function getItinerary() {
  const response = await fetch("/itinirary-data");
  const data = await response.json();
  console.log("Fetched itinerary data:", data);
  const itinerary = data;
  const container = document.getElementById("itinerary-container");

  if (!itinerary) {
    container.innerHTML = "<p>No itinerary found.</p>";
    return;
  }

  const airportsRes = await fetch("../json/airports.json");
  const airportsData = await airportsRes.json();
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

  itinerary.itineraries.forEach((itin, index) => {
    const segments = itin.segments;
    const fareDetails = itinerary.travelerPricings[0].fareDetailsBySegment;

    html += `<h5 class="mb-3">${index === 0 ? "Outbound Flight" : "Return Flight"}</h5>`;

    segments.forEach((seg, i) => {
      const logoUrl = `https://content.airhex.com/content/logos/airlines_${seg.carrierCode}_350_100_r.png`;
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
          <div class="mb-2">Cabin: ${fareDetails[i]?.cabin || ""}</div>
          <div class="mb-2">Checked Bags: ${fareDetails[i]?.includedCheckedBags?.quantity ?? "0"}</div>
          <div class="mb-2">Cabin Bags: ${fareDetails[i]?.includedCabinBags?.quantity ?? "0"}</div>
          <div class="mb-2">
            <strong>Arrival:</strong> ${formatDateTime(seg.arrival.at)}
            ${seg.arrival.terminal ? `, Terminal ${seg.arrival.terminal}` : ""}
          </div>
        </div>
      `;
    });
  });

  // 💰 Add total price and confirm button
  const totalPrice = itinerary.travelerPricings[0]?.price?.total || "N/A";
  html += `</div></div>
    <div class="price-section mt-4 text-end">
      <h4>Total Price: <span class="text-success">$${totalPrice}</span></h4>
      <button class="btn btn-primary mt-2" onclick="confirmPayment()">Confirm & Pay</button>
    </div>
  </div>`;

  container.innerHTML = html;
}

// 🧾 Dummy confirm function
function confirmPayment() {
  alert("Payment confirmed! 🎉");
}

getItinerary();