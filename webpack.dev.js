const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = merge(CommonConfig, {
  mode: "development",
  devServer: {
    port: 8100,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false
  }
})