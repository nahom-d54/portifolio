const hamburger = document.querySelector('#hamburger');
const root = document.querySelector('body')
const handWave = document.querySelector('.wave');
const mobile = document.querySelector('.mobile');
const pjlist = document.querySelector('.projects-grid.stacks') 

hamburger.addEventListener('click',()=> {
    mobile.classList.toggle('mobile-show');
})

const repos = ['unisource','ADDIS_SW_BACKEND', 'JobBoard','FreelanceBot','SantimPay' ]
const baseUrl = 'https://api.github.com/repos/nahom-d54/'




for(let repo of repos){
    fetch(baseUrl+repo, {
        headers: {
            'Authorization': 'token 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'
        }
    })
    .then(r => r.json())
    .then(res => {
        const elm = document.createElement('div')
        elm.classList.add('card')
        let pj = `
                    <img src="/assets/img/logos/${res.language}.png" alt="">
                    <div class="body">
                        <h3>${res.name}</h3>
                        <p>${res.description}</p>
                        <p><strong>Tech Stack </strong>: ${res.language}</p>
                        <div class="preview">
                            <div class="div">
                                <i class="fas fa-link"></i>
                                <a href="#">Link Preview</a>
                            </div>
                            <div>
                                <i class="fab fa-github"></i>
                                <a href="${res.html_url}">view Code</a>
                            </div>
                        </div>
                    </div>
                `
            elm.innerHTML = pj;

            pjlist.appendChild(elm)
        
        
    })
}

// observable api
function callback(entries,observable) {
    entries.forEach(entry => setTimeout(()=>entry.target.classList.toggle('vis'),500))
}
let observer = new IntersectionObserver(callback);

observer.observe(handWave)

