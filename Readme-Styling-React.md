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

7. Next will setup SCSS:
