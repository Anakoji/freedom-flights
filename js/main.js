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