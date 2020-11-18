// Basiuc pattern to be passed if we call for dev environment
const config = {
  mode: 'development',
  // webpack.js.org/configuration/devtool for further options
  devtool: 'inline-source-map', //Adds source map inline in our bundle.js file
  module: {
    rules: [
      {
        // Chain together loaders on certian files
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
