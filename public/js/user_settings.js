const width = window.innerWidth;
const height = window.innerHeight;

console.log(`Width: ${width}, Height: ${height}`);

function populateCountrySelect() {
  const countrySelect = document.getElementById("country-select");

  fetch('./json/countries_with_dial_code.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(country => {
          const option = document.createElement("option");

          // User only sees the name
          option.textContent = country.name;

          // The value will hold the JSON string with dial_code and code
          option.value = JSON.stringify({
            dial_code: country.dial_code,
            code: country.code
          });

          // Attach visible label if needed for clarity
          option.setAttribute("data-name", country.name);

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

document.addEventListener("DOMContentLoaded", function () {
  populateYear();
  populateDaySelect();
});



const contentMap = {
  "Profile": `
  <h4>👤 Profile Form</h4>


  <form>
    <div class="mb-3">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" id="firstName" name="firstName" class="form-control" placeholder="Enter your first name">
    </div>
    <span id="nameError" style="color:red"></span>
     <div class="mb-3">
      <label for="middle_Name" class="form-label">Middle Name - (Optional)</label>
      <input type="text" id="middle_Name" name="middle_Name" class="form-control" placeholder="Enter your Middle Name">
    </div>
    <div class="mb-3">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" id="lastName" name="lastName" class="form-control" placeholder="Enter your last name">
    </div>
    <span id="errLastName" style="color:red"></span>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" id="email" name="email" class="form-control" placeholder="name@example.com">
    </div>
    <span id="emailError" style="color:red;"></span>
      <div class="mb-3">
      <label for="phoneNumber" class="form-label">Phone Number</label>
      <input type="text" id="phoneNumber" name="phoneNumber" class="form-control" placeholder="Phone Number">
    </div>
    <span id="errPhoneNumber" style="color:red;"></span>
    <div class="mb-3">
      <label for="address" class="form-label">Address</label>
      <input type="text" id="address" name="address" class="form-control" placeholder="Address">
    </div>
    <span id="addrError" style="color:red"></span>
    <div class="mb-3">
      <label for="country-select" class="form-label">Country</label>
      <select id="country-select" name="country" class="form-select">
        <option value="" disabled>Select your country</option>
        <!-- JS will populate more options -->
      </select>
    </div>
    <span id="countryErr" style="color:red;"></span>
    <div>
    <label>Gender</label>
    <br>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="gender" id="radioMale" value="Male">
  <label class="form-check-label" for="radioMale">Male</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="gender" id="radioFemale" value="Female">
  <label class="form-check-label" for="radioFemale">Female</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="gender" id="radioOther" value="Other">
  <label class="form-check-label" for="radioOther">Other</label>
</div>
<span id="genError" style="color:red"></span>
<br>
         <div>
              <span>Date of Birth: </span>
              <br />
              <select name="birthDay" id="day-select"></select>
              <select name="birthYear" id="birth-year"></select>
              <select name="month" id="month">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <span id="ageErr" style="color:red"></span>
            <br>
    <div class="mb-3">
  <label for="profileImage" class="form-label">Update Profile Image</label>
  <input type="file" id="profileImage" name="profileImage" accept="image/*" class="form-control">
  <button type="button" class="btn btn-primary mt-2" onclick="uploadProfileImage()">Upload</button>
</div>
<img id="currentImagePreview" src="./images/user.png" alt="Profile Preview" class="img-thumbnail mt-3" width="200">
<br>
<br>
    <button type="submit" class="btn btn-success">Save Profile</button>
  </form>
`,
   "Billing": "💳 View your billing payment options.",
  "Delete Account": "⚠️ Be careful! This will delete your account permanently.",
  
  // Other buttons...
};

document.querySelectorAll('#nav-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-page');
    document.getElementById('content-display').innerHTML = contentMap[selected] || "No content available.";
    
  });

  btn.addEventListener('click', () => {
  const selected = btn.getAttribute('data-page');
  document.getElementById('content-display').innerHTML = contentMap[selected] || "No content available.";

  if (selected === "Profile") {
    populateCountrySelect();
  }
});
// Render the default page on initial load
document.getElementById("content-display").innerHTML = contentMap["Profile"];

// Call the function to populate country select
setTimeout(() => populateCountrySelect(), 0);
});

function uploadProfileImage() {
  const fileInput = document.getElementById('profileImage');
  const preview = document.getElementById('currentImagePreview');

  const file = fileInput.files[0];
  if (!file) {
    alert("Please select an image first.");
    return;
  }

  // Preview the image locally
  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
  };
  reader.readAsDataURL(file);

  // TODO: Add fetch logic to POST image to server here
}

const getProfileBtn = document.getElementById("profile");

getProfileBtn.addEventListener("click", function(){
  populateYear();
  populateDaySelect();
})

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const response = await fetch("/submit-profile", {
  method: "POST",
  credentials: "include", // 👈 Cookie will be sent
  body: formData,
});

  let result = {};
  try {
    result = await response.json();
  } catch {
    // If server didn't send JSON, show a generic error
    return alert("Something went wrong. Please try again.");
  }

  if (!response.ok) {
    // Show only the field that failed (others blank)
    nameError(result.error || "");
    lastNameError(result.lastNameError || "");
    emailError(result.emailError || "");
    phoneNumberError(result.phoneNumValid || ""); // consider renaming server key
    addressError(result.addrError || "");
    countryError(result.countryError || "");
    genderError(result.genderError || "");
    ageError(result.ageError || "");
    return;
  }

  // Success branch
  console.log(result.message || "Profile saved successfully!");
  nameError("");           // clear any previous errors
  lastNameError("");
  emailError("");
  phoneNumberError("");
  addressError("");
  countryError("");
  genderError("");
  ageError("");
});




function nameError(msg){
  const errorMessage = document.getElementById("nameError");
  errorMessage.innerText = msg;
  if(msg === undefined){
    errorMessage.innerText = "";
  }
 
}

function lastNameError(msg){
  const errorMessage = document.getElementById("errLastName");
  errorMessage.innerText = msg;
  if(msg === undefined){
    errorMessage.innerText = "";
  }
 
}

function emailError(msg){
  const errorMessage = document.getElementById("emailError");
  errorMessage.innerText = msg;
  if(msg === undefined){
    errorMessage.innerText = "";
  }
 
}

function phoneNumberError(msg){
  const errorMessage = document.getElementById("errPhoneNumber");

  if(!msg){
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }else{
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  }
}

function addressError(msg){
  const errorMessage = document.getElementById("addrError");

  if(!msg){
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }else{
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  }
}

function countryError(msg){
  const errorMessage = document.getElementById("countryErr");

  if(!msg){
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }else{
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  }
}

function genderError(msg){
  const errorMessage = document.getElementById("genError");

  if(!msg){
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }else{
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  }
}

function ageError(msg){
  const errorMessage = document.getElementById("ageErr");

  if(!msg){
    errorMessage.innerText = "";
    errorMessage.style.display = "none";
  }else{
    errorMessage.innerText = msg;
    errorMessage.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
 
  // ...rest of your avatar and username logic

  console.log("🚀 DOM fully loaded");

  const loginButton = document.getElementById("loginButton");
  const logoutBtn = document.getElementById("loggedInOrOut");
  const avatarImg = document.getElementById("userAvatar");
  const avatarContainer = document.getElementById("avatarContainer");
  const usernameDisplay = document.querySelector(".username");

  const rawUsername = localStorage.getItem("loggedInUser");

  if (rawUsername) {
    const formattedUsername = capitalizeUnderscoreName(rawUsername);
    usernameDisplay.textContent = formattedUsername;

    // ✅ Only show avatar if logged in
    const avatarPath = localStorage.getItem("userAvatar") || "./images/user.png";
    avatarImg.src = avatarPath;
    avatarContainer.style.display = "inline-block";
  } else {
    usernameDisplay.textContent = "";
    avatarImg.src = "";
    avatarContainer.style.display = "none";
  }

  updateLoginStatus();

      
      // Redirect to a new URL
     
  

document.getElementById("loggedInOrOut").addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent default link behavior

  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;

  if (!isLoggedIn) {
    window.location.href = "http://localhost:5000/login";
    return;
  }

  try {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userAvatar");

    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout request failed");

    await removeAuth();

    // Reset UI safely
    const usernameEl = document.querySelector(".username");
    if (usernameEl) usernameEl.textContent = "";

    const avatarEl = document.getElementById("userAvatar");
    if (avatarEl) avatarEl.src = "";

    const avatarContainerEl = document.getElementById("avatarContainer");
    if (avatarContainerEl) avatarContainerEl.style.display = "none";

    const loginStatusEl = document.getElementById("loggedInOrOut");
    if (loginStatusEl) loginStatusEl.textContent = "Login";

    alert("You have been logged out.");

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "http://localhost:5000/login";
    }, 500);

  } catch (err) {
    console.error("Failed to log out:", err);
  }
});

  // 🧠 Load stored data
  const storedUsername = localStorage.getItem("loggedInUser");
  if (storedUsername) usernameDisplay.textContent = storedUsername;

  const storedAvatar = localStorage.getItem("userAvatar");
  if (storedAvatar) {
    avatarImg.src = storedAvatar;
    avatarContainer.style.display = "inline-block";
  }

  updateLoginStatus();
});

// 🔁 Listen for login status changes across tabs
window.addEventListener("storage", (event) => {
  if (event.key === "loggedInUser") updateLoginStatus();
});

//remove cookie


// 🧠 Helper functions
function updateLoginStatus() {
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;
  const statusElement = document.getElementById("loggedInOrOut");

  if (isLoggedIn) {
    console.log("✅ User is logged in:", localStorage.getItem("loggedInUser"));
    statusElement.innerText = "Logout";
  } else {
    console.log("🔒 No user is currently logged in.");
    statusElement.innerText = "Login";
  }
}

function removeAuth(){
  // logout.js
fetch('http://localhost:8000/clearCookie.php', {
  method: 'GET',
  credentials: 'include' // ensures cookies are sent
})
.then(res => res.text())
.then(data => {
  console.log(data); // "Cookie cleared!"
  alert("You have been logged out."); // Now safe to show

})
.catch(err => console.error('Logout failed:', err));
}

function loginSuccessful(message) {
  document.getElementById("modal-body1").innerText = message;
  const modalElement = document.getElementById("errorModal");
  if (modalElement) new bootstrap.Modal(modalElement).show();
  else console.error("Modal element not found.");
}

function loginFailed(errorMessage) {
  document.getElementById("modal-body1").innerText = errorMessage;
  const modalElement = document.getElementById("errorModal");
  if (modalElement) new bootstrap.Modal(modalElement).show();
  else console.error("Modal element not found.");
}

function capitalizeUnderscoreName(name) {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");
}