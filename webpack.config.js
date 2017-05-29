var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './demo/bootstrapper.ts',
  output: {
    path: __dirname + '/build/web',
    filename: 'demo-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/material-components-web/dist/material-components-web.css', to: 'material-components-web.css' }
    ])
  ],
  devServer: {
    contentBase: __dirname + '/public',
    port: 9000,
    historyApiFallback: {
      index: '/index.html'
    }
  }
};