var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  entry: "./_src/index.js",
  output: {
    path: path.join(__dirname, "./assets/build/"),
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
      },    
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader'],
      },
    ]
  }
};