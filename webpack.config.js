const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'njdesktop.js',
    path: path.resolve(__dirname, 'dist'),
  },
};