


// window.addEventListener('click', clickOutside);


// function clickOutside(e){
//     if(e.target == modal){
//         modal.style.display = 'none';
//     }
// }
flatpickr("#calendar", {
  // Enables date range selection
  minDate: "today", // Disables past dates
  dateFormat: "Y-m-d", // Format for selected dates
  onChange: function (selectedDates, dateStr, instance) {

    getDepartureDate()
  }
});

async function getDepartureDate() {
  let todaysDate = document.getElementById("calendar");
  todaysDate.addEventListener('input', () => {
    console.log("Todays Date Input: " + todaysDate.value);
  })

  if (todaysDate.value.length == 10) {
    const baseUrl = "http://localhost:5000/postDestDateRoute"


    const postDate = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        destDate: todaysDate.value
      })
    });
  }

}
flatpickr("#calendar1", {
  // Enables date range selection
  minDate: new Date().setDate(new Date().getDate() + 1), // Disables past dates
  dateFormat: "Y-m-d", // Format for selected dates
  onChange: function (selectedDates, dateStr, instance) {

    getReturnDate()
  }

});
async function getReturnDate() {
  let todaysDate = document.getElementById("calendar1");
  todaysDate.addEventListener('input', () => {
    console.log("Return Date Input: " + todaysDate.value);
  })

  if (todaysDate.value.length == 10) {
    const baseUrl = "http://localhost:5000/postReturnDateRoute"


    const postDate = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        returnDate: todaysDate.value
      })
    });
  }
}
async function getIataCitieOrigin() {

  let jsonData;
  const cities = await fetch("./json/airports.json");
  const loadedCities = await cities.json();
  let countries = [];


  console.log("Origin Promise");
  for (let i = 0; i < loadedCities.length; i++) {

    let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata

    if (loadedCities[i].city && loadedCities[i].country && loadedCities[i].iata) {
      countries.push(citieFinal);
      jsonData = citieFinal;

    }
  }

  const searchInput = document.getElementById('searchInput1');
  const dropdownList = document.getElementById('dropdownList1');
  let lastFilteredData = []

  // Function to render dropdown items
  function renderDropdownItems(data) {
    dropdownList.innerHTML = ''; // Clear previous items
    lastFilteredData = data;
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'dropdown-item1';
      div.textContent = item;
      div.addEventListener('click', async () => {
        searchInput.value = item; // Set selected value
        dropdownList.style.display = 'none'; // Hide dropdown
        let iataOriginCode = searchInput.value.slice(-3);
        console.log(iataOriginCode);
        const baseUrl = "http://localhost:5000/postIataOriginRoute"
        const destPost = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            iataOrigin: iataOriginCode
          })
        });

        console.log("origin:" + iataOriginCode.slice(-3));
      });
      dropdownList.appendChild(div);
    });
  }

  // Event listener for live search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = countries.filter(item =>
      item.toLowerCase().includes(query)
    );
    renderDropdownItems(filteredData);
    if (filteredData.length > 0) {
      // renderDropdownItems(filteredData);
      dropdownList.style.display = 'block'; // Show dropdown
    } else {
      dropdownList.style.display = 'none'; // Hide dropdown if no match
    }
  });

  // Validate input on blur (when leaving the field)
  searchInput.addEventListener('blur', () => {
    // Only allow selection from filtered dropdown
    if (!lastFilteredData.includes(searchInput.value)) {
      searchInput.value = '';
    }
  });
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!document.getElementById('dropdown1').contains(e.target)) {
      dropdownList.style.display = 'none';
    }
  });
}
getIataCitieOrigin();
async function getIataCitieDest() {

  let jsonData;
  const cities = await fetch("./json/airports.json");
  const loadedCities = await cities.json();
  let countries = [];


  // console.log("Destination Promise");
  for (let i = 0; i < loadedCities.length; i++) {
    let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata

    if (loadedCities[i].city && loadedCities[i].country && loadedCities[i].iata) {
      countries.push(citieFinal);
      jsonData = citieFinal;

    }

  }

  const searchInput = document.getElementById('searchInput2');
  const dropdownList = document.getElementById('dropdownList2');
  let lastFilteredData = [];
  // Function to render dropdown items
  function renderDropdownItems(data) {

    dropdownList.innerHTML = ''; // Clear previous items
    lastFilteredData = data;
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'dropdown-item2';
      div.textContent = item;
      div.addEventListener('click', async () => {
        searchInput.value = item; // Set selected value
        dropdownList.style.display = 'none'; // Hide dropdown
        console.log("Destination Function");
        let iataDestinationCode = searchInput.value;
        // console.log(iataDestinationCode);
        // iataDestinationCode = inp.value;
        iataDestinationCode = iataDestinationCode.slice(-3);

        const baseUrl = "http://localhost:5000/postIataDestRoute"
        const destPost = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            iataDestination: iataDestinationCode

          })
        });
        console.log("destination:" + iataDestinationCode.slice(-3));
      });
      dropdownList.appendChild(div);
    });
  }

  // Event listener for live search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredData = countries.filter(item =>
      item.toLowerCase().includes(query)
    );
    renderDropdownItems(filteredData);
    if (filteredData.length > 0) {
      // renderDropdownItems(filteredData);
      dropdownList.style.display = 'block'; // Show dropdown
    } else {
      dropdownList.style.display = 'none'; // Hide dropdown if no match
    }
  });

  // Validate input on blur (when leaving the field)
  searchInput.addEventListener('blur', () => {
    // Only allow selection from filtered dropdown
    if (!lastFilteredData.includes(searchInput.value)) {
      searchInput.value = '';
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!document.getElementById('dropdown2').contains(e.target)) {
      dropdownList.style.display = 'none';
    }
  });

}
getIataCitieDest();



// function validateOriginInput() {

function disableButton() {
  const buttonToDisable = document.getElementById("modal-Button");
  const search1Input = document.getElementById("searchInput1")
  search1Input.addEventListener("input", () => {



    if (search1Input.value.trim() === '') {
      buttonToDisable.disabled = true;
    }



  });
}


//  const search1Input = document.getElementById("searchInput1");
//  const search2Input = document.getElementById("searchInput2");
//  const buttonToDisable = document.getElementById("modal-Button");

// search1Input.addEventListener('input', () => {
//   buttonToDisable.disabled = search1Input.value.trim() === ''; // Disable if input is blank
// });
// search2Input.addEventListener('input', () => {
//   buttonToDisable.disabled = search2Input.value.trim() === ''; // Disable if input is blank
// });


const search1Input = document.getElementById("searchInput1");
const search2Input = document.getElementById("searchInput2");
const searchCalendar1 = document.getElementById("calendar");
const searchCalendar2 = document.getElementById("calendar1");
const buttonToDisable = document.getElementById("modal-Button");
const roundTripSwitch = document.getElementById("flexSwitchCheckDefault");
function toggleButtonState() {
  if (roundTripSwitch.checked) {
    // Round trip: require all fields including return date
    buttonToDisable.disabled =
      !search1Input.value.trim() ||
      !search2Input.value.trim() ||
      !searchCalendar1.value.trim() ||
      !searchCalendar2.value.trim();
  } else {
    // One way: ignore return date
    buttonToDisable.disabled =
      !search1Input.value.trim() ||
      !search2Input.value.trim() ||
      !searchCalendar1.value.trim();
  }
}
// function toggleButtonState() {
//   // Disable the button if either input is empty
//   buttonToDisable.disabled = !search1Input.value.trim() || !search2Input.value.trim() || !searchCalendar1.value.trim();
// }

// Add event listeners to both inputs
search1Input.addEventListener('input', toggleButtonState);
search2Input.addEventListener('input', toggleButtonState);
searchCalendar1.addEventListener('input', toggleButtonState);
searchCalendar2.addEventListener('input', toggleButtonState);
roundTripSwitch.addEventListener('change', toggleButtonState);


// disableButton()

//   document.getElementById("modal-Button").disabled = true;
//   if (flightOrigin === '') {
//     document.getElementById("modal-Button").disabled = true;

//   } else {
//     document.getElementById("modal-Button").disabled = false;
//   }
// }

// function originLoad(){
//   document.getElementById("modal-Button").disabled = true;
// }



// async function getIataFlightData(){
//   const testButton =  document.getElementById("getTestButton");
//   const baseUrl = "http://localhost:5000/getTestRoute"
//   testButton.addEventListener('click', async function getIataData(e){
//     e.preventDefault();
//     const res = await fetch(baseUrl,{
//       method:"GET"
//     });

//     console.log("Getting Iata data");
//   });

// }
// async function postIataFlightData(){
//   const testButton =  document.getElementById("postTestButton");
//   const baseUrl = "http://localhost:5000/postTestRoute"
//   testButton.addEventListener('click', async function getIataData(e){
//     e.preventDefault();
//     const res = await fetch(baseUrl,{
//       method:"POST",
//       headers: {
//         "Content-Type": 'application/json'
//       },
//       body:JSON.stringify({
//         test:"Front End Data"
//       })
//     });
//     console.log("redirecting...");
// // window.location.href = "http://localhost:5000/testFlights"
//   });

// }
// postIataFlightData();

// async function submitValidation(){
//   const cities = await fetch("./json/airports.json");
//   const loadedCities = await cities.json();
//   let countries = [];    
//   let getDestInput = document.getElementById("destinationMyInput");

//   for(let i = 0; i < loadedCities.length; i++){

//       let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata

//       countries.push(citieFinal);
//   }


//   getDestInput.addEventListener("change", async function (e){

//   let getInput = e.target.value;
//   console.log("Your input is: " + getInput);

//   // for(let n = 0; n<countries.length; n++){
//   // if(countries[n] != getInput){
//   //   console.log("Disabled");
//   // }
//   // }
//   const baseUrl = "http://localhost:5000/destValidation"


//   const postDate = await fetch(baseUrl,{
//     method:"POST",
//     headers: {
//       "Content-Type": 'application/json'
//     },
//     body:JSON.stringify({
//       destValid: getInput
//     })
// });
//   // countries.forEach(country =>{
//   //   if(country !=  getInput){
//   //     console.log("False: ");
//   //   }
//   // })
//  console.log("Testing Async!");
// });


// }


function checking() {
  if (document.getElementById('flexSwitchCheckDefault').checked) {
    console.log('Round Trip');
    document.getElementById('returnDate').style.display = 'block';
  } else {
    console.log('No Round trip');
    document.getElementById('returnDate').style.display = 'none';
  }
}


checking()
// async function searchFlight(){
//   const testButton =  document.getElementById("modal-Button");
//   const baseUrl = "http://localhost:5000/getTestRoute"
//   testButton.addEventListener('click', async function getIataData(e){
//     e.preventDefault();
//     const res = await fetch(baseUrl,{
//       method:"GET"
//     });

//     console.log("Testing redirection");
//     function windowRedirect(){
//       window.location.href = "http://localhost:5000/testFlights"
//       // window.location.href = "http://localhost:5000/testFlights"

//     }
//     const myTimeout = setTimeout(windowRedirect, 10000);
//   });

// }
// searchFlight()

async function searchFlight() {
  const flightButton = document.getElementById("modal-Button");
  const baseUrl = "http://localhost:5000/flights"
  flightButton.addEventListener('click', async function getIataData(e) {
    e.preventDefault();
    const res = await fetch(baseUrl, {
      method: "GET"
    });
    // const myTimeout = setTimeout(10000);
    function windowRedirect() {
      // window.location.href = "http://localhost:5000/jsonMyRoute"
      window.location.href = "http://localhost:5000/htmlFlights"
      // window.location.href = "http://localhost:5000/testFlights"

    }
    const myTimeout = setTimeout(windowRedirect, 10000);

  });

}

async function numberOfAdultPassangers() {
  const baseUrl = "http://localhost:5000/adults"
  let numberOfAdults = document.getElementById("adult");

  const destPost = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      amountOfAdults: numberOfAdults.value

    })
  });

  yourCabin.addEventListener('change', async function () {

  })
}
function numberOfAdultPassangersChange() {
  const baseUrl = "http://localhost:5000/adults"
  let numberOfAdults = document.getElementById("adult");
  numberOfAdults.addEventListener('change', async function () {

    const destPost = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        amountOfAdults: numberOfAdults.value

      })
    });
  })


}
async function cabin() {
  const baseUrl = "http://localhost:5000/cabin"
  let yourCabin = document.getElementById("classOfService");
  let selectedValue = yourCabin.value;
  const destPost = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      selectedCabin: yourCabin.value

    })
  });


}
function cabinChange() {
  let yourCabin = document.getElementById("classOfService");
  yourCabin.addEventListener('change', async function () {
    const baseUrl = "http://localhost:5000/cabin"
    let selectedValue = yourCabin.value;
    const destPost = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        selectedCabin: yourCabin.value

      })
    });
  })
}

function submitFlight() {
  console.log("Submitting flight");
}
numberOfAdultPassangers();
cabinChange();
cabin();
numberOfAdultPassangersChange();
checking();
// getIataFlightData()
// postIataFlightData()
searchFlight();


// document.getElementById("flightOrigin").addEventListener("load", originLoad);

// document.getElementById("flightOrigin").addEventListener('input', validateOriginInput);



