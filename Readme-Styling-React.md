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
