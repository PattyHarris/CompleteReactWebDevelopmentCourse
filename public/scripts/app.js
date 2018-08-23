'use strict';

/***********************************************************
 This version contains the tutorial code and comments STARTING with
  Events and Attributes.
 ***********************************************************/

console.log("App.js is running!");

var app = {
    title: 'Indecision App',
    subTitle: 'A place to learn JSX',
    options: []
};

// This is part of Challenge #3 - we're to use AND, which seems unnecessary.
// What he wanted was this:
//      { app.subTitle && <p>{app.subTitle}</p>}
function getSubTitle(subTitle) {
    if (subTitle) {
        return React.createElement(
            'p',
            null,
            subTitle
        );
    }
}

// Handles our form submission.
// The input parameter here is the event.
var onFormSubmit = function onFormSubmit(e) {
    // Prevents full page refresh.
    e.preventDefault();

    // Access the value entered - target is the form element which
    // has access to elements - each is accessed by name, in this case,
    // we gave the input name="option".
    var option = e.target.elements.option.value;

    // Strings have 'falsey' properties, so you can check their existence.
    if (option) {
        // Add the option to the array and clear the input field.
        // Re-render the list of items.
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
};

// Clear all the options
var onRemoveAllOptions = function onRemoveAllOptions() {
    app.options = [];
    renderApp();
};

// Handle the "make decision" button.  This generates a random number
// between 0 and the size of the options list (-1).  That number is used
// to pull an option from the list.

// Math.random generates a number between 0 and 1, so we need to
// manipulate the results a bit to get the number we need.
var onMakeDecision = function onMakeDecision() {
    var randomNumber = Math.floor(Math.random() * app.options.length);
    var option = app.options[randomNumber];

    // TDB: show an alert with the option picked.
    // alert(option);
};

var appRoot = document.getElementById('app');

// Challenge #8: Create a function to re-render the app as was
// done for the counter app.  Challenge #9 is to add a "Remove All" buttion above
// the list that clears the options list.

var renderApp = function renderApp() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            app.title
        ),
        getSubTitle(app.subTitle),
        React.createElement(
            'p',
            null,
            app.options && app.options.length > 0 ? 'Here are your options:' : 'No options!'
        ),
        React.createElement(
            'button',
            { disabled: app.options.length === 0, onClick: onMakeDecision },
            'What should I do?'
        ),
        React.createElement(
            'button',
            { onClick: onRemoveAllOptions },
            'Remove All'
        ),
        React.createElement(
            'ol',
            null,
            app.options.map(function (option) {
                return React.createElement(
                    'li',
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add Option'
            )
        )
    );

    ReactDOM.render(template, appRoot);
};

// Render the app on startup.
renderApp();
