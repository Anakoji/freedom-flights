// Sample JSON data
const jsonData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
  { id: 6, name: "Item 6" },
];

let currentIndex = 0;
const itemsPerPage = 2;

function loadItems() {
  const contentDiv = document.getElementById("content");
  const nextItems = jsonData.slice(currentIndex, currentIndex + itemsPerPage);

  nextItems.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.name;
    contentDiv.appendChild(div);
  });

  currentIndex += itemsPerPage;

  // Hide button if all items are loaded
  if (currentIndex >= jsonData.length) {
    document.getElementById("loadMore").style.display = "none";
  }
}

document.getElementById("loadMore").addEventListener("click", loadItems);

// Initial load
loadItems();
