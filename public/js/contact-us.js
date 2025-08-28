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