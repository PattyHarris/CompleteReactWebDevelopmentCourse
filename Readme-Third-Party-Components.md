# Using Third Party Components

Discusses integration of third party components, in particular react-modal.

## Passing Children to Component

1. The built-in "children prop" allows us to pass in custom JSX to a given component.

2. One way to pass in JSX is as a prop as we've seen before:
```
const Layout = (props) => {
    return (
        <div>
            <p>Header</p>
            { props.content}
            <p>Footer</p>
        </div>
    )
}

const template = () => {
    <div>
        <h1>Page Title</h1>
        <p>This is my page.</p>
    </div>
}

React.DOM.render(<Layout content-{template} />, document.getElementById('app'));
```

3. Another way to pass in custom JSX is to use children props - here inline JSX is passed to Layout.  The children.props is available to class-based components as this.children.props, where here as a functional component, it's just children.props.  Also, when formatted as in the render call before, you can see that the p tag is a child of Layout (note the () to allow for moving to separate lines....).
```
const Layout = (props) => {
    return (
        <div>
            <p>Header</p>
            { props.content.children}
            <p>Footer</p>
        </div>
    )
}

const template = () => {
    <div>
        <h1>Page Title</h1>
        <p>This is my page.</p>
    </div>
}

React.DOM.render((
    <Layout>
        <div>
            <h1>Page Title</h1>
            <p>This is my page.</p>
        </div>
    <Layout />
), document.getElementById('app'));

```
4.  The child props are generally how one uses third party components.

## Setting up react-modal

1. To find the documentation, Google react-modal.  Install react-modal@2.2.2 - again there are peer warnings, which in this case don't make sense...

2. Create a new file for the component, OptionModal.js

3. To find out what you need to import, it is advised to check the examples for the component, e.g. in this case:
```
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

```

4. The Modal component requires 2 props, isOpen and contentLabel - the latter is used for accessibility.  

5. IndecisionApp will keep track of whether or not an option is selected - that state property will be passed to the OptionModal component to show or hide the dialog.  The selectedOption is converted to a "true boolean" using the double "!" - that is, the selectedOption not a boolean, but is converted to a boolean.

6. Challenge is to set the state when an option is picked, e.g. call setState to set the selectedOption - see handlePick.

7. To clear the modal dialog when the "Okay" button is clicked, the selectedOption state has to be cleared.  This will be handled as other event handlers, in that a callback function is passed down to the component (in this case OptionModel) as a prop.  This is the next challenge.

8. The Modal component property onRequestClose takes a function and is called when the user hits the ESC key or clicks outside the dialog.

## Bonus: Refactoring Other Stateless Functional Components

1. Challenge is to change the Action, Header, Option, and Options components to use the simplified ES6 function return.
