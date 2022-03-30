# What's My Age Again?

What's my age again is a JavaScript game where a user guesses the age of a random actor/actress. 
The game pulls from an api of 100 actors that are currently relevant because they star in recently released films or series.


## Features

Each actor image and name is accompanied by an expandable bio section that gives some context to less familiar actors. 

![gif of bio button](https://media.giphy.com/media/l6bWmwLp2ZydJ16Sja/giphy.gif)

The program gets the actors date of birth and compares it to the current date.
The user then guesses the actor's age and the program returns correct, older or younger.

![gif of working app](https://media.giphy.com/media/2foJGpmOcIlcsAH5x9/giphy.gif)

## API Information

The api used for this project is Online Movie Database which is available through rapidapi. Two fetches are necessary. The first gets a list ids for the the current top 100 actors. Each subsequent fetch uses the id to get the actor bios that include names, image urls, birthdates and mini bios. 

# Future Features

In the future the game will have a point system. The user starts with 15 pts. On any incorrect guess the number of years off of the actual age will be deducted from the total. When the point total hits 0, the game is over. This will also require functionality to make sure that an actor is removed from the topHundred array after being accessed. A new api will be necessary in the future to access more than 100 actors. 