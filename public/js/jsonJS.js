

async function getHtmlJson(){
    const response = await fetch("../json/flights.json");
    const html = await response.json();
    let flightDeparture;
    let flightDepartureAt;
    let flightArrival;
    let flightArrivalAt;
    let flightCarrierCode;
    let flightDurration;
    let flightCurrency;
    let flightBasePrice;
    let flightGrandTotal;
    let flightDataDiv1 = document.createElement("div");
    let flightPriceDiv2 = document.createElement("div");
    let advertDiv = document.createElement("div");
    advertDiv.id="advertisment-div";
    document.getElementById("data").appendChild(flightDataDiv1)
    // const flightData = JSON.stringify(html, null, 4);
console.log(html[1].itineraries.length);
        // console.log(html);
        for(i = 0; i < 5; i++){
            let flightDataDiv = document.createElement("div");
            let flightCurrencyDiv = document.createElement("div");
            
            let grandTotalPriceDiv = document.createElement("div");
            
            let flightDepartureSpan = document.createElement("span");
            let flightArrivalSpan = document.createElement("span");

            

            let payButton = document.createElement("button");

            flightDataDiv.id = `flight-Data-Flight-ID-number-` + i;
          
            
          
            // for(n = 0; n < html[i].itineraries.length; n++){

            //     flightDataDiv.innerText += JSON.stringify(html[i].itineraries[n].segments[0], null, 4)
                
            //     }
                flightDataDiv.style.border = '5px solid black'
                document.getElementById("data").style.position = "relative";
                document.getElementById("data").style.top = "25%";
                document.getElementById("data").style.left = "20%";
                flightDepartureSpan.style.float ='left';
                flightArrivalSpan.style.position ='relative';
                // flightArrivalDiv.style.display ='none';
                flightArrivalSpan.style.left ='50px';
                
                flightDataDiv.style.width = "700px"
                
                flightDataDiv.style.color = "white"
                flightDataDiv.style.fontWeight = "bold"
            
            
            document.getElementById("data").appendChild(flightDataDiv); 
           
            document.getElementById("data").style.float = "left"
            flightDataDiv.style.background = "radial-gradient(666px at 0.4% 48%, rgb(202, 204, 227) 0%, rgb(89, 89, 99) 97.5%)";
            // flightDataDiv.insertAdjacentElement('afterbegin', flightCurrencyDiv)
         
            // flightDataDiv.insertAdjacentElement('afterbegin', grandTotalPriceDiv)
            flightDataDiv.insertAdjacentElement('afterbegin', flightArrivalSpan)
            flightDataDiv.insertAdjacentElement('afterbegin', flightDepartureSpan)
            flightDataDiv.insertAdjacentElement('beforeend', payButton)
           

            document.getElementById(`flight-Data-Flight-ID-number-` + i).insertAdjacentHTML("afterend","<br>")
            for(n = 0; n < html[i].itineraries.length; n++){
                for(k = 0 ; k < html[i].itineraries[n].segments.length; k++){
                    
                    flightArrival = flightArrivalSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].arrival.iataCode, null, 4).slice(1).slice(0,0-1)+("\n")+"_______>   "+"Arrival: "
                    flightArrivalAt = flightArrivalSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].arrival.at, null, 4).slice(1).slice(0,0-1)+("\n")
                    flightDeparture = flightDepartureSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].departure.iataCode, null, 4).slice(1).slice(0,0-1)+("\n")+"Departure: " 
                    flightDepartureAt = flightDepartureSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].departure.at, null, 4).slice(1).slice(0,0-1)+"   <_______"+("\n")
                  
                    

                 
                }
                
            }
            flightCurrency = flightCurrencyDiv.innerText += JSON.stringify(html[i].price.currency, null, 4).slice(1).slice(0,0-1)
            
        
            flightGrandTotal = grandTotalPriceDiv.innerText += JSON.stringify(html[i].price.grandTotal, null, 4).slice(1).slice(0,0-1)
           
            payButton.innerHTML = flightGrandTotal + " "+flightCurrency + "\n" + "Pay now!" ;
        }
    
        document.getElementById("data").insertAdjacentElement("afterbegin",advertDiv);

       
       
        document.getElementById("data").innerHTML += JSON.stringify(html[0], null, 4)
        
        console.log(flightArrival+ flightArrivalAt);
        // console.log(flightDeparture.toString + "Flight departure length");
        for(n = 0; n < 5; n++){

        }

        // html.forEach((flight) =>{
            // const flightResultId = document.getElementById('data').innerText += JSON.stringify(flight);
        // })
        
        // const flightResult = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[0].segments[0], null, 4) + "\n";
        
        // div.innerText = flightResult ;
        // div.setAttribute("id", "mystyle")
        // document.body.appendChild(div);
        // document.getElementById("mystyle").style.backgroundColor = "red";
        // document.getElementById("mystyle").style.border = "5px solid black";
        
        // const sandwhich = {blt : "Bacon, letuce and tomatoes", chicken:"Swiss Cheese, mustard, Ketchup", ham:"Chedar cheese, Mayo, tomatoe"} 
        // console.log("Sandwhich length: " + sandwhich.length );
        // const propOwn = Object.getOwnPropertyNames(sandwhich);
        // console.log("Sandwhich Length: "+ propOwn.length);
       
        //     console.log(sandwhich.length + "Sandwhich length:");
        //     for(var key in sandwhich){

        //         const num = document.getElementById("numberation").innerHTML+= `<div>` + JSON.stringify(key + ": "+sandwhich[key], null, 4) + `</div>` + "\n"
        //     }


        html.forEach((flight) =>{
            // const flightResultId = document.getElementById('data').innerText += JSON.stringify(flight.id, null, 4) + "\n";


            // const flightResultPricecurrency = document.getElementById('data').innerText += JSON.stringify(flight.price.currency, null, 4) + "\n";
            
            // const flightResultPrice = document.getElementById('data').innerText += JSON.stringify(flight.price.grandTotal, null, 4) + "\n";
            //     console.log(flight.id);

            //     const flightResult = document.getElementById('data').innerHTML +=`<div class="mystyle">`+ "\n"+ JSON.stringify(flight.itineraries, null, 4) + "\n"+`</div>`+ "\n";
                    
            
        })
        
        html.filter((flightData,flightId) =>{
            // if(flightId < 1){


                // document.getElementById('data').innerHTML += JSON.stringify(flightData, null, 4) + flightId;

                // console.log("itinaries length: " + flightData.itineraries.length);
                // document.getElementById('data').innerHTML += JSON.stringify(flightData.itineraries, null, 4) + flightId;


            // }
            // let border = document.getElementById('data').style.border="thick solid #0000FF"
            // if(flightId <= 2){
            //     for(let i = 0; i < flightData.itineraries.length; i++){
                   

            //         document.getElementById('data').innerHTML += JSON.stringify(flightData.itineraries[i].segments, null, 4) + flightId ;
            //     }
            // }
        });

    //     for(let k = 0; k < 5; k++){
            
    //         const flightResultId = JSON.stringify(html[k].id, null, 4) + "\n";
            
    //         const flightResultPricecurrency = JSON.stringify(html[k].price.currency, null, 4) + "\n";
            
    //         const flightResultPrice = JSON.stringify(html[k].price.grandTotal , null, 4)  + "\n";

    //         const flightPriceBorder = document.getElementById('data').innerHTML += `<div class="flightPriceBorder flightPriceBackground flightPriceFont">` + flightResultId + flightResultPricecurrency +flightResultPrice +`</div>`
            
            
    //         for(let i = 0; i < html[k].itineraries.length; i++){
    //             for(let j = 0; j < html[k].itineraries[i].segments.length; j++){
                    
                
    //                 const flightResult = document.getElementById('data').innerHTML +=`<div class="mystyle flightListingBackground">`+ "\n"+ JSON.stringify(html[k].itineraries[i].segments[j], null, 4) + "\n"+`</div>`+ "\n";
                   
                   
    //                 console.log(html[k].itineraries[i].segments.length);
    //                 // document.getElementsByClassName("mystyle")[0].style.border = "5px solid black";
                  
    //             }
    //         }
            
            
            
           
    // }
    // const div = document.createElement("div");
    // div.innerText = flightResult ;
    // div.setAttribute("id", "mystyle");
    // div.classList.add("mystyle");
    // document.body.appendChild(div);

        //     for(let k = 0 ; k < html[i].itineraries.length; k++){
    // for(let n = 0; n < html[i].itineraries[k].segments.length; n++ ){
            // console.log(i);
                    // const flightResult2 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[0].segments[1], null, 4) + "\n";
                    // const flightResult3 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[1].segments[0], null, 4) + "\n";
                    // const flightResult4 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[1].segments[1], null, 4) + "\n";
                    // console.log(i);
                    // const div = document.createElement("div");
                    // div.innerText = flightResult ;
            // div.setAttribute("id", "mystyle");
            // div.classList.add("mystyle");
            // document.body.appendChild(div);
            // document.getElementsByClassName("mystyle")[i].style.border = "5px solid black";
            // document.getElementById("mystyle").style.backgroundColor = "red";
            // document.getElementById("mystyle").style.border += "5px solid black";
            // console.log(html[i]);
        // }
        console.log(html.length);

        // for(let i = 0; i < 10; i++){
        //         console.log(i);
        //         const div = document.createElement("div");
        //         div.classList.add("mystyle");
        //         div.innerText += document.getElementById("departure").innerText = i;
        //         document.body.appendChild(div);
        //         document.getElementsByClassName("mystyle")[i].style.border = "5px solid black";
        // }
// html.forEach(element => {
//         for(let i = 0; i < element.itineraries.length; i++){

//                 document.getElementById('data').innerText += JSON.stringify(element.itineraries[i], null, 4);
//         }
//     console.log(element.itineraries[0]);
// });
        // console.log(html[10].itineraries.length);
        // document.getElementById('data').innerText += JSON.stringify(html[10].itineraries[0].segments[0], null, 4);

        
}
     


getHtmlJson();