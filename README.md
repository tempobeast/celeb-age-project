# What's My Age Again?

What's my age again is a JavaScript game where a user guesses the age of a random actor/actress. 
The game pulls from an api of 100 actors that are currently relevant because they star in recently released films or series.


## Features

Each actor image and name is accompanied by an expandable bio section that gives some context to less familiar actors. 

https://media.giphy.com/media/l6bWmwLp2ZydJ16Sja/giphy.gif

The user guesses the actor's age and the program returns correct, older or younger.

https://media.giphy.com/media/lKlcL47NFr0ZW7slDi/giphy.gif

## API Information

The api used for this project is called Online Movie Database which is available through rapidapi. Two fetches are necessary. The first gets a list ids for the the current top 100 actors. That id is then used in the second fetch to get the actor bios that include names, image urls, birthdates and mini bios. 

## Future Improvements

In the future this app will 
