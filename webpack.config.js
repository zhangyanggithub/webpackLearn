const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const {
  VueLoaderPlugin
} = require('vue-loader');

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
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
  // modules: ["node_modules"],
  // alias: {
  //   Templates: path.resolve(__dirname, 'src/templates/')
  // },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    hotOnly: true,
    compress: false,
    proxy: {
      '/apiMock': {
        target: 'https://baike.baidu.com/', // ucActiv/ity/api/thriftApi/base/CityInfoThriftService/getCityPartnerInfo.ajax
        pathRewrite: {
          '/apiMock': 'item/%E8%8A%B1/9980053?fr=aladdin'
        },
        changeOrigin: true
      },
      '/apiServer': 'http://localhost:3001'
    },
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