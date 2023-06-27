const hamburger = document.querySelector('#hamburger');
const mobile = document.querySelector('.mobile'); 
hamburger.addEventListener('click',()=> {
    mobile.classList.toggle('mobile-show');
})