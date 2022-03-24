let showBio = false


 document.addEventListener("DOMContentLoaded", () => {
    function initialGet() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'f43401e00bmsh53c16209076bc5bp10bb73jsn9e36d146b2a1'
        }
    };
    
    fetch('https://online-movie-database.p.rapidapi.com/actors/list-most-popular-celebs?homeCountry=US&currentCountry=US&purchaseCountry=US', options)
        .then(response => response.json())
        .then(response => getActorBio(response))
        .catch(err => console.error(err));
   

    

    function pickRandom(array) {
        let random = Math.floor(Math.random() * 100)
        return array[random].slice(6)
    }

       
    function getActorBio (topHundredArray) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
            'X-RapidAPI-Key': 'f43401e00bmsh53c16209076bc5bp10bb73jsn9e36d146b2a1'
        }
    };
        
    fetch(`https://online-movie-database.p.rapidapi.com/actors/get-bio?nconst=${pickRandom(topHundredArray)}`, options)
        .then(response => response.json())
        .then(response => copyObj(response))
        .catch(err => console.error(err));
    }

    
// let testObj = {
//     name: 'Ben Affleck',
//     image: {
//         height: 1904,
//         id: 'name and numbers',
//         url: 'https://m.media-amazon.com/images/M/MV5BMzczNzNiMDAtMmUzZS00MTkwLWIwOTYtNmYyNjg3MTVkNThhXkEyXkFqcGdeQXVyMjA4MjI5MTA@._V1_UY1200_CR135,0,630,1200_AL_.jpg'
//     },
//     birthDate: '1972-08-15',
//     miniBios: [
//         {author: 'name',
//         id: 'name and numbers',
//         language: 'en',
//         text: 'American Actor and filmmaker'
//     }]
// }

    let newObjArray = []


    function copyObj (obj) {
        newObjArray.push(obj)
        renderActor(newObjArray[0])
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
//copyObj(testObj)

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

        if (guess === getAge(newObjArray[0])) {
            answer.innerText = `That's right! ${newObjArray[0].name} is ${guess}`
        }
        else if(guess > getAge(newObjArray[0])) {
            answer.innerText = `Wrong, ${newObjArray[0].name} is younger than ${guess}.`
        }
        else if(guess < getAge(newObjArray[0])) {
            answer.innerText = `Nope, ${newObjArray[0].name} is older than ${guess}.`
        }
        guessContainer.appendChild(answer)

    }

    function handleBioClick(e) {
   
        let bioDiv = document.querySelector('#bioDiv')

        showBio = !showBio
   
        if (showBio) {
            bioDiv.innerHTML = " "
        
            bioDiv.innerHTML = `
            <h5>${newObjArray[0].miniBios[0].text}</h5>
            <p>(${newObjArray[0].miniBios[0].author})
            `

            e.target.innerText = "Hide Bio"

        } else {
            document.querySelector('#bioDiv').innerHTML = " "
            
            e.target.innerText = "Show Bio"
        }
    }
    
    let nextBtn = document.querySelector("#next")
    nextBtn.addEventListener('click', () => {
        let container = document.querySelector('#container');
        container.innerHTML = " "
        
    })
}
initialGet()
})