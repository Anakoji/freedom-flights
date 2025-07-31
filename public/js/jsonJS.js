

async function getHtmlJson(){
    const response = await fetch("../json/flights.json");
    const html = await response.json();

    let flightCarrierCode;
   
    let flightCurrency;
    let flightBasePrice;
    let flightGrandTotal;
    let flightPriceDiv2 = document.createElement("div");
    let advertDiv = document.createElement("div");
    let flightDataDiv1 = document.createElement("div");
    
    flightDataDiv1.id = "flightDataDiv"
    document.getElementById("data").appendChild(flightDataDiv1)
    
    
    
    
    
    
    advertDiv.id="advertisment-div";
    
    for(let i = 0 ; i < 10; i++){
        let flightListingBox = document.createElement("div");
        let flight_id_p_tag = document.createElement("p");
        let ticketingDate = document.createElement("p");
        let numberOfSeats = document.createElement("p");
        let flightDurration = document.createElement("p");
        let flightDepartureTitle = document.createElement("h2");
        let flightArrivalTitle = document.createElement("h2");
        let flightTitleDiv = document.createElement("div");
        let flightTitleDepartureSpan = document.createElement("span");
        let flightTitleArrivalSpan = document.createElement("span");
        let payButton = document.createElement("button");
        let payButtonSpan = document.createElement("span");
        let priceTag = document.createElement("p");
      
        let flightDeparture;
        let flightDepartureAt;
        let flightArrival;
        let flightArrivalAt;
        priceTag.id="price-tag-" + i;
       
        payButtonSpan.id="payButton-span-" + i;
        flightTitleDepartureSpan.id = "flight-title-departure-span-" + i;
        flightTitleArrivalSpan.id = "flight-title-arrival-span-" + i;
        flightTitleDiv.id = "flight-listing-title-" + i
        flightListingBox.id="flight-listing-" + i 
        
        document.getElementById("flightDataDiv").appendChild(flightListingBox)
        
  
        
        document.getElementById("flight-listing-" + i).appendChild(flight_id_p_tag);
        document.getElementById("flight-listing-" + i).appendChild(ticketingDate);
        document.getElementById("flight-listing-" + i).appendChild(numberOfSeats);
        document.getElementById("flight-listing-" + i).appendChild(flightDurration);
        document.getElementById("flight-listing-" + i).appendChild(flightTitleDiv);
        document.getElementById("flight-listing-" + i).appendChild(priceTag);
        document.getElementById("flight-listing-title-" + i).appendChild(flightTitleDepartureSpan);
        document.getElementById("flight-listing-title-" + i).appendChild(flightTitleArrivalSpan);
        document.getElementById("flight-title-departure-span-" + i).appendChild(flightDepartureTitle);
        document.getElementById("flight-title-arrival-span-" + i).appendChild(flightArrivalTitle);
        
        document.getElementById("flight-listing-" + i).appendChild(payButtonSpan); 

        document.getElementById("flight-title-departure-span-" + i).style.float ="left"
        document.getElementById("flight-title-arrival-span-" + i).style.float ="right"
        document.getElementById("flight-title-departure-span-" + i).style.textDecoration ="underline"
        document.getElementById("flight-title-arrival-span-" + i).style.textDecoration ="underline"
        document.getElementById("flight-title-arrival-span-" + i).style.position = "relative"
        document.getElementById("flight-title-departure-span-" + i).style.position = "relative"
        document.getElementById("flight-title-arrival-span-" + i).style.right = "100px"
        document.getElementById("flight-title-departure-span-" + i).style.left = "100px"
        
        
        flight_id_p_tag.innerText="Flight ID: " +JSON.stringify(html[i][0].flight_ID, null, 4 );
        ticketingDate.innerText = "Last Ticketing Date: " +JSON.stringify(html[i][1].last_Ticketing_Date, null, 4 );
        numberOfSeats.innerText = "Number of Seats Available: " +JSON.stringify(html[i][3].number_of_Seats_avaialable, null, 4 );
        flightDurration.innerText = "Flight Durration: " +JSON.stringify(html[i][4].duration, null, 4 );
        flightDepartureTitle.innerText = "Flight Departure";
        flightArrivalTitle.innerText = "Flight Arrival";
        priceTag.innerText = "Price: " + JSON.stringify(html[i][12].grand_Total, null, 4 ).slice(1).slice(0,0-1) + " " +
        JSON.stringify(html[i][11].currency, null, 4 ).slice(1).slice(0,0-1)
        payButton.innerText = "Pay Now!"
        document.getElementById("payButton-span-" + i).appendChild(payButton);
        
        for(let z = 0; z < html[i][5].departure.length; z++){
            let flightResultDepartureSpan = document.createElement("span");
            let flightResultDepartureAtSpan = document.createElement("span");
            let flightResultArrivalSpan = document.createElement("span");
            let flightResultArrivalAtSpan = document.createElement("span");
          
            flightResultDepartureSpan.id = "flight-dep-result-" + z;
            flightResultArrivalSpan.id = "flight-ariv-result-" + z;
            flightDeparture = JSON.stringify(html[i][5].departure[z], null, 4 ) + ("\n");
            flightArrival = JSON.stringify(html[i][6].arrival[z], null, 4 ) + ("\n");
            flightDepartureAt=JSON.stringify(html[i][9].departure_at[z], null, 4 ) + ("\n");
            flightArrivalAt=JSON.stringify(html[i][10].arrival_at[z], null, 4 ) + ("\n");
            document.getElementById("flight-title-departure-span-" + i).appendChild(flightResultDepartureSpan);
            document.getElementById("flight-title-departure-span-" + i).appendChild(flightResultDepartureAtSpan);
            document.getElementById("flight-title-arrival-span-" + i).appendChild(flightResultArrivalSpan);
            document.getElementById("flight-title-arrival-span-" + i).appendChild(flightResultArrivalAtSpan);
            
            flightResultDepartureSpan.innerText =flightDeparture; 
            flightResultDepartureAtSpan.innerText=flightDepartureAt
            flightResultArrivalSpan.innerText = flightArrival;
            flightResultArrivalAtSpan.innerText = flightArrivalAt;
            flightResultDepartureSpan.style.textDecoration = "none"
            
        }
     


        document.getElementById("payButton-span-" + i).style.position="relative";
        document.getElementById("payButton-span-" + i).style.top="130px";
        document.getElementById("price-tag-" + i).style.position="relative";
        document.getElementById("price-tag-" + i).style.top="130px";
        
        
        
        
        
        
        document.getElementById("flight-listing-" + i).style.border="5px solid black"
        document.getElementById("flight-listing-" + i).style.width="700px"

        if(html[i][5].departure.length > 3){
            document.getElementById("flight-listing-" + i).style.height="450px"
        }else{
            document.getElementById("flight-listing-" + i).style.height="350px"
        }


        flightListingBox.insertAdjacentHTML("afterend", "<br>")
        flightListingBox.insertAdjacentHTML("afterend", "<br>")
        flightListingBox.insertAdjacentHTML("afterend", "<br>")
        flightTitleDiv.insertAdjacentHTML("afterend", "<br>")
      





    }
    
// console.log(html[1]);


        // console.log(html);
    //     for(i = 0; i < 5; i++){
    //         let flightDataDiv = document.createElement("div");
    //         let flightCurrencyDiv = document.createElement("div");
            
    //         let grandTotalPriceDiv = document.createElement("div");
            
    //         let flightDepartureSpan = document.createElement("span");
    //         let flightArrivalSpan = document.createElement("span");

            

    //         let payButton = document.createElement("button");

    //         flightDataDiv.id = `flight-Data-Flight-ID-number-` + i;
          
            
    //             flightDataDiv.style.border = '5px solid black'
    //             document.getElementById("data").style.position = "relative";
    //             document.getElementById("data").style.top = "25%";
    //             document.getElementById("data").style.left = "20%";
    //             flightDepartureSpan.style.float ='left';
    //             flightArrivalSpan.style.position ='relative';
               
    //             flightArrivalSpan.style.left ='50px';
                
    //             flightDataDiv.style.width = "700px"
                
    //             flightDataDiv.style.color = "white"
    //             flightDataDiv.style.fontWeight = "bold"
            
            
    //         document.getElementById("data").appendChild(flightDataDiv); 
           
    //         document.getElementById("data").style.float = "left"
    //         flightDataDiv.style.background = "radial-gradient(666px at 0.4% 48%, rgb(202, 204, 227) 0%, rgb(89, 89, 99) 97.5%)";
            
    //         flightDataDiv.insertAdjacentElement('afterbegin', flightArrivalSpan)
    //         flightDataDiv.insertAdjacentElement('afterbegin', flightDepartureSpan)
    //         flightDataDiv.insertAdjacentElement('beforeend', payButton)
           

    //         document.getElementById(`flight-Data-Flight-ID-number-` + i).insertAdjacentHTML("afterend","<br>")
    //         for(n = 0; n < html[i].itineraries.length; n++){
    //             for(k = 0 ; k < html[i].itineraries[n].segments.length; k++){
                    
    //                 flightArrival = flightArrivalSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].arrival.iataCode, null, 4).slice(1).slice(0,0-1)+("\n")+"_______>   "+"Arrival: "
    //                 flightArrivalAt = flightArrivalSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].arrival.at, null, 4).slice(1).slice(0,0-1)+("\n")
    //                 flightDeparture = flightDepartureSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].departure.iataCode, null, 4).slice(1).slice(0,0-1)+("\n")+"Departure: " 
    //                 flightDepartureAt = flightDepartureSpan.innerText += JSON.stringify(html[i].itineraries[n].segments[k].departure.at, null, 4).slice(1).slice(0,0-1)+"   <_______"+("\n")
                  
                    

                 
    //             }
                
    //         }
    //         flightCurrency = flightCurrencyDiv.innerText += JSON.stringify(html[i].price.currency, null, 4).slice(1).slice(0,0-1)
            
        
    //         flightGrandTotal = grandTotalPriceDiv.innerText += JSON.stringify(html[i].price.grandTotal, null, 4).slice(1).slice(0,0-1)
           
    //         payButton.innerHTML = flightGrandTotal + " "+flightCurrency + "\n" + "Pay now!" ;
    //     }
    
    //     document.getElementById("data").insertAdjacentElement("afterbegin",advertDiv);

       
       
    //     document.getElementById("data").innerHTML += JSON.stringify(html[0], null, 4)
        
    //     console.log(flightArrival+ flightArrivalAt);
    //     // console.log(flightDeparture.toString + "Flight departure length");
    //     for(n = 0; n < 5; n++){

    //     }

    //     // html.forEach((flight) =>{
    //         // const flightResultId = document.getElementById('data').innerText += JSON.stringify(flight);
    //     // })
        
    //     // const flightResult = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[0].segments[0], null, 4) + "\n";
        
    //     // div.innerText = flightResult ;
    //     // div.setAttribute("id", "mystyle")
    //     // document.body.appendChild(div);
    //     // document.getElementById("mystyle").style.backgroundColor = "red";
    //     // document.getElementById("mystyle").style.border = "5px solid black";
        
    //     // const sandwhich = {blt : "Bacon, letuce and tomatoes", chicken:"Swiss Cheese, mustard, Ketchup", ham:"Chedar cheese, Mayo, tomatoe"} 
    //     // console.log("Sandwhich length: " + sandwhich.length );
    //     // const propOwn = Object.getOwnPropertyNames(sandwhich);
    //     // console.log("Sandwhich Length: "+ propOwn.length);
       
    //     //     console.log(sandwhich.length + "Sandwhich length:");
    //     //     for(var key in sandwhich){

    //     //         const num = document.getElementById("numberation").innerHTML+= `<div>` + JSON.stringify(key + ": "+sandwhich[key], null, 4) + `</div>` + "\n"
    //     //     }


    //     html.forEach((flight) =>{
    //         // const flightResultId = document.getElementById('data').innerText += JSON.stringify(flight.id, null, 4) + "\n";


    //         // const flightResultPricecurrency = document.getElementById('data').innerText += JSON.stringify(flight.price.currency, null, 4) + "\n";
            
    //         // const flightResultPrice = document.getElementById('data').innerText += JSON.stringify(flight.price.grandTotal, null, 4) + "\n";
    //         //     console.log(flight.id);

    //         //     const flightResult = document.getElementById('data').innerHTML +=`<div class="mystyle">`+ "\n"+ JSON.stringify(flight.itineraries, null, 4) + "\n"+`</div>`+ "\n";
                    
            
    //     })
        
    //     html.filter((flightData,flightId) =>{
    //         // if(flightId < 1){


    //             // document.getElementById('data').innerHTML += JSON.stringify(flightData, null, 4) + flightId;

    //             // console.log("itinaries length: " + flightData.itineraries.length);
    //             // document.getElementById('data').innerHTML += JSON.stringify(flightData.itineraries, null, 4) + flightId;


    //         // }
    //         // let border = document.getElementById('data').style.border="thick solid #0000FF"
    //         // if(flightId <= 2){
    //         //     for(let i = 0; i < flightData.itineraries.length; i++){
                   

    //         //         document.getElementById('data').innerHTML += JSON.stringify(flightData.itineraries[i].segments, null, 4) + flightId ;
    //         //     }
    //         // }
    //     });

    // //     for(let k = 0; k < 5; k++){
            
    // //         const flightResultId = JSON.stringify(html[k].id, null, 4) + "\n";
            
    // //         const flightResultPricecurrency = JSON.stringify(html[k].price.currency, null, 4) + "\n";
            
    // //         const flightResultPrice = JSON.stringify(html[k].price.grandTotal , null, 4)  + "\n";

    // //         const flightPriceBorder = document.getElementById('data').innerHTML += `<div class="flightPriceBorder flightPriceBackground flightPriceFont">` + flightResultId + flightResultPricecurrency +flightResultPrice +`</div>`
            
            
    // //         for(let i = 0; i < html[k].itineraries.length; i++){
    // //             for(let j = 0; j < html[k].itineraries[i].segments.length; j++){
                    
                
    // //                 const flightResult = document.getElementById('data').innerHTML +=`<div class="mystyle flightListingBackground">`+ "\n"+ JSON.stringify(html[k].itineraries[i].segments[j], null, 4) + "\n"+`</div>`+ "\n";
                   
                   
    // //                 console.log(html[k].itineraries[i].segments.length);
    // //                 // document.getElementsByClassName("mystyle")[0].style.border = "5px solid black";
                  
    // //             }
    // //         }
            
            
            
           
    // // }
    // // const div = document.createElement("div");
    // // div.innerText = flightResult ;
    // // div.setAttribute("id", "mystyle");
    // // div.classList.add("mystyle");
    // // document.body.appendChild(div);

    //     //     for(let k = 0 ; k < html[i].itineraries.length; k++){
    // // for(let n = 0; n < html[i].itineraries[k].segments.length; n++ ){
    //         // console.log(i);
    //                 // const flightResult2 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[0].segments[1], null, 4) + "\n";
    //                 // const flightResult3 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[1].segments[0], null, 4) + "\n";
    //                 // const flightResult4 = document.getElementById('data').innerText += JSON.stringify(html[1].itineraries[1].segments[1], null, 4) + "\n";
    //                 // console.log(i);
    //                 // const div = document.createElement("div");
    //                 // div.innerText = flightResult ;
    //         // div.setAttribute("id", "mystyle");
    //         // div.classList.add("mystyle");
    //         // document.body.appendChild(div);
    //         // document.getElementsByClassName("mystyle")[i].style.border = "5px solid black";
    //         // document.getElementById("mystyle").style.backgroundColor = "red";
    //         // document.getElementById("mystyle").style.border += "5px solid black";
    //         // console.log(html[i]);
    //     // }
    //     console.log(html.length);

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