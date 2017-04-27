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
  devServer: {
    contentBase: __dirname + '/public',
    port: 9000,
    historyApiFallback: {
      index: '/index.html'
    }
  }
};