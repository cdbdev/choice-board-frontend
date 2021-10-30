const { VueLoaderPlugin } = require('vue-loader')
var path = require('path');
var publicPath = '/build/';


module.exports = {
	entry: './src/main.ts',
	output: {
		path: path.join(__dirname, publicPath),
		filename: 'bundle.js',
		publicPath: publicPath
	},
	resolve: {
		// contains the extension Webpack will use to search a file when an import statement is found in a program
		// For example: import x from './y' will resolve in the lookup of ./y.ts and ./y.js
        extensions: [ '.ts', '.js' ],
    },
	module: { 
		rules: [ 
			{ 
				test: /\.ts$/, 
				exclude: /node_modules/, 
				use: [ 
						{
							loader: 'ts-loader',
							options: {
							   // append a ".ts" file to all ".vue" file thus typescript can preprocess the file
							   appendTsSuffixTo: [/\.vue$/]
							}
						}
				]
			} ,
			{ 
				test: /\.vue$/, 
				use: [
						{
							loader: 'vue-loader' ,
							options: {
								esModule: true
							}
						}
				]
			},
			{
				test: /\.css$/,
				use: [
						{
							loader: 'style-loader'
						}, 
						{
							loader: 'css-loader'
						}
				]
			},
			{
                test: /\.(png|jpe?g|gif)$/i,
                use: 'file-loader?name=[name].[ext]',
            }
		] 
    },
	resolve: {
		extensions: ['.ts', '.vue', '.js', '.css'],
		alias: {
			vue: 'vue/dist/vue.min.js'
		}
	},
	plugins: [
		// make sure to include the plugin!
		new VueLoaderPlugin()
	]
};