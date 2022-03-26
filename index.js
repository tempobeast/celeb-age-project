let showBio = false
let topHundred;
let newActorObj;

document.addEventListener("DOMContentLoaded", () => {   

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'f43401e00bmsh53c16209076bc5bp10bb73jsn9e36d146b2a1'
        }
    };
    
    fetch('https://online-movie-database.p.rapidapi.com/actors/list-most-popular-celebs?homeCountry=US&currentCountry=US&purchaseCountry=US', options)
        .then(response => response.json())
        .then(response => topHundred = response)
        .then(topHundred => getActorBio(topHundred))
        .catch(err => console.error(err));
        


    function pickRandom(array) {
        let random = Math.floor(Math.random() * 100)
        return array[random].slice(6)
    }

       
    function getActorBio () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'f43401e00bmsh53c16209076bc5bp10bb73jsn9e36d146b2a1'
        }
    };
        
    fetch(`https://online-movie-database.p.rapidapi.com/actors/get-bio?nconst=${pickRandom(topHundred)}`, options)
        .then(response => response.json())
        .then(response => newActorObj = response)
        .then(newActorObj => renderActor(newActorObj))
        .catch(err => console.error(err));
        
    }

    function renderActor(actorObj) {
        let celebContainer = document.querySelector('#celeb-info')
        
        let actorName = document.createElement('h3')
        let actorImage = document.createElement('img')
        let bioBtn = document.createElement('button')
    
        actorName.innerText = actorObj.name
        actorImage.src = actorObj.image.url
        actorImage.className = 'actorImage'
        bioBtn.innerText = 'Show Bio'
        
        celebContainer.appendChild(actorImage)
        celebContainer.appendChild(actorName)
        celebContainer.appendChild(bioBtn)

        bioBtn.addEventListener('click', handleBioClick)

    }

//returns actors age 0=year, 1=month 2=day
    function getAge(actorObj) {
        let today = new Date().toISOString().slice(0, 10).split("-").map(nums => parseInt(nums))
        let actorBDay = actorObj.birthDate.split("-").map(nums => parseInt(nums));
        if (today[1] > actorBDay[1]) {
            return today[0] - actorBDay[0]
        } else if (today[1] === actorBDay[1] && today[2] >= actorBDay[2]) {
            return today[0] - actorBDay[0]
        } else if (today[1] === actorBDay[1] && today[2] < actorBDay[2]) {
            return today[0] - actorBDay[0] - 1
        } else if (today[1] < actorBDay[1]) {
            return today[0] - actorBDay[0] - 1
        }
    }


    document.querySelector('#age-form').addEventListener('submit', handleFormSubmit)

    function handleFormSubmit(e) {
        e.preventDefault();
        let guess = parseInt(e.target[0].value);
        let guessContainer = document.querySelector('#guess-container')
        let answer = document.createElement('p')
        answer.innerText = " "

        if (guess === getAge(newActorObj)) {
            answer.innerText = `That's right! ${newActorObj.name} is ${guess}`
        }
        else if(guess > getAge(newActorObj)) {
            answer.innerText = `Wrong, ${newActorObj.name} is younger than ${guess}.`
        }
        else if(guess < getAge(newActorObj)) {
            answer.innerText = `Nope, ${newActorObj.name} is older than ${guess}.`
        }
        
        guessContainer.appendChild(answer)
        e.target[0].value = ' '
    }

    function handleBioClick(e) {
   
        let bioDiv = document.querySelector('#bioDiv')

        showBio = !showBio
   
        if (showBio) {
            bioDiv.innerHTML = " "
        
            bioDiv.innerHTML = `
            <h5>${newActorObj.miniBios[0].text}</h5>
            <p>(${newActorObj.miniBios[0].author})
            `

            e.target.innerText = "Hide Bio"

        } else {
            document.querySelector('#bioDiv').innerHTML = " "
            
            e.target.innerText = "Show Bio"
        }
    }
    
    let nextBtn = document.querySelector("#next")
    nextBtn.addEventListener('click', () => {
        let info = document.querySelector('#celeb-info');
        let bio = document.querySelector('#bioDiv');
        let guess = document.querySelector('#guess-container')
        info.innerHTML = ' '
        bio.innerHTML = ' '
        guess.innerHTML = ' '

        getActorBio(topHundred)    
    })
})