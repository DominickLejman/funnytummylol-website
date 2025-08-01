const path = require('path');

module.exports = {
  entry: './src/main.js',       // Your main js file that imports three.js
  mode: 'production',           // or 'development' for easier debugging
  output: {
    filename: 'bundle.js',      // The bundled output file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      // Add loaders here if you have CSS or other assets
    ],
  },
};
