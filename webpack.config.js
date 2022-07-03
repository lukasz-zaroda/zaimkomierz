// webpack.config.js
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require('path');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  resolve: {
    extensions: ['.js'],
    alias: {
      jquery: 'jquery/src/jquery',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // Order of postcss-loader and resolve-url-loader matters.
          // See: https://github.com/postcss/postcss-loader/issues/340
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: 'postcss.config.js'
              },
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                sourceMap: true,
                sourceMapContents: false
              },
            },
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[name].[ext]',
              esModule: false,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(eot|woff2?|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[ext]',
              esModule: false,
            },
          }
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      }
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BASEPATH: JSON.stringify(''),
    }),
    new LiveReloadPlugin({
      protocol: 'http',
      hostname: 'localhost',
      port: 35729,
      appendScriptTag: true,
    }),
  ]
};
