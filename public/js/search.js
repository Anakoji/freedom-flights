    async function getIataCitie(){
        // const jsonData = [
        //   { id: 1, name: "Apple" },
        //   { id: 2, name: "Banana" },
        //   { id: 3, name: "Cherry" },
        //   { id: 4, name: "Date" },
        //   { id: 5, name: "Elderberry" }
        // ];
        let jsonData;
        const cities = await fetch("./json/airports.json");
        const loadedCities = await cities.json();
        let countries = [];    
       
        
        console.log("Promise");
        for(let i = 0; i < loadedCities.length; i++){
            
            let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata
            
            countries.push(citieFinal);
            jsonData = citieFinal;
        }
        console.log(countries);
    const searchInput = document.getElementById('searchInput');
    const dropdownList = document.getElementById('dropdownList');

    // Function to render dropdown items
    function renderDropdownItems(data) {
      dropdownList.innerHTML = ''; // Clear previous items
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.textContent = item;
        div.addEventListener('click', () => {
          searchInput.value = item; // Set selected value
          dropdownList.style.display = 'none'; // Hide dropdown
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
      if (filteredData.length > 0) {
        renderDropdownItems(filteredData);
        dropdownList.style.display = 'block'; // Show dropdown
      } else {
        dropdownList.style.display = 'none'; // Hide dropdown if no match
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!document.getElementById('dropdown').contains(e.target)) {
        dropdownList.style.display = 'none';
      }
    });

    }
   getIataCitie();