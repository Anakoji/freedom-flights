// var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina"];


async function origin(){

  let o = document.getElementById("origin");
  let origins = document.getElementById("origin-autoComplete-list");
  let submitButton =  document.getElementById("submit");
  
  
  function dropDownMenu(){
    origins.style.display = "none";
  }
  
  dropDownMenu()
  
  function disableSubmit(){
  submitButton.disabled = true;
  }
  disableSubmit()
  o.addEventListener("input", flightDestination);
  origins.addEventListener('click', pickItem);
  async function flightDestination({target}){
    let flightInp = target.value;
    origins.innerHTML = ``;
   
  
  
    if (flightInp.length) {
      console.log(flightInp);
      let autoCompleteValues = await autoComplete(flightInp, flightInp.length);
      // console.log(autoCompleteValues);
      origins.style.display = 'block';
      submitButton.disabled = false;
      autoCompleteValues.forEach(value => { addItem(value) });
    }else{
      submitButton.disabled = true;
      origins.style.display='none';
    }
  
  
    console.log("Flight Origin " + flightInp);
  
  }
  
  
   async function autoComplete(data, dataLength){
  
    const cities = await fetch("./json/airports.json");
    const loadedCities = await cities.json();
    let countries = [];    
  
    for(let i = 0; i < loadedCities.length; i++){
        
        let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata
        
        if(loadedCities[i].city && loadedCities[i].country && loadedCities[i].iata){
          countries.push(citieFinal);
  
        }
  
    }
  
   return countries.filter((destCitie) => 
    destCitie.substr(0, dataLength).toUpperCase() == data.toUpperCase())
    
   
  
  }
  
  function addItem(elem){
   let elemList = document.getElementById("origin-autoComplete-list");
   let createDiv = document.createElement("div");
   createDiv.id = "list-div"
   elemList.appendChild(createDiv);
   createDiv.innerHTML += elem;
  createDiv.style.border="2px solid white"
  
  }
  
  function pickItem({ target }) {
    if (target.tagName === 'DIV') {
      o.value = target.textContent;
      origins.innerHTML = ``;
      origins.style.display='none';
    }
  }
  
  }

async function destination(){

let d = document.getElementById("destination");
let destinations = document.getElementById("dest-autoComplete-list");
let submitButton =  document.getElementById("submit");


function dropDownMenu(){
  destinations.style.display = "none";
}

dropDownMenu()

function disableSubmit(){
submitButton.disabled = true;
}
disableSubmit()
d.addEventListener("input", flightDestination);
destinations.addEventListener('click', pickItem);
async function flightDestination({target}){
  let flightInp = target.value;
  destinations.innerHTML = ``;
 


  if (flightInp.length) {
    console.log(flightInp);
    let autoCompleteValues = await autoComplete(flightInp, flightInp.length);
    // console.log(autoCompleteValues);
    destinations.style.display = 'block';
    submitButton.disabled = false;
    autoCompleteValues.forEach(value => { addItem(value) });
  }else{
    submitButton.disabled = true;
    destinations.style.display='none';
  }


  console.log("Flight Destination " + flightInp);

}


 async function autoComplete(data, dataLength){

  const cities = await fetch("./json/airports.json");
  const loadedCities = await cities.json();
  let countries = [];    

  for(let i = 0; i < loadedCities.length; i++){
      
      let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata
      
      if(loadedCities[i].city && loadedCities[i].country && loadedCities[i].iata){
        countries.push(citieFinal);

      }

  }

 return countries.filter((destCitie) => 
  destCitie.substr(0, dataLength).toUpperCase() == data.toUpperCase())
  
 

}

function addItem(elem){
 let elemList = document.getElementById("dest-autoComplete-list");
 let createDiv = document.createElement("div");
 createDiv.id = "list-div"
 elemList.appendChild(createDiv);
 createDiv.innerHTML += elem;
createDiv.style.border="2px solid white"

}

function pickItem({ target }) {
  if (target.tagName === 'DIV') {
    d.value = target.textContent;
    destinations.innerHTML = ``;
    destinations.style.display='none';
    console.log("D value: " + d.value);
    getOrigin(d.value)
  }
}

async function getOrigin(gettingOrigin){
  const cities = await fetch("./json/airports.json");
  const loadedCities = await cities.json();
  let countries = [];    

  for(let i = 0; i < loadedCities.length; i++){
      
      let citieFinal = loadedCities[i].city + ", " + loadedCities[i].country + ", " + loadedCities[i].iata
      
      if(loadedCities[i].city && loadedCities[i].country && loadedCities[i].iata){
        countries.push(citieFinal);

      }

  }
  countries.filter(country => {
    if(country == gettingOrigin){
      console.log("Got country!");
    }
  })
}

}
origin();
destination();

// function autoComplete2(){
//     let inputField = document.getElementById('input');
//     let ulField = document.getElementById('suggestions');
//     inputField.addEventListener('input', changeAutoComplete);
//     ulField.addEventListener('click', selectItem);
  
//     function changeAutoComplete({ target }) {
//       let data = target.value;
//       console.log(data);
//       ulField.innerHTML = ``;
//       if (data.length) {
//         let autoCompleteValues = autoComplete(data, data.length);
//         autoCompleteValues.forEach(value => { addItem(value); });
//       }
//     }
  
//     function autoComplete(inputValue, dataLength) {
//       let destination =["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina"];
      
//       return destination.filter(
//         (value) => value.substr(0, dataLength).toUpperCase() == inputValue.toUpperCase());
//     }
  
//     function addItem(value) {
//       ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`;
//     }
  
//     function selectItem({ target }) {
//       if (target.tagName === 'LI') {
//         inputField.value = target.textContent;
//         ulField.innerHTML = ``;
//       }
//     }
// }
// autoComplete2();


    // let dest = e.target.value;
    // let valueTarget = [];
    // let getListItems = document.getElementById("autoComplete-list");
    // getResults(dest)
    // for(let x = 0;  x < countries.length; x++){
    //     if(countries[x].substr(0, dest.length).toUpperCase() == dest.toUpperCase()){
            // console.log("Countries substr: "+countries[x].substr(0, dest.length));
            // console.log("dest substr: "+dest.toUpperCase());
            // let getListDiv = document.createElement("div");
            
            // getListDiv.id = "getListDiv"; 
            // getListDiv.setAttribute("class" , "autoComplete-list");

            // document.getElementById("autoComplete-list").appendChild(getListDiv);
            // getListDiv.innerHTML += countries[x];
            
            // document.getElementsByClassName("autoComplete-list")
                
                
                
                // let getList = document.getElementById("autoComplete-list");
                
                
               
        //     }else{
          
        // }
  