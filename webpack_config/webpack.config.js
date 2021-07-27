const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const checkEnv = (name) => process.env.NODE_ENV === name;

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: "ts-loader",
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								compileType: "icss"
							}
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [["autoprefixer"]]
							}
						}
					},
					"sass-loader"
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/"
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.js"
	},
	plugins: [
		new webpack.DefinePlugin({
			LOCAL: checkEnv("LOCAL"),
			DEVELOPMENT: checkEnv("DEVELOPMENT"),
			QA: checkEnv("QA"),
			STAGE: checkEnv("STAGE"),
			PRODUCTION: checkEnv("PRODUCTION")
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true
				}
			}
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "App",
			template: "./index.html",
			filename: "./index.html",
			hash: true
		})
	]
};
