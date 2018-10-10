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

2.
