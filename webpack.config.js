const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: 'ts-loader'}
        ],
        exclude: /node_modules/
      }
    ]
  }
};
