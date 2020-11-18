// Here we will store common paths in our filesystem
// To help us when linking code/modules.
const path = require('path');

module.exports = {
  outputPath: path.resolve(__dirname, '../', 'dist'),
};
