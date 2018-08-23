
/*
    This "Build It" lesson has the following requirements:
    1. Show a title, Visibility Toggle
    2. Show a button that switches between Show detail and Hide detail.
    3. When the "show" button is clicked, show some detail and change the label
    to "hide".  Likewise, when the "hide" button is clicked, hide the detail and change
    the label back to "show".

    To render this page, change babel to use this page using the following command:
    >babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch

*/
const appRoot = document.getElementById('app');

let isDetailShowing = false;

const onShowDetail = () => {
    isDetailShowing = !isDetailShowing;
    renderVisiblityApp();
}

const renderVisiblityApp = () => {

    let showDetail;

    // This could be a function as well....this is better - revert back to using
    // the ternary for the button label, and then use the following for the
    // paragraph:
    // {isDetailShowing && (
    //    <div>
    //        <p>Hey, These are some details you can now see!</p>
    //   </div>
    //    )};

    if (isDetailShowing) {
        showDetail =  (
            <div>
                <button onClick={onShowDetail}>Hide detail</button>
                <p>Hey. These are some details you can now see!</p>
            </div>
        )
    }
    else {
        showDetail = <button onClick={onShowDetail}>Show detail</button>
    }

    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            {showDetail}
        </div>
    );

    ReactDOM.render(template, appRoot);
}

// Call the function on start up.
renderVisiblityApp()
