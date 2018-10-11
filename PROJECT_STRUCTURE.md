# Project Structure
To make future development and separation tasks a little bit easier the server and client code is separated into different directories

# Build Process

## [Babel](https://babeljs.io/)
The build process runs the entire JS code through Babel which allows the developer to use new Javascript features (ES6+). If some features are not supported, there may just be a Babel plugin missing.

## [Webpack](https://webpack.js.org/)
To bundle the Client side code into a single file webpack concatenates all JS code in the `client` directory and creates a `bundle.js` file which is stored in the `client/dist` directory and served by the `server` to the users.

Futhermore webpack copies all `assets` and the `index.html` file into the dist directory. When the dev environment is executed Webpack watches for file changes in the `client` directory and reloads the page.

## [Nodemon](https://nodemon.io/)
During development Nodemon starts the `server` and watches for file changes. The server restarts if one of its files gets updated and triggers a browser reload.

# Getting started
- `git clone https://github.com/DevvitIO/Multiplayer-Hangman.git` (clone the project to your local machine)
- `npm install` (navigate into the project's root directory)
- `npm start`



# Site Javascript Layout: 

## Client side code

Beyond the HTML/CSS section of the site our client side code is divided into three parts.

It's an aim to make sure there is as little crossover between these three as possible, as it will allow developers interested in different areas to easily get to work on their area.

#### clientGame.js

- Contains client side game logic 
- Talks with clientSocket.js to receive and send events to the server
- Initiates any display related functionality by sending it to clientDisplay.js

#### clientDisplay.js

- Actions which manipulate visuals will be held here. I.e if text has to be updated, a new screen brought up, victory announcements, etc

#### clientSocket.js

- Talks with the server to keep games updated
- Handles multiple games, rooms, and other meta-game information


## Server side code

#### Index.js

- Server serving and port. Nothing too important here.

#### Server.js

- This is the launching point for our application, it handles URL routing, library loading, and so on. ( More often this might be called app.js)

#### Game.js

- Controls server side game logic 
- Double checks that rules from clientGame.js are being held
- Emits socket events


--------------------

I have a sneaking suspicion we could create a script that is shared between game.js and clientGame.js which can be written/amended once and runs the logic in both places, minimizing the need for updating two bits of code simultaneously when it comes to game rules.