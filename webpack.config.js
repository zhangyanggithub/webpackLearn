const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.js",
    // math: "./src/math.js",
  },
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 9000
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
  //   hotOnly: true,
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
      inject: "body",
      title: "output management",
      filename: "index.html",
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