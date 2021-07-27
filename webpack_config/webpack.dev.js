const path = require("path");
const {merge} = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				// exclude: /node_modules(\\|\/)@pixi-spine/,
				use: ["source-map-loader"]
			}
		]
	}
});
