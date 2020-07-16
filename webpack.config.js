/*eslint-disable @typescript-eslint/no-var-requires*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool:  process.env.NODE_ENV === 'production' ? false : 'source-map',
  devServer: {
    contentBase: './dist',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/example/index.html",
      filename: process.env.NODE_ENV === 'production' ? 'example/demo.html' : 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/types/vNerveTransmitter/index.js', to: 'types/vNerveTransmitter/index.js' },
      ],
    }),
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: ''
      }),
    ],
  },
  output: {
    library: 'NeuronWire',
    filename: 'NeuronWire.js',
    libraryTarget: 'umd',
    globalObject: `typeof self !== 'undefined' ? self : this`,
    path: path.resolve(__dirname, 'dist'),
  },
};
