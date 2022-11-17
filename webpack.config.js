const path = require('path');

const config = {};

const distConfig = {
  name: "njdesktop",
  entry: "./standalone.js",
  output: {
    filename: 'njdesktop.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

const demoConfig = {
  name: "njdesktop-demo",
  entry: "./demo/index.js",
  output: {
    filename: 'njdesktop-demo.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = [
  distConfig,
  demoConfig
];