'use strict';

/***********************************************************
 This version contains the tutorial code and comments UP to Events and Attributes.
 ***********************************************************/

console.log("App.js is running!");

// JSX - Javascript XML

// Challenge #2: Create a app object to supply the title and subtitle.
// Challenge #3: Only render the subtitle (and the paragraph element tag
// if the subtitle exists (use the AND operator).  If the options array has elements,
// use the ternary operator to output a paragraph element  with either
// "Here are your options" or "No optons".

// Challenge #4: change all var declarations to either let or const.

var app = {
    title: 'Indecision App',
    subTitle: 'A place to learn JSX',
    options: ['One', 'Two']
};

// This is part of Challenge #3 - we're to use AND, which seems unnecessary.
// What he wanted was this:
//      { app.subTitle && <p>{app.subTitle}</p>}
function getSubTitle(subTitle) {
    if (subTitle) {
        return <p>{subTitle}</p>;
    }
}

const template = (
    <div>
        <h1>{app.title}</h1>
        {getSubTitle(app.subTitle)}

        <p>{  app.options && app.options.length > 0  ?  'Here are your options:' : 'No options!'}</p>

        <ol>
            <li>'Option One'</li>
            <li>'Option Two'</li>
        </ol>
    </div>
);

// Challenge #1: render the following templateTwo with your name, age, and location -
// using static data.  In JSX Expressions, the static data is replaced with JSX expressions,
// e.g. userName or using the attributes of the user object, e.g. user.name.

var user = {
    name: 'Patty',
    age: 63,
    location: 'Palo Alto'
};

// Function to return the location if it's valid. Use a function as the JSX
// expression to provide conditional logic....here we can conditionally return
// the Location paragraph tag with data if the user has a location.
// Note: return undefined is the same as not having a return...
// e.g. else {
//          return undefined
//       }

function getLocation(location) {
    if (location) {
        return (
            <p>Location: {location}</p>;
        );
    }
}

var templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);

var appRoot = document.getElementById('app');

// Render the above - you need to specify the JSX you want to render  and the DOM
// element you're rendering to.

ReactDOM.render(template, appRoot);
