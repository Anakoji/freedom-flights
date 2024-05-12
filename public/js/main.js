const modal = document.getElementById('simpleModal');

const modalButton = document.getElementById('modal-Button');

const closeButton = document.getElementsByClassName('closeButton')[0];

modalButton.addEventListener('click', openModal);


closeButton.addEventListener('click', closeModal);

// window.addEventListener('click', clickOutside);


// function clickOutside(e){
//     if(e.target == modal){
//         modal.style.display = 'none';
//     }
// }

function closeModal(){
    modal.style.display = 'none';
}

function openModal(){
    modal.style.display = 'block';
}

function checking(){
    if(document.getElementById('flexSwitchCheckDefault').checked){
      console.log('Round Trip');
      document.getElementById('returnDate').style.display = 'block';
    }else{
      console.log('No Round trip');
      document.getElementById('returnDate').style.display = 'none';
    }
  }
  function validateOriginInput(e){
    
    // document.getElementById('flightOrigin').value = "YYZ";
    const flightOrigin = e.target.value;
    console.log(flightOrigin);
    document.getElementById("modal-Button").disabled = true;
    if(flightOrigin === '' ){
      document.getElementById("modal-Button").disabled = true;
      
    }else{
      document.getElementById("modal-Button").disabled = false;
    }
  }
  
  function originLoad(){
    document.getElementById("modal-Button").disabled = true;
  }
  
  document.getElementById("flightOrigin").addEventListener("load", originLoad);
  
  document.getElementById("flightOrigin").addEventListener('input', validateOriginInput);
  
  checking();