const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js'
    // index: ["webpack-hot-middleware/client?noInfo=true&reload=true", './src/index.js']
    // another: './src/another_module.js'
    // math: "./src/math.js",
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
    },
    namedModules: true
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/'
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
        use: ["vue-loader"]
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
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./public/"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};