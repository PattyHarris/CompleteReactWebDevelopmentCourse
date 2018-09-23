// entry -> output

// Use the node.js built-in function to access the node.js path module.
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
};

//  11:20
