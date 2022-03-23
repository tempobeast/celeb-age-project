
//document.addEventListener("DOMContentLoaded", () => {

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


    

        function pickRandom(topHundredArray) {
            let random = Math.floor(Math.random() * 100)
            return topHundredArray[random].slice(6)
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
            .then(response => renderActor(response))
            .catch(err => console.error(err));
    }




function renderActor(actorObj) {
    let celebContainer = document.querySelector('#celeb-info')

    let actorName = document.createElement('h3')
    let actorImage = document.createElement('img')
    actorName.innerText = actorObj.name
    actorImage.src = actorObj.image.url
    actorImage.className = 'actor-image'

    celebContainer.appendChild(actorName)
    celebContainer.appendChild(actorImage)
}

//})