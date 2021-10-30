const webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { merge } = require('webpack-merge');

module.exports = merge(CommonConfig, {
  mode: "development",
  performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
  },
  plugins: [
	// create global constant
	new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),    
	// Minify JS
    /*new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),*/
	new UglifyJSPlugin()
  ]
})