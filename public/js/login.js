async function userLogin() {
  let userName = document.getElementById("userName");
  let passWord = document.getElementById("passWord");
  let loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", async () => {
    console.log("You username is : " + userName.value);
  });

  loginButton.addEventListener("click", async () => {
    const baseUrl = "http://localhost:5000/login";

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName.value,
        password: passWord.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      loginSuccessful(data.message);
    } else {
      const errorData = await response.json();
      console.error("Error from server:", errorData);
      loginFailed(errorData.error);
    }
  });

  function loginSuccessful(errorMessage) {
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

   function loginFailed(errorMessage) {
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
}

userLogin();
