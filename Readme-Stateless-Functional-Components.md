# Stateless Functional components

1. Many of the existing class-based components in the IndecisionApp can be made into stateless functional components.  These will be eventually switched over to this type.

2. Stateless functional components are just functions - the first letter is capitalized as with the class-based components.  Recall that JSX uses the first letter to differentiate HTML elements from functions and classes. The functions return some JSX - e.g.
```
const User = () => {
    return (
        <div>
            <p>Name: </p>
            <p> Age: </p>
        </div>
    );
};
```

2. Properties are passed into these components as a props object with key/value pairs - e.g.
```
const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p> Age: </p>
        </div>
    );
}

ReactDOM.render(<User name='John' />, document.getElementById('app'));

```

3. First, convert Action to a stateless functional component.  The challenge is to make the same changes to Header, Option, and Options:
    - change the class to const ClassName = (props) =>
    - remove the render call.
    - remove any 'this.' since it's a function, not a class....

## Default Prop Values

1. Default prop values are an object assigned to the class or stateless function.  The following is added following the definition of the stateless functional component:
```
Header.defaultProps = {
    title: 'Some default'
}
```
If no title is passed into Header, 'Some default' will show instead.  

2. Change the IndecisionApp such that the title has a default of Indecision and therefore, is not passed into the Header component.

3. For the subtitle, add a conditional check that will make sure the subtitle exists before outputting the h2 tag.

4. You can add default props to the main component (IndecisionApp) by allowing input of an options array that contained default values - e.g. key/value pairs.  For example,  the following changes would pass in options:
```
this.state = {
    options: props.options
}

// Then below the component definition:
IndecisionApp.defaultProps = {
    options: []
}

// and lastly, when calling the component:
ReactDOM.render(<IndecisionApp options={['Option one', 'Option two']}/>, document.getElementById('app'));
```

5. Challenge is to add a default prop to the counter example.  If there is a default prop, use it, otherwise, show zero.

## React Dev Tools

1. React Developer Tools - already installed from before - you'll see the React tab in the Developer Tools.

2. The $r is shown on the active component when looking at the React tab - you can type in $r in the console view and it will show all the details of that component.

## Removing Individual options

1. To return an object using the single line version of arrow functions, you have to wrap the {} in (), e.g.

```
handleDeleteOptions() {
    this.setState( () => ( { options: [] } ) )
}
```

2. Challenge is to repeat the above for both handleAddOption methods.

### Adding a remove button to each item

1. First create a new method handleDeleteOption that will remove a single option (make sure to bind).

2. We don't have direct access to Options (since it's a child of Option), so we'll pass handleDeleteOption to Options which will in turn pass the callback onto the Option component.  Later in the course Andrew will discuss an alternative to using this chain mechanism.

3. If we just set onClick={props.handleDeleteOption}, the option passed to this function is the event object, which is not what we want.  To pass the entered text back up the chain, there's a couple of ways to do this:

a. First way is to create an inline arrow function in the onClick expression:
```
<button
    onClick={ (e) => {
        props.handleDeleteOption(props.optionText);
        }}
>
remove
</button>
```

b. Secondly, when handleDeleteOption is called, we will return a state object with an options array where the passed in option has been filtered out (e.g. using filter).  Filter takes a callback function which returns true of false.  If the check returns false, the item is not added to the result array.

## Lifecycle methods

1. At this point, we'll use local storage to capture data between page views.  Later, we'll use a database.

2. Added lifecycle methods: componentDidMount, componentDidUpdate.  The latter has arguments for the previous props and previous state (e.g. prevProps and prevState) - again, you can call these whatever you like.  componentDidUpdate is also called no matter if the data has changed or not - meaning, if you call "remove all" on a empty options array, componentDidUpdate will still be called - compare the prev and current options array lengths and save the data accordingly.

3. componentWillUnmount is rarely used, but we'll add it.  This gets called when you switch pages (in a multi-page app).   To fire this method, type in the console:
```
> ReactDOM.render(React.createElement('p'), document.getElementById('app'));
componentWillUnmount
<   <p></p>
```

This replaces the current page, with a blank page (with a 'p' tag);

4. In componentDidMount we will fetch data.  In componentDidUpdate we will save data.

## Saving and Loading Options data

1. localStorage is a key/value pair database that persists across page loads.  For example:
```
> localStorage.setItem('name', 'Andrew');
> localStorage.getItem('name')
< Andrew
```

2. localStorage only saves string data - even if you save a number, it will convert it to a string.

3. To store the options data, we'll store it in JSON.  JSON.stringify will be used to convert the object to a string, JSON.parse will be used to convert the JSON back to an object.

4.  Once we've stored options into localStorage, you can test it from the console:
```
> localStorage.getItem('options');
< "["1","2","3"]"
```

5. To clear local storage (works from the console too), use localStorage.clear().  

6. If localStorage is empty, NULL is returned.  'parse' accepts NULL and returns NULL.  If the JSON is invalid, 'parse' will throw...

7. Tweak #1: clear the input if there are no errors - see handleAddOption.

8. Tweak #2: If there are no options, added a message alerting the user to add an option to get started.

## Saving and Loading the counter

1. Here we're adding lifecycle and localStorage to the Count app.

2. We don't need to make use of stringify or parse, since we're not working with an array object, but we do need to use parseInt to convert the string into a number, e.g. parseInt('12', 10).  Note that if the string doesn't represent a valid number, parseInt will return NaN (not a number).  To check for NaN, use the function, isNaN.
