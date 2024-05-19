const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const input = document.getElementById("input");
const answer = document.getElementById("answer");
const baseUrl = "http://localhost:5000/flightData";

getBtn.addEventListener("click", getInfo)
async function getInfo(e){
    e.preventDefault();
    const res = await fetch(baseUrl,{
        method: "GET"
    });
    const html = await res.json();
    // const data = await res.json();
    // console.log(await res.json());
    // answer.innerText = JSON.stringify(data, null , 4)



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
async function postInfo(){

}
}