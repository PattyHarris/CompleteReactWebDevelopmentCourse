/***********************************************************
 This version contains the tutorial code and comments STARTING with
  Events and Attributes.
 ***********************************************************/

console.log("App.js is running!");

const app = {
    title: 'Indecision App',
    subTitle: 'A place to learn JSX',
    options: []
};

// This is part of Challenge #3 - we're to use AND, which seems unnecessary.
// What he wanted was this:
//      { app.subTitle && <p>{app.subTitle}</p>}
function getSubTitle(subTitle) {
    if (subTitle) {
        return <p>{subTitle}</p>;
    }
}

// Handles our form submission.
// The input parameter here is the event.
const onFormSubmit = (e) => {
    // Prevents full page refresh.
    e.preventDefault();

    // Access the value entered - target is the form element which
    // has access to elements - each is accessed by name, in this case,
    // we gave the input name="option".
    const option = e.target.elements.option.value;

    // Strings have 'falsey' properties, so you can check their existence.
    if (option) {
        // Add the option to the array and clear the input field.
        // Re-render the list of items.
        app.options.push(option);
        e.target.elements.option.value = '';
        renderApp();
    }
};

const removeAllOptions = () => {
    app.options = [];
    renderApp();
}

const appRoot = document.getElementById('app');

// Challenge #8: Create a function to re-render the app as was
// done for the counter app.  Challenge #9 is to add a "Remove All" buttion above
// the list that clears the options list.

const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {getSubTitle(app.subTitle)}

            <p>{  app.options && app.options.length > 0  ?  'Here are your options:' : 'No options!'}</p>
            <button onClick={removeAllOptions}>Remove All</button>

            <p>{app.options.length}</p>
            <ol>
                {/* Challenge is to output the options elements using map.*/}
                {
                    app.options.map( (option)  => {
                        return <li key={option}>{option}</li>;
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
};

// Render the app on startup.
renderApp();
