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
