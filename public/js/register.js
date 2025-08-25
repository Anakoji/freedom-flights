

function populateYear() {

  const select = document.getElementById('birth-year');
  const currentYear = new Date().getFullYear();
  const startYear = 1930;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
}

populateYear();


function populateDaySelect() {
  const daySelect = document.getElementById("day-select");
  daySelect.innerHTML = ""; // Clear existing options

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = String(i).padStart(2, "0");
    option.textContent = i;
    daySelect.appendChild(option);
  }
}
populateDaySelect();

function populateCountrySelect() {
  let countries;

  fetch('./json/countries_with_dial_code.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      countries = data;

      if (Array.isArray(countries)) {
        countries.forEach(country => {
          // Or whatever property you want to display
        });
      } else {
        console.error('Expected an array but got:', typeof countries);
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });


  const countrySelect = document.getElementById("country-select");

  fetch('./json/countries_with_dial_code.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Make sure data is an array before looping
      if (Array.isArray(data)) {
        data.forEach(country => {
          const option = document.createElement("option");
          option.value = `${country.name} ${country.dial_code}`;
          option.textContent = `${country.name} (${country.dial_code})`;
          countrySelect.appendChild(option);
        });
      } else {
        console.error('Expected an array of countries, but got:', typeof data);
      }
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}



async function sendRegisterDataToBackend(baseUrl) {
  const getUsername = document.getElementById("username");
  const sendUsername = getUsername.value;
  const getFirstname = document.getElementById("firstname");
  const sendFirstname = getFirstname.value;
  const getLastName = document.getElementById("lastname");
  const sendLastName = getLastName.value;
  const getEmail = document.getElementById("email");
  const sendEmail = getEmail.value;
  const getPassword = document.getElementById("password");
  const sendPassword = getPassword.value;
  const getConfirmPassword = document.getElementById("confirmPassword");
  const sendConfirmPassword = getConfirmPassword.value;
  const getPhoneNumber = document.getElementById("phoneNumber")
  const sendPhoneNumber = getPhoneNumber.value;
  const getAddress = document.getElementById("address");
  const sendAddress = getAddress.value;
  const countrySelect = document.getElementById("country-select");
  const selectedCountry = countrySelect.value;
  const daySelect = document.getElementById("day-select");
  const daySelected = daySelect.value;
  const monthSelect = document.getElementById("month");
  const selectedMonth = monthSelect.value;
  const birthYear = document.getElementById('birth-year');
  const selectedBirthYear = birthYear.value;
const male = document.getElementById('radioMale');
const female = document.getElementById('radioFemale');
const other = document.getElementById('radioOther');

let selectedGender = null;

if (male.checked) {
  selectedGender = male.value;
} else if (female.checked) {
  selectedGender = female.value;
} else if (other.checked) {
  selectedGender = other.value;
}


console.log(selectedCountry);

// const addressError = validateAddress(sendAddress);

//   if (addressError) {
//     myFunction(addressError)
//   } else {
//     document.getElementById("modal-body1").innerText = "";
//   }

 




    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: sendUsername,
        firstname: sendFirstname,
        lastname:sendLastName,
        email: sendEmail,
        password: sendPassword,
        confirmPassword: sendConfirmPassword,
        phoneNumber: sendPhoneNumber,
        address: sendAddress,
        gender: selectedGender,
        country: selectedCountry,
        day: daySelected,
        month: selectedMonth,
        birthYear: selectedBirthYear
      })
    });

    // const data = await response.json();
    // console.log("Server response:", data);
    
    if (response.ok) {
  const data = await response.json();
  console.log("Success:", data);
  successfullRegistration(data.message)
} else {
  const errorData = await response.json();
  console.error("Error from server:", errorData);
  myFunction(errorData.error);
 
}
  
}


// Initialize dropdown when the DOM is ready
document.addEventListener("DOMContentLoaded", populateCountrySelect);

// Example trigger for sending the data
document.getElementById("registerButton").addEventListener("click", () => {
  sendRegisterDataToBackend("http://localhost:5000/register");

});




function myFunction(errorMessage) {
  // Inject the error message
  document.getElementById("modal-body1").innerText = errorMessage;

  // Show the modal instantly
  const modalElement = document.getElementById("errorModal");
  if (modalElement) {
    const errorModal = new bootstrap.Modal(modalElement);
    errorModal.show();
  } else {
    console.error("Modal element not found.");
  }
}


function successfullRegistration(message) {
  // Inject the error message
  document.getElementById("modal-body2").innerText = message;
  document.getElementById("spinnerBorder").className = "spinner-border";
  document.getElementById("visuallyHidden").className = "visually-hidden";
  // Show the modal instantly
  const modalElement = document.getElementById("successModal");
  if (modalElement) {
    const errorModal = new bootstrap.Modal(modalElement);
    errorModal.show();
  } else {
    console.error("Modal element not found.");
  }

    setTimeout(() => {
    window.location.href = "http://localhost:5000/login"; // change to your target URL
  }, 7000); // 10,000 milliseconds = 10 seconds
}






// function validatePhoneNumber(phoneNumber) {
//   if (!phoneNumber || phoneNumber.trim() === "") {
//     return "Phone number is required.";
//   }
//   return null;
// }

// function validateAddress(address) {
//   if (!address || address.trim() === "") {
//     return "Address is required.";
//   }
//   return null;
// }





// const res = await fetch(baseUrl, { method: "GET" });
// const data = await res.json();

// if (!res.ok) {
//   // Status is not 2xx – handle the error
//   console.error("Server responded with error:", data.error);
//   // Optionally display it in the HTML
//   document.getElementById("error").innerText = data.error;
// } else {
//   // Everything went fine – use data
//   console.log("Success:", data);
// }
