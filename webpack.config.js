var path = require("path");

module.exports = {
  entry: "./_src/index.js",
  output: {
    path: path.join(__dirname,"./assets/build/"),
    filename: "bundle.js"
  },
  module: {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    }
    ]
  }
};