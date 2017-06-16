var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: ['bootstrap-loader', 'font-awesome-webpack', './app/app.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ising.js'
	},
	devServer: { hot: true },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			}, {
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			}, {
				test: require.resolve("jquery"),
				loader: "imports-loader?jQuery=jquery"
			}
        ]
	}, plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	]
};
