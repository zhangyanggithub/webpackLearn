const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
    print: "./src/print.js",
  },
  devServer: {
    contentBase: "./dist",
    port: 9000,
    // hot: true,
    hotOnly: true,
    // open: true,
    // inline: false,
    headers: {
      "X-Custom-Foo": "bar"
    },
    // https: true,
    index: 'index.htm'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/'
  },
  devtool: "inline-source-map",
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   hot: true,
  //   compress: true,
  //   port: 9000
  // },
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
      inject: "body",
      title: "output management",
      filename: "index.htm",
      appMountId: "app"
    }),
    new CleanWebpackPlugin(["dist"]),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./public/"
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ]
};