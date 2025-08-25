document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 DOM fully loaded");

  const userName = document.getElementById("userName");
  const passWord = document.getElementById("passWord");
  const loginButton = document.getElementById("loginButton");
  const logoutBtn = document.getElementById("loggedInOrOut");
  const avatarImg = document.getElementById("userAvatar");
  const avatarContainer = document.getElementById("avatarContainer");
  const usernameDisplay = document.querySelector(".username");

  // 🧠 Login logic
  loginButton?.addEventListener("click", async () => {
    console.log("You username is : " + userName.value);

    const baseUrl = "http://localhost:5000/login";
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: userName.value,
        password: passWord.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);

      const formattedUsername = capitalizeUnderscoreName(data.username);
      localStorage.setItem("loggedInUser", formattedUsername);
      usernameDisplay.textContent = formattedUsername;

      const avatarPath = data.avatar?.trim() ? data.avatar : "./images/user.png";
      avatarImg.src = avatarPath;
      localStorage.setItem("userAvatar", avatarPath);
      avatarContainer.style.display = "inline-block";

      updateLoginStatus();
      loginSuccessful(data.message);
    } else {
      const errorData = await response.json();
      console.error("Error from server:", errorData);
      loginFailed(errorData.error);
    }
  });

document.getElementById("loggedInOrOut").addEventListener("click", async () => {
  const isLoggedIn = localStorage.getItem("loggedInUser") !== null;

  if (!isLoggedIn) {
    alert("Please log in.");
    return;
  }

  try {
    // 🔥 Clear localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userAvatar");

    // 👇 Clear auth cookie on backend
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout request failed");
    }

    console.log("🍪 Auth cookie cleared.");

    // 🧼 Reset UI
    document.querySelector(".username").textContent = "";
    document.getElementById("userAvatar").src = "";
    document.getElementById("avatarContainer").style.display = "none";
    document.getElementById("loggedInOrOut").textContent = "Log In";
    document.getElementById("userDashboard").style.display = "none";

    alert("You have been logged out.");
    updateLoginStatus();
  } catch (err) {
    console.error("Failed to log out:", err);
    alert("Logout failed. Please try again.");
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

console.log("Cookies after logout:", document.cookie);