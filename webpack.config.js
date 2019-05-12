const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const {
  VueLoaderPlugin
} = require('vue-loader');

const entries = {};
const fileNames = require('./entry/entries.js');
Object.keys(fileNames).forEach(file => {
  entries[file] = `./entry/allEntries/${file}.js`;
});

module.exports = {
  mode: "development",
  entry: "index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
    },
    namedModules: true
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    hotOnly: true,
    compress: true,
    port: 9000
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: "body",
      title: "output management",
      filename: "page.html",
      appMountId: "app"
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./public/"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};