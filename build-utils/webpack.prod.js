// Prod vars to be passed if we call for prod environment

const zlib = require('zlib');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const config = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i })],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      test: /\.(js|html|css)$/,
      // threshold: 780, if not compressing, lower threshold to see in action
      threshold: 10240,
      minRatio: 0.8,
      algorithm: 'gzip',
    }),
  ],
};

module.exports = config;
