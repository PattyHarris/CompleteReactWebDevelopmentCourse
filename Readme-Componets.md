# React Components

1. Indecision App components:
    IndecisionApp
        Header
        Action
        Options
            Option
        AddOption

2. Setup a Git repository at this point - should have done it earlier.  No matter.

## ES6 Classes - Part 1 - Fundamentals

1. Create a playground file, es6-classes-1.js and switch the babel terminal to use that file.

2. Naming convention is to use classes with the first letter capitalized (e.g. Person).

2. To access data when using the "new" method of instantiation, e.g.
```
const me = new Person('Harry');
```
you need to use a constructor, and that constructor method must adhere to ES6 method syntax.  See the seccond lecture on arrow functions around the 10:38 mark.  E.g.
```
class Person {
    constructor(newName)  {
        name: newName
    }
}
```
3. ES6 allows for argument defaults to functions - they can be used in any order, unlike C/C++.

4. When adding additional methods to the class, you don't end the method with a ',' -
```
class A {
    constructor() {

    } // No comma
    method1() {

    } // No comma
    method2() {

    }
}
```

5. Template strings: new for ES6.  Uses the back-tick, within that you can inject data using ${}:

```
return `Hi.  My name is ${this.name}`;
```

6. Challenge is to add another parameter to the constructor, age, that defaults to 0.  Also add a method, getDescription, that prints out the name and age, e.g. Harry Smith is 25 year(s) old.

## ES6 Classes - Part 2 - Advanced Features

1. Subclasses - uses the "extend" keyword.

2. Overriding the constructor uses "super"  to call the parent constructor.

3. Strings have truthy properties, meaning that !!this.name will return true if the name has contents, false otherwise.

4. Challenge is to repeat the steps for Student to create a Traveler subclass.

## Creating a React Component

1. Move the contents of app.js to jsx-indecision.js in the playground folder.  Switch the Babel terminal to app.js.

2. Create the Header class that extends React.Component.  Note that all classes derived from Component must implement render.

3.  The goal is to compose the page using all the React components we have (or will) created.  These will follow the page sections we created previously using plain jsx.

4. ES6 classes may start with a capitalized first letter, but it's not required.  React component classes MUST start with a capitalized first letter.

5. Add the Action component which has the button.

6. Challenge is to add the Options and AddOption components, each of which simply render some static text to the screen.

## Nesting Components

1. First, define the parent component, the IndecisionApp component, that will hold all the other components.

2. Instead of using the following:
```
const jsx = (
    <div>
        <Header />
        <Action />
        <Options />
        <AddOption />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));

```

we define the ReactDOM.render using an inline expression:
```
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
```

3. The Challenge is to create the nested component Option and called within Options.  Simple.

## Component Props

1. Data is passed using props - here we'll use title="Some String" as input to the Header class.  The class can use "this" to access the instance data - for example, console.log(this.props) shows that the props is converted to an object with key/value pairs.
```
{title: "Some String"}
```

2. Options will initially use a static array.  The options array is passed to Options which then hands each entry to an Option instance.  Challenge is to pass the options array to Options and output the array length.  The second challenge is to create a <p> tag for each option in the array, setting the text and the key - we did the same thing with the <li> tag - see jsx-indecision.js.

3. When "returning" the Option, you still need to provide a "key"  which isn't available in Option - "key" is a special reserved word.  So we still need to pass in a props, optionText={option}.

## Events and Methods

1. In class Action, the method to handle the onClick action will reside inside the class itself - as opposed to a global function in the file.  And recall in the prior video on the handler, you don't want to call the method in the onClick, you just want to reference it - e.g. onClick={this.handlePick}  not onClick={this.handlePick()}.  Challenge is to add a "Remove All" button to the Options class with a handleRemoveAll method.

2. The second challenge here is to setup the form as we did before for the AddOption class.  Difference is that we used trim to trim off spaces and only showed an alert if there is content in the text box.  Also, access to the form method requires {this.handleAddOption}

## Method Binding

1. The "this" binding is not valid in the class methods, such as handlePick - if you try to access "props", e.g. "this.props" you'll see that "this" is null.  The logs will show an "Uncaught TypeError...."  The reason for this is explored in this section.

2. Regular functions have "this" undefined by default, so in the following, the difference is calling a method of an object and calling a function - to fix this issue, we need to bind the function to the object "this":
```
const obj = {
    name: "Vikram",
    getName() {
        return this.name;
    }
}

// Works
console.log(obj.getName());

// Fails - the "this" context is lost.  "this" is not defined for
// regular functions.
const getName = obj.getName;
console.log(getName());

// Works when we bind to the obj "this":
const getNameBind = obj.getName.bind(obj);
console.log(getNameBind());

```
3. In the above example, you can also bind like below - which will print out the name in the object - that is, it sets the object attribute:
```
// Prints out 'Andrew' instead of 'Vikram'
const getName = obj.getName.bind({name: 'Andrew'});
console.log(getName());

```

4. To fix the class methods where there's an event, e.g. button click, you can either reference bind as in:
```
onClick={this.handleRemoveAll.bind(this)}
```
But here we're setting up "bind" each time the page is rendered.

It's better to do this is to override the constructor and then set the bind in the constructor:
```
constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
}
```

## What is component state?

1. Steps (items marked with * are handled by the system):
    1. Setup default state object.
    2. Component rendered with default state values*
    3. Change state based on event
    4. Component re-rendered using new state values*
    5. Start again at 3

2. Initial state object - for example, in the Counter object:
```
{
    count: 0
}
```

## Adding state to the Counter App, Part 1

1. Take the Counter example app in the playground and either comment it all out or copy it to another file (which I did).   Point the babel terminal to this new file.

2. Step 1: Create a new component to render the h1 element and buttons.  The Counter component will render the h1 and buttons as before, except that the count amount will come from state.

3. Challenge is to create 3 methods to handle the button clicks, log that the buttons have been clicked, and bind the buttons in component constructor.

## Adding state to the Counter App, Part 1

1. In this section we'll go through the above 5 steps to add state to the app.

2. Default state object: set count to 0 (step 1 and step 2) - set in the constructor where the state object is set with the counter attribute.  Use this.state in the h1 element tag as an expression.

3. Steps 3-5 is to wire up a button to change state.  If you try to change state directly, e.g. this.state.count++, you will see that the value of count does increase, but it does not cause the component to re-render.  You need to use setState() to update the state object.  setState takes a function that returns an object.  There is a input parameter that you can name anything, in our case, we named it prevState - that allows access to the previous state object before it's changed.

4. If your state object has multiple attributes, you don't need to set all of them in setState.

5. Challenge is to wire up handleMinuesOne.

6. Lastly, wire up handleReset by calling setState where no prevState is needed.

## Alternative setState syntax

1. The older and obsolete syntax is/was to pass in an object to setState.  This is not the preferred method and may go away permanently at some point.

2. this.setState is asynchronous, so in the following lines, this.state.count refers to the old value, not count = 0;
```
this.setState( {
    count: 0
    });
this.setState( {
    count: this.state.count  + 1
    })
```

## Build It: Adding State to VisibilityToggle

1. Challenge is to add state to the VisibilityToggle app.

## Indecision State, Part 1

1. Rework the Indecision App to use state, starting with adding the constructor.  Add the state object that includes the options array.  Reference this array instead of the local options array - adding the dummy data to the state version for initial testing.

2. Actions shows the button when there are options available.  We could pass the entire array to Actions, but all it really needs is a bool indicating there are options available. - see the 'hasOptions' attribute.

3. When state changes in the child, we need a way to pass the state change to the parent.  To handle this, we will pass functions as props (e.g. callback functions).  See handleDeleteOptions.  Challenge is to repeat the changes for handleDeleteOptions for handlePick.  We'll use the onMakeDecision from jsx-indecision.js and the current handlePick method inside Actions can be removed..

## Indecision State, Part 2

1. Here we will pass data upstream.  Last time we used a callback function as a prop to allow children to change the state of the parent.  See handleAddOption.

2. In the case of handleAddOption, we call it within a separate class method since extra steps are needed to obtain and check the data on the form before we call the function.  To do so, we also needed to bind the local handleAddOption method, which means the addition of a constructor.

3. You can't use 'push' to add the option on the state options since this would change the state directly - instead we need to create a new array - use concat instead.

4. Added validation to handleAddOption in IndecisionApp and then handle those errors by adding state to the AddOption component.  By default, error = undefined.  This is also the case if there is no error, since in that case, handleAddOption in IndecisionApp doesn't return anything.


## Summary - Props vs State

1. Nothing new here.
End of this section.
