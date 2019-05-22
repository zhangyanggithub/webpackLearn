const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const {
  VueLoaderPlugin
} = require('vue-loader');
const glob = require('glob');

const entries = glob.sync(path.resolve(__dirname, '/entry/allEntries/**')).reduce((obj, file) => {
  const fileName = file.replace('.js', '');
  obj[fileName] = fileName;
  return obj;
}, {});

entries['test'] = './src/index.js';

module.exports = {
  mode: "development",
  entry: entries,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/__webpack_hmr/'
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
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      basePath: "./public/"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};