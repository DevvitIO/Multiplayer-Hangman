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
