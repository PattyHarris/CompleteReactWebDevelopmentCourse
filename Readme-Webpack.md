# Webpack

1. Webpack allows for:
    a. module bundler for modern JS apps.
    b. generates a bundle that contains everything an app needs to run.
    c. breaking code up into files without having to add addition 'script' tags in index.html - which is where we currently import app.js
    d. import of third party applications, e.g. import React from the react npm yarn module.

2. The resulting folder structure will contain the following folders:
    a. public: index.html, bundle.js
    b. src: client side JS
    c. node_modules: third party dependencies

3. index.html will contain a single script tag for bundle.js.

4. Webpack can also run babel.

## Avoid Global Modules

1. We want to avoid global modules such as babel and live-server, which we use now from the terminal, for obvious reasons.

2. Step 1: Uninstall the babel-cli and live-server that we're using now - since I used npm to install:
```
> npm uninstall -g babel-cli live-server
```

3. Step 2: Install babel-cli and live-server locally:
```
npm install babel-cli@6.24.1 live-server
```

4. To run them now,, we need to add them to the scripts tag in package.json - each of these takes a key value pair, where the key is the script name (whatever you want) and the value is what is used to run the script:
```
"scripts": {
    "serve": "live-server public --browser='google chrome'"
}
```

To run this:
```
> yarn run serve
```

To add the babel script, to package.json:
```
"scripts": {
    "build": "src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
}
```

To run this from the console:
```
> yarn run build
```

At this point, things run as before.

5. Recap:
    -Advantages: dependencies, versions, creation of scripts that can be run by a name
    - Allow us to avoid global modules

## Installing and Configuring Webpack

1. Install Webpack:
```
> yarn add webpack@3.1.0
```

The above seems to have issues, so I used npm install...still having some "audit" issues, but they're probably due to using the older versions...??

2. For now, in package.json, change the "build" script to "build-babel" (we'll remove this eventually) and add a "build" script that runs webpack:
```
"scripts": {
    "build": "webpack",
    "build -babel": "src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
}

```
The webpack command doesn't need any arguments since it will use a config file.

2. To start the process of creating the webpack.config.js file, first move app.js into the playground and create a new app.js with nothing more than a console.log.

3. Create the webpack.config.js file in the root of the project.  This is a node.js script - that is, it has everything to run a node.js application.  Since this isn't a node.js course, we will only be learning a minimal amount - enough to get by.

4. We need to specify the entry point for the app and where to put the output.  The module.exports contains an object which specifies this information.  This is a node.js specific property that allows us to expose something, in this case an object, to another file.

5.  For our purposes, module.exports will contain the webpack configuration details.  The properties we're specifying are described in more detail in the webpack documention (webpack.js.org)

6. The issue with the output path is that it MUST be an absolute path, which is a path on our machine.  So we'll use __dirname.  You can see the contents of this by using console.log(__dirname) at the top of the webpack.config.js and then running in the terminal:
```
node webpack.config.js
```

We still need to point to the public folder - to do this, we use the node.js 'path.join()' function to concatenate the output of __dirname to 'public'.  

7. To import the node.js path module, we need to use the node.js built in function 'require'.
Now you can run webpack:
```
> yard run build
```

8. At this point, we can make the following changes to the project, now that we have a bundle.js:
a. Remove the scripts folder (since we no longer need the app.js output file)
b. From index.html, remove the scripts tags for the react modules
c. In index.html, change the reference from /scripts/app.js to bundle.js:
```
<script src="/bundle.js"></script>
```

9. To watch file changes, add the '--watch' option to the webpack command in package.json  Now when you run the build command, it doesn't run and stop.

## ES6 import/export

1. Allows one to break their application into smaller manageable files and to load those files.  Likewise with third party apps.  This ability comes as default with the webpack bundler.

2. As a start, create a file utils.js in the src folder that contains only a console.log('utils is running').  Then in app.js, add the import for utils.js  You will see the logs for utils followed the log for app.js - note there's no ()
```
import './utils.js';

console.log('app.js is running!!');

```

3.  Add a square function to utils for testing the export/import functionality.  Note that if just importing utils.js into app.js imported all of utils.js, the namespace would be cluttered as if we had imported everything with script tags.  

4. There are 2 types of exports, default and named.  In the export function, the {} do NOT represent an object.  Here we put the list of things we want to export, such as the square function:
```
export { square };
```
Then, in app.js, instead of importing the entire file, we specify what we want to import:
```
import { square } from './utils.js';

console.log('app.js is running!');
console.log(square(4));
```
5.  Add an 'add' function to utils and export it as a named function:
```
export {square, add};
```
6. Named exports can also be written like the following:
```
export const add = (a, b) => a + b;
export const square = (x) => x * x;

```

7. The challenge is to create a person.js file (in src) that contains 2 named exports: isAdult(age) and canDrink(age).  Import them into app.js and print the results to the console.

## Default Exports

1. Add a subtract function to utils - it's set as a default export as follows:
```
export { add, square, subtract as default }
```

2. You can only have a single default export.  

3. To import, the default export doesn't appear in the {}, but appears outside (in front):
```
import subtract, {add, square} from './utils.js';
```
Or, if just importing the default:
```
import subtract from './utils.js';
```

4. Unlike named exports, default exports can be imported with any name you choose.  For example,
```
import theUtilsSubtractFunction from './utils.js';
console.log(theUtilsSubtractFunction(5,2));
```
5. Another way to export the default is to use 'export default' which takes an expression.  You can't use 'export default' as you do 'export', meaning the following is invalid:
```
export default subtract = (a, b) => a - b;
```

BUT, because 'export default' takes an expression, the following IS valid:
```
export default (a, b) => a - b;
```

The following is clearer (I think):
```
const subtract = (a, b) => a - b;
export default subtract;
```

6. Challenge is to add a default function isSenior(age) to the person.js, import it in app.js, output the call to the console.

## Importing npm Modules

1. Install -> import -> use

2. Install the npm module validator (as a way to test this process).  I used npm to install... We will use the isEmail function from this module.
```
npm install validator@8.0.0
```

3. Working with third party modules - check the npm documentation for that module for how to import and which functions you can use (not always easy to find).  Note that the 'require' statement is ES5 and used by node.js.  ES6 and webpack uses 'import'.

4. No relative path is needed since when you just supply the name, webpack assumes the module lives in the node_modules folder.

5. As I suspected, app.js is cleared and the import for 'validator' is added.  Note that webpack only includes modules in the build if you use them - that is, if you import a module and don't use it, it won't be included in the bundle.

6.  Removing the validator code from app.js and now installing react and react-dom - I needed react-dom@16.0.1 due a vulnerability issue.
```
npm install react@16.0.0 react-dom@16.0.1
```

7. If you attempt to render HTML as we did before, it will fail since we haven't hooked up babel to compile the JSX to JS, e.g. this fails:
```
const template = <p>testing 123</p>;
ReactDom.render(template, document.getElementById('app'));
```

As you recall, when this is compiled by babel, it turned into this, which does work:
```
const template = React.createElement('p', {}, 'testing 123');
ReactDom.render(template, document.getElementById('app'));
```

## Setting up Babel with Webpack

1. loader: lets you customize the behavior of webpack when it loads a given file, for example, compile JSX to plain JS and ES5 to ES6 or SCSS to CSS.

2. Install babel-core@6.25.0 (babel that works with webpack as apposed to the command line version we installed earlier).  Also install babel-loader@7.1.1 which is a webpack plugin that teaches webpack to run babel when it sees certain files.

3. In the webpack.config.js file, add another module property, module.rules (for more details see https://webpack.js.org/configuration/module/), which is an array of Rules (duh).

4. The first rule is for compiling our JSX - here the loader is as described above.  The test is what files we want to run the loader against.  The test value is a regular expression - in this expression, we're looking for .js files - the $ indicates that there are no other characters after the 'js'.  The '.' has special meaning and therefore is escaped with a back-slash.  The exclude property lists that files you want to excluded, and this case all the files in the node_modules folder.
```
module: {
    rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
    }]
}
```

5. To get babel to use the 'presets' we used on the command line you need to use a RC file - .babelrc.  This is a JSON file in which we include the presets array.

6. Now we can remove the "createElement" with some actual JSX - simple 'p' tag, and the HTML will be converted correctly.

7. Right now the bundle.js file is huge, but will be reduced significantly when we learn to build for production - later.

## One Component Per File

1. At this point, Andrew is deleted person.js and utils.js - I moved these to old-versions.

2. We'll be taking the old app.js code (now in the playground) and cutting it up into components.  To start, we'll take the whole file and copy it into app.js to make sure the old code still works.  Remove the User component code we had created previously.

3. Create the components folder into which we will put all the components, starting with AddOption.  
a. Copy the component to the new file.
b. Add the import 'react'
c. Add 'export default' in front of the class definition, e.g. export default class AddOption.....
d. In app.js, import the component, e.g. import AddOption from './component/AddOption' - note that we don't need {} since we importing the default AND webpack is smart enough to look for .js so you don't need to specify 'AddOption.js' in the path.  

4. Repeat the above for the Options component.
Challenge is to add the Header and Action components.
For Options, we need to move the import from app.js to Options, changing the path.

5. Last challenge is to make a separate file for IndecisionApp.

## Source Maps with Webpack

1. To enable debugging, there's a "devtool"  property you can add to your webpack.config.js file.  This takes a string that can help with development or production - see the docs at webpack.js.org.

2. We're going to use the development option, "cheap-module-eval-source-map".  After this property is added, webpack has to be re-started (e.g. restart the build terminal command).  To test this property, add a console.log(someUnknownVariable) - without the devtool addition, the exception points to bundle.js (which is the ES5 + webpack code).  With the devtool property, the exception points to the line of code in our original source file.

## Webpack DevServer

1. Webpack DevServer is similar to live-server, where the later is a more generic server.  We'll be switch to the webpack DevServer.

2. Install the server locally so we can run it as a script in package.json.
```
> npm install webpack-dev-server@2.5.1
```

3. Setup the server in webpack.config.js - the only property we will use is the "contentBase" property which tells the server where to find our files - e.g. our "public" folder.  We did the same thing when we setup live-server in package.json, where we specified the public folder there.  The devServer is an object and the path needs to be an absolute path - which is already figured out for the path output.
```
devServer: {
    contentBase: path.join(__dirname, 'public')
}
```

4. To configure a script to run the server, package.json is changed quite a bit:
a. Remove the build-babel completely
b. The build script no longer needs the "--watch" on the webpack command.
c. Add
```
"dev-server": "webpack-dev-server"
```

5. Run the server:
```
> yarn run dev-server
```

As part of the output, it show where the server is running from, e.g. "Project is running at http://localhost:8081/" and where the it retrieved the code.  From Chrome, use the localhost given to run the code (manually) - doesn't seem to launch as with live-server...

6. This server is faster since it generates a new bundle.js as needed and stores it in memory.  If you remove the bundle.js file, webpack will generate a new one, but keeps it in memory.  To regenerate the bundle.js (e.g. for production),
```
> yarn run build
```

## ES6 Class Properties

1. We'll be installing a babel plugin that will allow us to add the ES6 features that allow for class properties.  The plugin also removes the need for the class constructor and the binding of methods.  Recall that babel basically compiles everything into a ES5 format that all browsers understand.

2. 
