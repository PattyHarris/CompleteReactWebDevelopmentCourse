# Indecision App

## Hello React

1. This tutorial starts with an empty project, adding a index.html to a "public" folder.  In atom.io, you can type "html" followed by the TAB key, and the basic html code will be added to the file.

2. This tutorial uses "live server" - it's a web server requiring no setup:
<code>]
>yarn global add live-server
>live-server -v
-bash: live-server: command not found
</code>

There is a problem with this installation using yarn - if you typed live-server -v, you'd get a "command not found".  yarn sometimes doesn't update the location properly.
To fix:
<code>
>npm install -g live-server
>liver-server -v
live-server 1.2.0
</code>

3. Then to run the server, from the indecision-app folder, run
```
> live-server public
```

where public is the public folder we just created.

4. To use chrome as the browser:
```
> live-server public --browser="google chrome"
```
Note that you need to specify "google chrome" and not just "chrome".

## React

1. For this portion of the tutorial, a CDN is used for React - the class uses version 16.0.0 - 16.32 is the latest as of this writing.
This is the last version supported by the CDN?

```
<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react@16.0.0/umd/react-dom.development.js"></script>
```

2. Add the scripts folder with the app.js file - we added a script tag with this file along with the above scripts.

3. Make sure things are working by typing in "React"  and "ReactDom" (these should pop up automatically) in the Chrome Developer Console.

### JSX

#### Introduction into JSX.

1. Needs Babel to compile the JSX - not sure why since this wasn't needed explicitly in the other projects.  From the Babel website, using the Try it out menu item, you can type in JSX on the left and have it compiled into browser compatible JS (ES5) on the right.  I think the difference here is that with all the other projects, we used "create-react-app" to setup the initial project.

2. Using the Babel "Try it out" console, the left input of
```
var template = <p id="myId">This is JSX from app.js</p>;
```
produces
```
var template = React.createElement(
  "p",
  { id: "myId" },
  "This is JSX from app.js"
);
```
where, the 2nd parameter is an object with a key=id, and a value="myId".
If no id, className, etc. is specified, the second argument value contains null.

#### Installing and using Babel

1. Presets are like plugins.  The Babel website console tool has presets that you can turn on and off.

2. The Docs/Plugins page has the presets that we'll install (along with Babel itself).  The tutorial shows an older version of the presets, but the install list is the same - react and env (which includes all the presets es2015, es2016, and es2017 - the latest Babel website doesn't show these in the list of presets).

3. Install the babel cli (use npm if yarn didn't work before, which for me, didn't work):
```
>npm install -g babel-cli@6.24.1
>babel --help
```

The "help" command is just to make sure your install worked.

4. Init the project using "npm init" or "yarn init" - this is as has been done before - enter project name, etc.  There now should be a package.json file.  This file will contain all the project dependencies.

5. Use either npm install blah --save or yard add to add the babel-preset-react and babel-preset-env packages.  This tutorial uses versions 6.24.1 and 1.5.2 respectively (e.g. npm install babel-preset-react@6.24.1 --save).

6. Create a new folder src to hold the JSX code - the scripts folder will contain the compiled JSX.  For purposes of this part of the tutorial, copy the app.js we created earlier to the src folder.

7. To compile:
```
> babel <input file> --out-file=<output file> --presets=<preset1,preset2>

```
For example:
```
> babel src/app.js --out-file=public/scripts/app.js --presets=env,react
```

8. To automatically compile, add a "watch" to the file - note that when you run watch, it keeps running - that is, open a second terminal window at this point to run live-server (live-server public --browser="google chrome")
```
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

```

9. To re-init - that is, if you remove the node_modules folder or download some other code, you either run "yarn install" or "npm install"

#### Exploring JSX

1. You can only have a single root element on a line - otherwise you'll get an error about the need for them to be enclosed - e.g. the following is invalid:
```
var template = <h1>Indecision App</h1> <p>This is a paragraph</p>;
```
You just need to wrap this in a div element - e.g. wrapper div.
The instructor likes to include everything in () - e.g.
```
var template = (
    <div>
        <h1>Indecision App</h1>
        <p>This is a paragraph</p>
    </div>
);
```

2. Challenge: add a templateTwo variable with your name, age, and location.  Render that variable instead of template.  Pretty simple stuff.

#### JSX Expressions

1. Using expressions instead of static data - nothing new here - see comments.  Includes challenges.

#### JSX Conditional rendering

1. You can't put conditional logic where we currently have, for example user.name - {} can contain only JSX expressions.  Instead, use a function - for this video, ES5 syntax is used - next video will start using ES6.

2. Ternary operator is used to output the user.name.

3. Logical AND is used to output the age data.

4. Challenge \#3 uses the information here to output the subtitle and options.

#### ES6 Const and Let

1. Create a "playground" folder where this tutorial will add JS files for exploring various JS features.

2. The file here is es6-let-const.js - change the babel terminal to use this file - although the output file at this point is still app.js...

3. With var based variables you can re-assign AND redefine - that can be problematic.  You can't do that with 'let' and 'const'.

4. With 'let', you can re-assign, with 'const', you can't re-assign or redefine.

5. As with var, let and const are function scoped.

6. Block scope - let and const are block scoped.

7. Switching back to app.js where we'll change everything at this point to 'let' or 'const' - Challenge #4 - the var declarations can all be const since they are not re-assigned.

#### ES6 Arrow function

1. Create the file es6-arrow-function.js in the playground folder.  Switch babel to use this new file.

2. The 'square' function is written initially in ES5 and then converted to ES6.

3. Arrow functions are always anonymous - meaning you don't give them names as in:
```
function square(x) {

}
```

4. Arrow function expression syntax is what makes arrow functions special - this allows us to make more concise functions.  This works when the function returns nothing more than a simple expression:
```
const squareArrow = (x) => x * x;
```

5. Challenge \#5 is to rework the "get first name" function from the 'let const' tutorial using the regular and shorthand arrow function syntax.

6. Create another file es6-arrow-function -2.js for the second video on arrow functions.  Change babel terminal command as usual.

7. The arguments object is no longer bound with arrow functions.  The 'this' keyword is also no longer bound with arrow functions.

### Events and attributes

Back to React...switch the babel terminal back to app.js.
The user object and related code has also been eliminated - so to keep track of all this, app.js has been moved to old-versions/app-1.js.

1. Use a counter app to show user events.  The templateTwo here will have the counter buttons, etc.

2. Attributes: some attributes are the same for both JSX and HTML, such as "id", others have been renamed, such as "className", which is the HTML "class".  In the latter case, "class" in JSX is a reserved word.

3. The complete list of supported attributes and their names can be found online: https://reactjs.org/docs/dom-elements.html (or Google "react dom elements");

5. The id attribute takes an expression which helps with using buttons, for example.

6. Challenge \#6 is to create 2 additional buttons, -1 and reset.  The challenge indicates that the associated functions do nothing more than log that the buttons were clicked.

### Manual Data Binding

1. In this tutorial, we'll automatically re-render the application when the count changes.

2. JSX does not have built in data binding.  That is, if we change the value of count, it is not reflected in the UI.  For this tutorial, we will re-run the the templateTwo code and the ReactDOM.render(templateTwo, appRoot); code.  Eventually this will happen with Components, but to explain things more simply, we'll start this way.

3. Create a new function, renderCounterApp to run the above code - replace all the console.log's in the count change functions with a call to this function.  As part of the Challenge \#7 is to complete the minusOne and reset functions.

4. Although we are re-rendering all the elements, React is smart enough to render only the part which changes, in our case, the count.  You can see this by opening the Chrome developer console, expanding all the Elements, and watch what flashes when you click any of the buttons (e.g. +1, -1, or Reset) - uses the Virtual DOM.

### Forms and Inputs

1. Move all the counter app code to a new file in the playground - counter-example.js.

2. For this portion, we'll be working with the form, input, and another button elements - these are added to the template to enable user input of options.

3. The input has a name='option' which essentially gives the input element an ID.  At this point, if you add some text and click the Add Option button, the entire form is submitted - you can see the text is added to the query string in the URL: 27.0.0.1:8080/?option=My+Option  This NOT what we want and is how older server-side application code works.  We want to render just the part that changes - that is, handle the form submit on the client.

4. To handle the form submission on the client, we use an event handler (e.g. onClick).  By Googling "react dom events" you can get the post, "SyntheticEvent - React ".  The "Supported Events" is the useful section here - see Form Events.  Of the events listed, we'll be using onSubmit.  Add the handler to the form element and set it to the function onFormSubmit.

5. This part isn't very clear, but in the onSubmit, you reference the function, but not call it - if you call it, e.g. {someFunction()} onSubmit will use that return, which is undefined (?), so you reference it instead, e.g. {someFunction} - from the Q&A - "Because the submit handler needs a reference to the function so it can call it itself. If you invoke the function, you're just passing the return value of the function to the submit handler."

6. In the event that passed to our function, onFormSubmit, the e.target refers to the element that the event started on, in this case the form.  In the form element, you have access to the elements in the form, indexed by "name" - which is why we added a name="option" to the form element.  So to get at the input value, we then have e.target.elements.option.value

7. Challenge for this section is to repeat the re-rendering steps of the counter app - that is, when the option is added to the list of options, we need to re-render the data - here we're not re-rendering the list of options, but simply outputting the length of the options array in a paragraph element -
```
<p>{app.options.length}</p>
```

At this point, remove the static items from the options array - we're not using them anyway....

8. The second challenge of this video is to add the remove button to clear the options, ensuring that the data is rendered as appropriate.

#### Arrays in JSX

Here' we'll handle the static list of options.

1. JSX supports strings and numbers, doesn't support objects, and ignores booleans, undefined and NULL?  But then Andrew goes on to describe arrays are supported by JSX and can have as elements any JS expression: strings, numbers, objects, booleans, undefined, and NULL - not objects.  But, only strings and numbers are rendered.

2. Think of anything in {} as a JS expression.  So for example, the following array [22,33] is treated as {22}{33}.  Also, if the array contains [22, 33, null, undefined, true] only 22 and 33 will be rendered, since null, undefined, and true are ignored.  This is easily verified by looking at the developer console - you'll see that in this case, the array ONLY contains, the 22 and 33.

3. JSX can exist inside JSX, meaning the following is valid: {<p>some text<p>} which implies that array elements can consist of JSX expressions:
```
{   <p>a<p>, <p>b<p>, <p>c<p>}
```

But when this is rendered, you'll see the following warning: "Each child in an array or iterator should have a unique "key" prop."  This means that each element needs a key...with JSX as elements, there are no react text comments (you see these when you expand the data in the developer console).  So the above needs to be something like:
```
{<p key="1">a<p>, <p key="2">b<p>, <p key="3">c<p>}
```

4. Challenge: using the map function, output the elements of the options array as list items.  The key for each item will be the option value.

#### Picking an Option

1. Here the options array length output is removed.  app-2.js is the version of the file up to this point.

2. Add the button to handle "What should I do" - e.g. the options picker button.  A function "onMakeDecision" handles the onClick.

3. Add a "disable" property to this button so that it can't be clicked if there are no options.

#### Build It: Visibility Toggle

1. This app has a title (Visibility Toggle) and a button called "Show detail" below it.  When you click the button, text below the button shows "Hey, These are some details you can now see!"  The button name changes to "Hide details"

2. Create a new file in the playground called "build-it-visible.js"  Switch out babel on the terminal as before.

3. The solution for this challenge is pretty close to my original solution using a ternary operator, but I forgot about uisng && for outputting the paragraph tag.
```
{isDetailShowing && (
    <div>
        <p>Hey. These are some details you can now see!</p>
    </div>
    )};
```
