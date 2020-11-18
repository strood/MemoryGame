const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

// Simple example of addon pluin we can use. These are oneoff tests we can implement
// without messing up our normal dev, prod or common config environments
module.exports = {
  plugins: [
    new WebpackBundleAnalyzer()
  ]
};
