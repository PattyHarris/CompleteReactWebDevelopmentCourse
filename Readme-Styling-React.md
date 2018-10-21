# Styling React

## Setting up Webpack with SCSS

1. To start, add a folder "styles" with a new file styles.css.

2. In styles.css, add  the universal selector "*" and add the color red - this to get everything working in webpack.  

3.  To the webpack.config.js file, we need to add a new rule to handle styles files (e.g. .css or .scss) files.
Add  a new object to the rules array, starting with the "test" to target all files that end in "css":
```
rules: [
    {
        test: /\.css$/
    }
]

```

4. We need to add 2 CSS related packages:
a. The loader - see www.npmjs.com/package/css-loader which loads in the CSS assets and converts them into a JS representation of that CSS.
b. Style loader - see www.npmjs.com/package/style-loader which injects the CSS into the DOM by adding a <style> tag.

5. To install the loaders:
```
> yarn add style-loader@0.18.2 css-loader@0.28.4
```
Instead of using "loader", we will use "use" which allows for an array of loaders:
```
rules: [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
]
```

6. Import the styles.css file in app.js which at this point, changes all the font to red:
```
import './styles/styles.css';
```
NOTE: this import is very inefficient and will be changed later.

7. Next will setup SCSS - see sass-lang.com.  From the "Learn SASS" and then "Variables" menu,  there's examples of the different usages of SCSS and SASS, e.g. {} and ";" as opposed to no {} and no ";".  This class will be using SCSS - e.g. {} and ";".

8. The file style.css is changed to style.scss and in the webpack.config.js, change the test for "css" to "scss".
In the styles.scss file, add the variable for "brand-color" - now the simple SCSS has the following code:
```
$brand-color: blue;

* {
    color: $brand-color;
}
```
9. For SCSS, we need another loader and compiler (as we did with babel and babel-core):
```
yarn add sass-loader@6.0.6 node-sass@4.5.3
```
And then in webpack.config.js, add the new loader:
```
{
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}
```
With these changes in place, the font is blue.

## Architecture and Header Styles

1. As with the components, we will break up the styles into different files, starting with "base".
NOTE: "partial" SCSS files begin with "_".  When the partial is imported, you leave off the extension and the underscore, e.g. to import _base.scss in the "base" folder:
```
@import 'base/base'
```

2.  Inside _base.scss, we set up a number of "base" type styles, including fonts.

3. In this course we will use "rem" instead of "px" since "rem" has better accessibility.  To convert rem's into base 10, we set a global font-size to 62.5%.   For example, if 1 rem = 16px, 16*.625 = 10 - so we end up using a base 10 system.  Likewise, 2.2 rem's converts to 22 px.  Setting the body font-size to 1.6 rem = 16px.

4. Add a "components" folder to the "styles" folder where all the SCSS files per component will reside, starting with the header file (partial file) - it will need to be imported as with the base partial.

5. Add the header style to the header component div tag - recall that we need to use "className" in JSX.

6. Instead of using nested selectors like this:
```
.header {
    h1 {

    }
}
```
We will use separate selectors using BEM - block element modifier - notation, e.g. .header__title (note the double underscore) - here we're modifying an element of the header bloc (see getbem.com for more information):
e.g.
```
.header {

}
.header__title {

}
```
## CSS Reset

1. All browsers have a different set of default values.  If we don't reset them, they will behave differently.  To fix that, we will use a plugin, in this case, Normalize.css (see https://necolas.github.io/normalize.css/):
```
> yarn add normalize.css@7.0.0
```

2. Use use the normalize.css module, we need to make a couple of changes:
a. Import the file from the node_modules folder in app.js - note that it's imported BEFORE the styles file.
```
import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

```
b. We need to fix our webpack.config.js since we're currently only allowing for .scss files.  If we change the "test" to "/\.s?css$/" the first "s" is optional, allowing for both .scss and .css files.

## Theming with Variables

1. Here we're going to break out common values that are used all over the application - for example hex color codes and common spacing values (e.g. 1.6rem).  The variables will be located in a new file /base/_settings.scss.

2. Import the new file _settings.scss as the first import in styles.scss.  

3. First variables added were for the hex-colors, $off-white and $off-black.
Challenge is to add a new variable, m-size (for medium size) as we had done for the $off-black and $off-white colors.

4. Create a _container.scss to center all the content on the screen - this was put in the "components" folders - seems like this should have gone in the base folder....

5. In the Header component, we only want to center the text and not the blue bar behind it - we have to add another div tag that will use the "container" class.  Repeat this same thing in the IndecisionApp component to center everything except the OptionModal component.

6. Challenge is to create a new variable "dark-blue" that will change the body background color - here we just needed to add a background-color to the body element defined in _base.scss....

## Big Buttons and Options List

1. Styling the big button - add a new file under components - _buttons.scss with a class big-button.  
The purple color is added to _styles.scss.   In the big-buttom class, we use the SCSS function "darken" to add a darker border to the bottom of the buttom to add a 3-D effect.  For documentation, search for "sass reference functions".  See the list of HSL functions (Hue Saturation Lightness).

2. To make the button look disabled, we use the built in "disabled" class and change the opacity:
```
.big-button:disabled {
    opacity: .5;
}
```

3. To add the pointer to enabled buttons and the default cursor to disabled buttons, the following was added to the _base.scss:
```
button {
    cursor: pointer;
}

button:disabled {
    cursor: default;
}
```

4. Using the BEM naming convention, we added a modifier to the .button class - in this case, the modifier name is attached to the block (in this case "button", which is a poorly named class) by 2 dashes, e.g. .button--link.   To use the latter modifier class, see this usage in the Options component:
```
<button
    className="button button--link"
    onClick={props.handleDeleteOptions}
>
    Remove All
</button>

```
## Styling the Options List

1. To handle styling the Options list, add a new file _widget.scss in the components folder and import as required.

2. To test and use the initial widget-header style, the Options component button is moved into it's own 'div' tag along with a new 'H3' tag.

3. To get the "Your Options" and "Remove All"  to appear on the same line and pushed to the left and right respectively, we use flexbox.  To do this, 2 properties are needed, display=flex and justify-content=space-between, where in the latter, all extra space is distributed evenly between the 2 elements:
```
    display: flex;
    justify-content: space-between;
```

4. Challenge is to add a element selector to reduce the amount of space around the H3 header element used in the Options component.  Using the BEM notation (block is header, element is title):
```
.header__title {
    margin: 0;
}
```

5. The background color for the widget style is added to the IndecisionApp component around the Options and AddOption components so that those entire blocks are the light blue color - although "blue" looks more purple to me.

6. Challenge is to style the message text that says "Please add an option to get started!":
a. Create a widget element selector (message) and use it on the "p" tag.
b. Set the color to $off-white
c. No margin
d. Use a padding of $l-size.
e. Center the text - e.g. text-align=center
f. Set the bottom border to a 1px solid border - color is a lighted version of the $light-blue (10% lighter).


## Styling the Option Item

1. Add a new file to the components folder, _option.scss to hold all the styles for the Option component - that includes the text and remove button.  In the option block, like we did previously, we'll use "flex" to evenly distribute the space.

2. To add a count number before each item in the list, map function in the Options component is modified to use the "index" parameter - then use the index + 1 as a new prop to the Option component.  Then in the Option component, place the text in a "p" tag with the count prop.

3. To handle the form (text, edit box, and button), add a new partial file _add-option.scss.

4. The input box uses flex and resizes with the window size, the button size remains the same.

5. Note: in the comments, there's an issue with text that's too long for the input - it will override the text area.  This solution was applied to the option__text style:
```
{
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 80%;
}
```

6. To make the input take up all available space:
```
.add-option__input {
    flex-grow: 1;
}
```

7. To add a border just to the bottom, first set the border to "none" and then style the border bottom.

## Styling React-Modal

1. To style this third party code, Andrew uses the Google debug to see what classes are used by the react-modal component.  We'll be modifying these classes to make the modal look like we want.

2. Create a new file _modal.scss in the components folder and import as usual.  The first class targeted is the ReactModalPortal.  Changing the opacity to 0 allows us to transition the modal's appearance gradually - that is, a opacity=0 means it doesn't initially appear....

3. The transition occurs in the ReactModal__Overlay style where we transition using the opacity property:
```
.ReactModalPortal .ReactModal__Overlay {
    transition: opacity 200ms ease-in-out;
}
```

We set the opacity to 1 in the modifier ReactModal__Overlay--after-open - note again you can see all these classes once the modal is shown.  We're modifying the existing class styles.
```
.ReactModalPortal .ReactModal__Overlay--after-open {
    opacity: 1;
}
```

4. To modify how the modal closes, we first added another property to the modal, closeTimeoutMS and set it to 4000 (e.g. 4 seconds) so we could see the classes that are available while the modal is closing.  We then set the latter property to 200 and added to our styles the ReactModal__Overlay--before-close to set the opacity back to 0:
```
ReactModalPortal .ReactModal__Overlay--before-close {
    opacity: 0;
}
```

5. To modify the contents of the react-modal, use the property "className" - e.g. here we define a new class "modal":
```
<Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
>

```

This gets a bit complicated since I'm not sure who could really easily figure this out...anyway, now that we've replaced the styling, we have to go back to the overlay override, and add some positioning styling using flex (top 3 styling attributes are flex):
```
.ReactModalPortal .ReactModal__Overlay {
    align-items: center;
    display: flex;
    justify-content: center;
    transition: opacity 200ms ease-in-out;
}
```

At this point, you end up with a tiny dialog in the middle of the screen with text centered.

6. The issue with word break is addressed by Andrew using word-break=break all.  This fixes the issue in the dialog and in the options list (see option__text)
```
modal__body {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 0 $l-size 0;
    word-break: break-all;
}
```
## Mobile Considerations
