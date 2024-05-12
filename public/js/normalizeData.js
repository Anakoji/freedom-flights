const file = './iata.txt';

fetch(file)
.then(x =>{
    console.log(x);
    return x.text();
})
.then(y =>
    { 
        let countiesIata = [...y.split("\n")];
        // document.getElementById('data').innerText = countiesIata
        
       for(let i = 0; i < countiesIata.length ; i++){
            console.log(countiesIata[i]);
            countiesIata[i].replace(/,/g, "");
            document.getElementById('data').innerText += countiesIata[i];
       } 
    });