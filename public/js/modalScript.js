// script.js
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.querySelector(".close");

  // Open modal
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

  // Close modal when clicking outside of it
//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
