/* There are many ways to set up a new React project like:
    - Script tags, it is possible to just use script tags and point to React, React DOM and Babel
    - CRA, Create React App, this tool helps us generate a React project. This is probably the most common set up
    - Do it yourself, it's definitely possible to set everything up with a tool like Webpack
*/


/* Script tags */
//The drawbacks to this approach is that everything is compiled at runtime which is horribly slow but its great for learning React - but please don't put it like this in production.

// 1. Create a file app.js:
// app.js
class Application extends React.Component {
  render() {
    return (
      <div>
      App
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById('app'));

// 2.Next, create a file index.html:
//index.html
<html>
  <body>
  <!-- This is where our app will live -->
    <div id="app"></div>

  <!-- These are script tags we need for React, JSX and ES2015 features -->
  <script src="https://fb.me/react-15.0.0.js"></script>
  <script src="https://fb.me/react-dom-15.0.0.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
  <script type="text/babel" src="app.js"></script>
</body>
</html>

// 3. Run "npx http-server -p 5000" in the terminal, this will serve up your application on http://localhost:5000.
npx http-server -p 5000

// 4. Navigate to http://localhost:5000 in your browser, you should see the text App





/* create-react-app */
//Create React App (CRA) is a scaffolder. With it you are able to scaffold a React application with ease and will get you up and running in no time.
//You need Node >= 8.10 and NPM >= 5.6 on your machine
//official documentation: https://github.com/facebook/create-react-app

// 1. Create a React project using npx and Create React App, in terminal:
npx create-react-app my-app

// 2. Navigate to your project:
cd my-app

// 3. Run the following command to serve it up:
yarn start

//This starts a development server at http://localhost:3000





/* Do it yourself */
//You will need the following:
//  - Node.js. 
//    With Node.js you will fetch different libraries that you need.
//  - Webpack. 
//    You will download webpack and create a configuration file for it.
//    Webpack is a static module bundler. It takes your code, and turns it into one or many bundles. 
//    What it does is to build up a dependency graphs, while it crawls your code and creates the bundles you've instructed it to create.
//    It's common to start with one bundle and over time creating more specific bundles for things libraries, and things that you want to lazy load.
//    Webpack can also be instructed to manage parts of your code and turn it into something the web can interpret. 
//    You can for example turn: JSX into Vanilla JavaScript; SCSS into CSS.
//  - Babel. 
//    Babel helps you add functionality to JavaScript, features that might not yet be supported. 
//    One thing Babel will do for us to transform JSX files to Vanilla JavaScript

// 1. Create a Webpack project
// 1.1. Initialize a Node.js project by running "npm init -y" at the root:
npm init -y

// 1.2. Create the following directories and files:
/*
-| src/
---| index.js
-| dist/
---| index.html 
-| package.json
*/

// 1.3. Give the file index.html the following content:
<!DOCTYPE html>
 <html>
   <head>
     <title>Hello App</title>
   </head>
   <body>
     <div>
       <h1>Hello App</h1>
     </div>
     <script src="./bundle.js"></script>
   </body>
 </html>
//The referred to bundle.js will be created by Webpack, so don't worry about that one.

// 1.4. Give the file index.js the following content:
console.log('hi from app')

// 1.5. Install the libraries needed for running Webpack:
npm install --save-dev webpack webpack-dev-server webpack-cli

// 1.6. Create the file webpack.config.js:
//webpack.config.js
const path = require('path');
module.exports = {
   entry: path.resolve(__dirname, './src/index.js'), //instructs Webpack from where to start looking to build its internal dependency graph
   output: { //pointing out where to place the resulting bundle and what to call it
     path: path.resolve(__dirname, '/dist'),
     filename: 'bundle.js'
   },
   devServer: {
     contentBase: path.resolve(__dirname, './dist')
   }
 };

// 1.7. Open up package.json and give it a start script in the scripts section:
{
  "scripts": {
     "start": "webpack serve --mode development"    
  }
}

// 1.8. Try out everything by running npm start at the console:
npm start

//You should see a text saying the following at the top: "Project is running at http://localhost:8080/".

// 1.9. Open up a browser and navigate to Project is running at http://localhost:8080/. Open developer tools, you should see index.js:1 hi from app in the console area.

// 2. Add Babel
//React relies on JSX, it makes it so much easier to express the view part of your app. 
//Webpack needs help transpiling the JSX into Vanilla (normal) JavaScript. For this, you can use Babel, or more technically, a so called preset.

// 2.1 Create the file .babelrc, and put in the following content:
//.babelrc
{
   "presets": [
     "@babel/preset-env",
     "@babel/preset-react"
   ]
 }

// 2.2. Install the Babel preset needed:
npm install --save-dev @babel/preset-react @babel/core babel-loader

// 2.3. Open up webpack.config.js. After the entry element, add the following config:
//webpack.config.js
{
  "module": {
    "rules": [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ],
  },
  "resolve": {
    "extensions": ['*', '.js', '.jsx']
  }
}

//What this does is telling Webpack to look for files ending in .js or .jsx and run the babel-loader. 
//Running that loader will ensure it transpiles from JSX to normal JavaScript.

// 3. Add React
// 3.1. Install the needed libraries for React:
npm install --save react react-dom

//3.2. Locate the index.js and replace its content with this code:
//index.js
import React from 'react';
import ReactDOM from 'react-dom';
  
const title = 'Your React app';
  
ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

// 3.3. Locate the index.html and add <div id="app"></div> inside of the body tag:
//index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello App</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./bundle.js"></script>
  </body>
</html>

//React will look for this element with id="app" and replace it with the React app.

// 3.4. Run npm start in the console:
npm start

// 3.5. Open up a browser and navigate to http://localhost:8080. You should see the following text: "Your React app"

// 4. Add HMR
//HMR, hot module replacement, means every time you change a JS file, Webpack will recompile and you will see the change right away.

// 4.1. Run npm install:
npm install --save-dev react-hot-loader

// 4.2. Open up webpack.config.js and do the following changes:
// - at the top, add this import:
const webpack = require('webpack');
// - just before the devServer element add this config:
"plugins": [new webpack.HotModuleReplacementPlugin()]
// - in the devServer element, add this attribute:
"hot": true

// 4.3. Quit the current instance in the console and run npm start again to test out the HMR addition
npm start