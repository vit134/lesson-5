const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/client',
	entry: {
		index: './scripts/index',
		branch: './scripts/branch',
		commit: './scripts/commit'
	},
	output: {
		path: __dirname + '/dist/scripts/',
		filename: '[name].js',
		library: '[name]'
	},
	//watch: NODE_ENV === 'development',
	watch: false,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : null,

	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),

	]
};
