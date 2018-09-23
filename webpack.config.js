const {resolve} = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {}
						}
					]
				}
			]
		},
		  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
	  files: ["**/*.html", "**/*.js"]
    })
  ]
	}
};