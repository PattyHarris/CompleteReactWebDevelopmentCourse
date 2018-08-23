// Counter app
let count = 0;
const addOne = () => {
    count ++;
    renderCounterApp();
}

const minusOne = () => {
    count --;
    renderCounterApp();
}

const reset = () => {
    count = 0;
    renderCounterApp();
}


const appRoot = document.getElementById('app');

// Render the above - you need to specify the JSX you want to render  and the DOM
// element you're rendering to.

// Function to automatically re-render the Counter app when a button
// is clicked (and on start up);

const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>reset</button>
        </div>
    );
    ReactDOM.render(templateTwo, appRoot);
}

// Call the function on start up.
renderCounterApp()
