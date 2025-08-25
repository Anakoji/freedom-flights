// const { createElement } = require("react");

const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const input = document.getElementById("input");
const answer = document.getElementById("answer");
const baseUrl = "http://localhost:5000/getHtmlFlights";
// const baseUrl = "../json/returnData.json";

// const baseUrl = "../json/flightNewData.json";
let listNumber = 10;

console.log("Opened");

async function getInfo(e) {
  // const getLocalJson = await fetch('../json/flightNewData.json', {
  //     method: "GET"
  // });

  // const html = await getLocalJson.json();
  const res = await fetch(baseUrl, {
    method: "GET",
  });
  const html = await res.json();

  let flightCarrierCode;

  let flightCurrency;
  let flightBasePrice;
  let flightGrandTotal;
  let flightPriceDiv2 = document.createElement("div");
  let advertDiv = document.createElement("div");
  let flightDataDiv1 = document.createElement("div");
  flightDataDiv1.id = "flightDataDiv";
  document.getElementById("data").appendChild(flightDataDiv1);

  for (let b = 0; b < html[0].itineraries.length; b++) {
    console.log(html[0].itineraries[b].segments);
  }

  // console.log(html[0].itineraries[1].segments);

  advertDiv.id = "advertisment-div";

  for (let i = 0; i < listNumber; i++) {
    let flightListingBox = document.createElement("div");
    let flight_id_p_tag = document.createElement("p");
    let ticketingDate = document.createElement("p");
    let numberOfSeats = document.createElement("p");
    let flightDurration = document.createElement("p");
    let flightTitleDiv = document.createElement("div");
    let flightTitleArrivalSpan = document.createElement("span");
    let flightTitleDepartureSpan = document.createElement("span");
    let payButton = document.createElement("button");
    let payButtonSpan = document.createElement("span");
    let priceTag = document.createElement("p");
    let priceCurrency;
    let flightDeparture;
    let flightDepartureAt;
    let flightArrival;
    let flightArrivalAt;
    priceTag.id = "price-tag-" + i;

    payButtonSpan.id = "payButton-span-" + i;
    flightTitleDepartureSpan.id = "flight-title-departure-span-" + i;
    flightTitleArrivalSpan.id = "flight-title-arrival-span-" + i;
    flightTitleDiv.id = "flight-listing-title-" + i;
    flightListingBox.id = "flight-listing-" + i;

    document.getElementById("flightDataDiv").appendChild(flightListingBox);
    for (let j = 0; j < html[i].itineraries.length; j++) {
      let flightDepartureTitle = document.createElement("h2");
      let flightArrivalTitle = document.createElement("h2");

      document
        .getElementById("flight-listing-" + i)
        .appendChild(flight_id_p_tag);
      document.getElementById("flight-listing-" + i).appendChild(ticketingDate);
      document.getElementById("flight-listing-" + i).appendChild(numberOfSeats);
      document
        .getElementById("flight-listing-" + i)
        .appendChild(flightDurration);
      document
        .getElementById("flight-listing-" + i)
        .appendChild(flightTitleDiv);
      document.getElementById("flight-listing-" + i).appendChild(priceTag);
      document
        .getElementById("flight-listing-title-" + i)
        .appendChild(flightTitleDepartureSpan);
      document
        .getElementById("flight-listing-title-" + i)
        .appendChild(flightTitleArrivalSpan);
      document
        .getElementById("flight-title-departure-span-" + i)
        .appendChild(flightDepartureTitle);
      document
        .getElementById("flight-title-arrival-span-" + i)
        .appendChild(flightArrivalTitle);

      document.getElementById("flight-listing-" + i).appendChild(payButtonSpan);

      document.getElementById("flight-title-departure-span-" + i).style.float =
        "left";
      document.getElementById("flight-title-arrival-span-" + i).style.float =
        "right";
      document.getElementById(
        "flight-title-departure-span-" + i
      ).style.textDecoration = "none";
      document.getElementById(
        "flight-title-arrival-span-" + i
      ).style.textDecoration = "none";
      document.getElementById("flight-title-arrival-span-" + i).style.position =
        "relative";
      document.getElementById(
        "flight-title-departure-span-" + i
      ).style.position = "relative";
      document.getElementById("flight-title-arrival-span-" + i).style.right =
        "100px";
      document.getElementById("flight-title-departure-span-" + i).style.left =
        "100px";

      flight_id_p_tag.innerText =
        "Flight ID: " + JSON.stringify(html[i].id, null, 4);
      ticketingDate.innerText =
        "Last Ticketing Date: " +
        JSON.stringify(html[i].lastTicketingDate, null, 4);
      numberOfSeats.innerText =
        "Number of Seats Available: " +
        JSON.stringify(html[i].numberOfBookableSeats, null, 4);
      flightDurration.innerText =
        "Flight Durration: " +
        JSON.stringify(html[i].itineraries[j].duration, null, 4);
      flightDepartureTitle.innerText = "Flight Departure";
      flightArrivalTitle.innerText = "Flight Arrival";
      priceCurrency = JSON.stringify(html[i].price.currency, null, 4)
        .slice(1)
        .slice(0, 0 - 1);
      priceTag.innerText =
        "Price: " +
        JSON.stringify(html[i].price.grandTotal, null, 4)
          .slice(1)
          .slice(0, 0 - 1) +
        " " +
        priceCurrency;

      payButton.innerText = "Pay Now!";
      payButton.id = "payButton-" + i;
      payButton.classList.add("btn");
      payButton.classList.add("btn-danger");

      document.getElementById("payButton-span-" + i).appendChild(payButton);

      for (let z = 0; z < html[i].itineraries[j].segments.length; z++) {
        let flightResultDepartureSpan = document.createElement("span");
        let flightResultDepartureTerminalSpan = document.createElement("span");
        let flightResultDepartureAtSpan = document.createElement("span");
        let flightResultTerminalArrivalSpan = document.createElement("span");
        let flightResultArrivalSpan = document.createElement("span");
        let flightResultArrivalAtSpan = document.createElement("span");

        flightResultDepartureSpan.id = "flight-dep-result-" + z + "-" + i;
        flightResultArrivalSpan.id = "flight-ariv-result-" + z + "-" + i;
        flightDepartureIata =
          JSON.stringify(
            html[i].itineraries[j].segments[z].departure.iataCode,
            null,
            4
          ) + "\n";
        flightDepartureTerminal =
          JSON.stringify(
            html[i].itineraries[j].segments[z].departure.terminal,
            null,
            4
          ) + "\n";
        flightDepartureAt =
          JSON.stringify(
            html[i].itineraries[j].segments[z].departure.at,
            null,
            4
          ) +
          "\n" +
          "\n";

        flightArrival =
          JSON.stringify(
            html[i].itineraries[j].segments[z].arrival.iataCode,
            null,
            4
          ) + "\n";
        flightArrivalTerminal =
          JSON.stringify(
            html[i].itineraries[j].segments[z].arrival.terminal,
            null,
            4
          ) + "\n";
        flightArrivalAt =
          JSON.stringify(
            html[i].itineraries[j].segments[z].arrival.at,
            null,
            4
          ) +
          "\n" +
          "\n";
        document
          .getElementById("flight-title-departure-span-" + i)
          .appendChild(flightResultDepartureSpan);
        document
          .getElementById("flight-title-departure-span-" + i)
          .appendChild(flightResultDepartureTerminalSpan);
        document
          .getElementById("flight-title-departure-span-" + i)
          .appendChild(flightResultDepartureAtSpan);
        document
          .getElementById("flight-title-arrival-span-" + i)
          .appendChild(flightResultArrivalSpan);
        document
          .getElementById("flight-title-arrival-span-" + i)
          .appendChild(flightResultTerminalArrivalSpan);
        document
          .getElementById("flight-title-arrival-span-" + i)
          .appendChild(flightResultArrivalAtSpan);

        flightResultDepartureSpan.innerText =
          "Iata Code: " + flightDepartureIata;
        flightResultDepartureTerminalSpan.innerText =
          "Terminal: " + flightDepartureTerminal;
        flightResultDepartureAtSpan.innerText =
          "Departure At: " + flightDepartureAt.replace(/T/g, " ");
        flightResultArrivalSpan.innerText = "Iata Code: " + flightArrival;
        flightResultTerminalArrivalSpan.innerText =
          "Terminal: " + flightArrivalTerminal;
        flightResultArrivalAtSpan.innerText =
          "Arrival At:" + flightArrivalAt.replace(/T/g, " ");
      }

      document.getElementById("payButton-span-" + i).style.position =
        "relative";
      document.getElementById("payButton-span-" + i).style.top = "160px";
      document.getElementById("payButton-span-" + i).style.right = "10px";
      document.getElementById("price-tag-" + i).style.position = "relative";
      document.getElementById("price-tag-" + i).style.top = "160px";
      document.getElementById("price-tag-" + i).style.right = "20px";

      document.getElementById("flight-listing-" + i).style.border =
        "5px solid black";
      document.getElementById("flight-listing-" + i).style.width = "900px";

      if (html[i].itineraries[j].segments.length >= 3) {
        document.getElementById("flight-listing-" + i).style.height = "550px";
        document.getElementById("payButton-span-" + i).style.position =
          "relative";
        document.getElementById("payButton-span-" + i).style.top = "260px";
        document.getElementById("payButton-span-" + i).style.right = "10px";
        document.getElementById("price-tag-" + i).style.position = "relative";
        document.getElementById("price-tag-" + i).style.top = "260px";
      } else {
        document.getElementById("flight-listing-" + i).style.height = "450px";
      }
      if (
        html[i].itineraries.length >= 2 &&
        html[i].itineraries[j].segments.length === 2
      ) {
        document.getElementById("flight-listing-" + i).style.height = "750px";
        document.getElementById("payButton-span-" + i).style.position =
          "relative";
        document.getElementById("payButton-span-" + i).style.top = "400px";
        document.getElementById("payButton-span-" + i).style.right = "10px";
        document.getElementById("price-tag-" + i).style.position = "relative";
        document.getElementById("price-tag-" + i).style.top = "390px";
      }
      if (
        html[i].itineraries[0].segments.length >= 3 &&
        html[i].itineraries.length >= 2
      ) {
        document.getElementById("flight-listing-" + i).style.height = "850px";
        document.getElementById("payButton-span-" + i).style.position =
          "relative";
        document.getElementById("payButton-span-" + i).style.top = "500px";
        document.getElementById("payButton-span-" + i).style.right = "10px";
        document.getElementById("price-tag-" + i).style.position = "relative";
        document.getElementById("price-tag-" + i).style.top = "490px";
      }

      if (
        html[i].itineraries[j].segments.length >= 3 &&
        html[i].itineraries.length >= 2
      ) {
        document.getElementById("flight-listing-" + i).style.height = "850px";
        document.getElementById("payButton-span-" + i).style.position =
          "relative";
        document.getElementById("payButton-span-" + i).style.top = "500px";
        document.getElementById("payButton-span-" + i).style.right = "10px";
        document.getElementById("price-tag-" + i).style.position = "relative";
        document.getElementById("price-tag-" + i).style.top = "490px";
      }

      console.log(html[11].itineraries[0].segments.length);
      console.log(html[11].itineraries[0].segments);
      console.log(j + " This is j");

      //  if(html[i].itineraries.length >= 1 && html[i].itineraries[j].segments.length >= 3){
      //        document.getElementById("flight-listing-" + i).style.height = "1050px"
      //     document.getElementById("payButton-span-" + i).style.position = "relative";
      //     document.getElementById("payButton-span-" + i).style.top = "400px";
      //     document.getElementById("payButton-span-" + i).style.right = "10px";
      //     document.getElementById("price-tag-" + i).style.position = "relative";
      //     document.getElementById("price-tag-" + i).style.top = "390px";
      //  }

      flightListingBox.insertAdjacentHTML("afterend", "<br>");
      flightListingBox.insertAdjacentHTML("afterend", "<br>");

      flightTitleDiv.insertAdjacentHTML("afterend", "<br>");
      flightTitleDiv.insertAdjacentHTML("afterend", "<br>");

      let getPayButtonCount = document.getElementById(`payButton-span-${i}`);
      getPayButtonCount.addEventListener("click", function () {
        console.log("Sending to backend " + i);

        async function getFlightPricingNumber() {
          const baseUrl = "http://localhost:5000/gettingPricingFlightNumber";

          const postDate = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              priceNumber: i,
            }),
          });
        }
        getFlightPricingNumber();

        for (let i = 0; i < listNumber; i++) {
          document.getElementById(`payButton-${i}`).disabled = true;
        }

        async function moveToItinierary() {
          const baseUrl = "http://localhost:5000/sendDataToItinirary";

          const res = await fetch(baseUrl, {
            method: "GET",
          });

          function windowRedirect() {
            window.location.href = "http://localhost:5000/sendDataToItinirary";
          }
          const myTimeout = setTimeout(windowRedirect, 10000);
        }
        moveToItinierary();
      });

      let getPayButtonForModal = document.getElementById("payButton-" + i);
      let modalAttr1 = document.createAttribute("data-bs-toggle");
      modalAttr1.value = "modal";
      getPayButtonForModal.setAttributeNode(modalAttr1);
      let getPayButtonForModal2 = document.getElementById("payButton-" + i);
      let modalAttr2 = document.createAttribute("data-bs-target");
      modalAttr2.value = "#exampleModal";
      getPayButtonForModal2.setAttributeNode(modalAttr2);
    } //j loop ends
  }
  const loadMoreButton = document.createElement("button");
  document.getElementById("flightDataDiv").append(loadMoreButton);
  loadMoreButton.id = "load-more";
  loadMoreButton.classList.add("btn");
  loadMoreButton.classList.add("btn-primary");
  loadMoreButton.innerText = "Load More";

  document.getElementById("load-more").addEventListener("click", function () {
    function loadItems() {
      listNumber += 10;
      console.log(listNumber);
      document.getElementById("flightDataDiv").innerHTML = "";
      getInfo();
    }

    loadItems();
  });
}

// getInfo();

// const baseUrl = "../json/flightNewData.json";






let allFlights = [];
const flightsPerPage = 10;
let currentPage = 1;

async function fetchFlightData() {
  try {
    const res = await fetch(baseUrl, { method: "GET" });
    allFlights = await res.json();
    renderFlightListings(currentPage);
    renderPagination();
  } catch (error) {
    console.error("Error fetching flight data:", error);
    window.location.href = "/error"; // Redirect to your custom error page
  }
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
}

async function renderFlightListings(page) {
  const container = document.getElementById("data");
  container.innerHTML = "";

  // 🔹 Load airport data and build IATA → City map
  const airportRes = await fetch("./json/airports.json");
  const airportData = await airportRes.json();
  const airportMap = {};
  airportData.forEach(airport => {
    airportMap[airport.iata] = airport.city || airport.name;
  });

  const startIndex = (page - 1) * flightsPerPage;
  const endIndex = Math.min(startIndex + flightsPerPage, allFlights.length);

  for (let i = startIndex; i < endIndex; i++) {
    const flight = allFlights[i];
    const traveler = flight.travelerPricings[0];

    let itineraryHTML = flight.itineraries.map((itinerary, itinIndex) => {
      const segments = itinerary.segments;
      const direction = itinIndex === 0 ? "<b>Outbound</b>" : "<b>Return</b>";

      const segmentDetails = segments.map(seg => {
        const fareDetails = traveler.fareDetailsBySegment.find(f => f.segmentId === seg.id);
        const depCity = airportMap[seg.departure.iataCode] || seg.departure.iataCode;
        const arrCity = airportMap[seg.arrival.iataCode] || seg.arrival.iataCode;

        return `
          <div class="mb-2">
            <strong>${depCity} (${seg.departure.iataCode}) → ${arrCity} (${seg.arrival.iataCode})</strong><br>
            <b>Flight ${seg.carrierCode}${seg.number}</b> | <b>Aircraft: ${seg.aircraft.code}</b><br>
   <b>Departure:</b> ${formatDateTime(seg.departure.at)} (Terminal ${seg.departure.terminal || "N/A"})<br>
<b>Arrival:</b> ${formatDateTime(seg.arrival.at)} (Terminal ${seg.arrival.terminal || "N/A"})<br>
            <b>Duration:</b> ${seg.duration.replace("PT", "").toLowerCase()}<br>
            <b>Cabin:</b> ${fareDetails?.cabin || "N/A"} | <b>Class:</b> ${fareDetails?.class || "N/A"}<br>
            <b>Checked Bags:</b> ${fareDetails?.includedCheckedBags?.quantity || 0} | <b>Cabin Bags:</b> ${fareDetails?.includedCabinBags?.quantity || 0}
          </div>
        `;
      }).join("");

      return `
        <h5 class="mt-3">${direction} <b>Flight</b></h5>
        ${segmentDetails}
      `;
    }).join("");

    const cardHTML = `
      <div class="card mb-4 border-primary">
        <div class="card-header bg-primary text-white">
          Flight Offer #${flight.id} — ${flight.validatingAirlineCodes.join(", ")}
        </div>
        <div class="card-body">
          <p><strong>Last Ticketing Date:</strong> ${flight.lastTicketingDate}</p>
          <p><strong>Seats Available:</strong> ${flight.numberOfBookableSeats}</p>
          ${itineraryHTML}
          <p><strong>Price:</strong> ${flight.price.total} ${flight.price.currency}</p>
          <button id="payButton-${i}" class="btn btn-success">Pay Now</button>
        </div>
      </div>
    `;

    container.innerHTML += cardHTML;
  }

  // 🔹 Attach modal logic after rendering all cards
  for (let i = startIndex; i < endIndex; i++) {
    const button = document.getElementById(`payButton-${i}`);
    const flight = allFlights[i];

    button.addEventListener("click", async () => {
      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();

      document.getElementById("loadingAnimation").style.display = "inline";
      document.getElementById("modalMessage").textContent = "Preparing your itinerary...";

      try {
        await fetch("/api/sendDataToItinirary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(flight)
        });

        await fetch("/pricingRoute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(flight)
        });

        setTimeout(() => {
          window.location.href = "/itinirary";
        }, 3000);

      } catch (error) {
        console.error("Error in itinerary flow:", error);
        document.getElementById("modalMessage").textContent = "Something went wrong. Please try again.";
        document.getElementById("loadingAnimation").style.display = "none";
      }
    });
  }
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(allFlights.length / flightsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary mx-1";
    btn.innerText = page;

    if (page === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = page;
      renderFlightListings(currentPage);
      renderPagination(); // Re-render pagination to update highlight
    });

    paginationContainer.appendChild(btn);
  }
}

fetchFlightData();