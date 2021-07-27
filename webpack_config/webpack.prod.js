const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {merge} = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				terserOptions: {
					output: {
						comments: false
					}
				},
				extractComments: false
			})
		]
	}
});
