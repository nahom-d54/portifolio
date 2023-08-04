const hamburger = document.querySelector('#hamburger');
const root = document.querySelector('body')
const handWave = document.querySelector('.wave');
const mobile = document.querySelector('.mobile'); 
hamburger.addEventListener('click',()=> {
    mobile.classList.toggle('mobile-show');
})

// observable api
function callback(entries,observable) {
    entries.forEach(entry => setTimeout(()=>entry.target.classList.toggle('vis'),500))
}
let observer = new IntersectionObserver(callback);

observer.observe(handWave)
