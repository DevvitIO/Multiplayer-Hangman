const {resolve} = require('path');

module.exports = env => {
	console.log(env);
	return {
		entry: './src/index.js',
		output: {
			path: resolve('dist'),
			filename: "bundle.js",
			publicPath: 'dist/',
			pathinfo: !env.prod,
		},
		devtool: env.prod ? "source-map" : 'eval',
		module: {
			loaders: [
				{test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
				{
					test: /\.scss$/,
					loaders: ["style-loader", "css-loader", "sass-loader"]
				}
			]
		}
	}
};