/* eslint-env amd, node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = env => {
	const production = env && env.production;
	const analyze = env && env.analyze ? [new BundleAnalyzerPlugin()] : [];
	const miniCssExtractPlugin = production
		? [
			new MiniCssExtractPlugin({
				chunkFilename: '[name].[contenthash].css',
				filename: '[name].[contenthash].css',
			}),
		]
		: [];
	const compression = production
		? [
			new CompressionPlugin({
				filename: '[path][base].gz[query]',
				algorithm: 'gzip',
				test: /\.js$|\.css$|\.html$/u,
				minRatio: 1,
			}),
			new CompressionPlugin({
				filename: '[path][base].br[query]',
				algorithm: 'brotliCompress',
				test: /\.(js|css|html|svg)$/u,
				compressionOptions: { level: 11 },
				minRatio: 1,
			}),
		]
		: [];
	const plugins = [
		new ESLintPlugin({
			extensions: ['ts', 'js', 'tsx', 'jsx'],
		}),
		new CleanWebpackPlugin(),
		new StyleLintPlugin({
			files: '**/*.(le|c)ss',
		}),
		...analyze,
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		...miniCssExtractPlugin,
		...compression,
		new CopyPlugin({
			patterns: [
				{ from: 'favicon/*', context: path.resolve(__dirname, 'public') },
				{ from: path.resolve(__dirname, 'public', 'manifest.webmanifest') },
				{ from: path.resolve(__dirname, 'public', 'browserconfig.xml') },
			],
		}),
		new InjectManifest({
			swSrc: path.resolve(__dirname, 'src/workers/service-worker.ts'),
			swDest: 'service-worker.js',
			maximumFileSizeToCacheInBytes: 5000000,
		}),
	];

	return {
		mode: production ? 'production' : 'development',
		entry: [
			'./src/index.tsx',
		],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: production ? '[name].[contenthash].js' : '[name].js',
			globalObject: 'self',
		},
		devtool: production ? 'source-map' : 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/u,
					exclude: /node_modules/u,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
										useBuiltIns: 'usage',
										corejs: '3',
									},
								],
								'@babel/preset-typescript',
								'@babel/preset-react',
							],
							plugins: [
								'@babel/plugin-proposal-class-properties',
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/plugin-syntax-dynamic-import',
							],
						},
					},
				},
				{
					test: /\.(css|less)$/u,
					use: [
						production ? MiniCssExtractPlugin.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 2,
							},
						},
						'postcss-loader',
						{
							loader: 'less-loader',
							options: {
								lessOptions: {
									paths: [
										path.resolve(__dirname, 'src/'),
									],
								},
							},
						},
					],
				},
				{
					test: /\.(png|jpg|gif)$/u,
					type: 'asset/resource',
				},
				{
					test: /\.svg/u,
					type: 'asset/inline',
				},
			],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
				'.jsx',
				'.mjs',
			],
			alias: {
				'~': path.resolve(__dirname, 'src/'),
			},
		},
		devServer: {
			server: 'https',
			allowedHosts: ['.mapy.cz', 'localhost', 'auto'],
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			historyApiFallback: true,
			proxy: {
				'/poiagg': {
					target: 'https://pro.mapy.cz/',
					secure: false,
				},
				'/auth': {
					target: 'https://mapy.cz/',
					changeOrigin: true,
					withCredentials: true,
					secure: false,
				},
				'/logout': {
					target: 'https://mapy.cz/',
					changeOrigin: true,
					withCredentials: true,
					secure: false,
				},
			},
			port: 4444,
			host: '127.0.0.1',
			hot: false,
			client: false,
		},
		plugins,
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true,
				}),
				new CssMinimizerPlugin(),
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/u,
						chunks: 'initial',
						name: 'vendor',
						enforce: true,
					},
				},
			},
		},
	};
};

module.exports = config;
