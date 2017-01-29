var path = require('path');
var webpack = require('webpack');

//import {
//  dependencies as externals
//} from './app/package.json';

module.exports = {
	entry: ['babel-polyfill', './js/main'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}, {
				// Do not transform vendor's CSS with CSS-modules
				// The point is that they remain in global scope.
				// Since we require these CSS files in our JS or CSS files,
				// they will be a part of our compilation either way.
				// So, no need for ExtractTextPlugin here.
				test: /\.css$/,
				include: /node_modules/,
				loaders: ['style-loader', 'css-loader'],
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
			}, {
				test: /\.(jpg|png|gif)$/,
				loaders: [
					'file-loader',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
				],
			}, {
				test: /\.html$/,
				loader: 'html-loader',
			}, {
				test: /\.(mp4|webm)$/,
				loader: 'url-loader?limit=10000',
			}
		]
	},
	stats: {
		colors: true
	},
	resolve: {
		modules: [path.resolve('./js'), 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [],
	devtool: 'source-map',
	//externals: Object.keys(externals || {})
};
