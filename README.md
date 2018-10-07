# Multiplayer Hangman game

" A real-time multiplayer Hangman game. Yeah it's going to blow your damn mind! " 
- Real people 

This project is getting a reboot this year, hopefully just in time for haktoberfest ! 

We're open to experienced people looking to try out a few tricks or offer help as well as anyone looking to build a starter portfolio.


## Purpose 

A collab project between Redditors with the purpose to learn new technologies as we go. This project has issues of varying difficulties so all are welcome.
It was created to help devs advance in their skillset, have a bit of fun, and make something interesting.

## Getting Started

Join our organisation by visiting here:
https://orgmanager.miguelpiedrafita.com/join/32555830

Come hang out with us at our Discord channel here:
https://discordapp.com/invite/erPjG7C

1. Clone the repository, and go fork yourself.

2. Pick an issue from the list or ask if there's anything to do.

3. Use your awesome coding skills to add features or fix bugs!

## Running the project
In console:
````
git clone https://github.com/DevvitIO/Multiplayer-Hangman.git
npm install
npm start //will run webpack-dev-server, rebuilding the site when changes are made to any of the files.
navigate browser to http://localhost:3000/
````
If installation turns out to be more complicated than this, that is completely our fault and please do let us know. 

## Contributing Requirements
* Readability is key. If you find it's getting too long, separate it out
* Flexibility: Make a "popWindow()" function, don't cross game logic with animation directly, and so on
* You will need to be assigned a task before you can start working on any issues. Discord is generally a good way to go about this at the moment

## Seeking help

We're available on discord, or you can post a specific issue in the issues list here. We like questions!

## MANDATORY RULES

* If you get task assigned and you've been absent for a while on a critical part of the project, someone else will do it in your stead.

## Sidenotes

The project layout is simple for now, but feel free to extend the javascript/stylesheets into separate elements where it makes sense.

### Front end developers:

You'll find everything you need in the /client folder - scss, html, and the client.js which, surprisingly, runs on the client's device.

### Back end development:

Server.js contains the back end code. 


# If you want to...

To help you work out where to contribute before any motivation you had fizzles out and dies - here is my best guess as to where you might do that. (06/10/18)

## Work on the game rules/logic...

You'll need to check client/clientGame.js and server/src/game.js

## Work on the design...

client/index.html ( soon to be split into smaller files ) 

All scss files

## Improve networking...

clientSocket.js

## Create fun letter styles in css...

client/assets/_secretwords.scss

## Make some swanky animations for the letters...

client/clientDisplay

## Animate/Style the hangman...

client/assets/_hangman.scss or client/clientDisplay - depending on what your plans are

## Create other visual assets

If you're a designer and want to create a logo, input panel, background effect, or pop up element (i.e congratulations panel ) just feel free to create and we'll help you implement it

## Create a new hangman...

Pop open your favourite vector capable drawing programming ( illustrator for example ) and get drawing. The five body parts require an ID, so divide into layers appropriately. 

## Work on server side features like performance, multiple instances, player sharing, rooms...

Primarily server.js, and game.js, with a touch of clientSocket.js and some front end tools. 