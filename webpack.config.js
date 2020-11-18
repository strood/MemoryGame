// Our base level config which we customize to allow greater flexibility in our
// configs, by instead using different scripts and commands to call different
// cofigs, therefore running in a diff environment we have set up within that config file.

// Our base config environment, and the merge method to combine it with others
const commonConfig = require('./build-utils/webpack.common');
const {
  merge
} = require('webpack-merge');

// Takes our addons and compose them onto package independently
const addons = (addonsArg) => {
  // Takes str or array, handles normalize here
  let addons = []
    .concat.apply([], [addonsArg]) //normalize array of addons (flatten)
    .filter(Boolean); // If adons undefined, filter it out

  // Return list or individual addons we have flagged
  return addons.map((addonName) => require(`./build-utils/addons/webpack.${addonName}.js`));
};

// Our config object
module.exports = (env) => {
  if (!env) {
    throw new Error("You must pass an --env.env flad into your build for webpack to work");
  }
  console.log(env); // Log env vars we pass in
  console.log(env.env);

  // Grabs the env we are requesting...
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);

  // ...compose it alongside the common config. We do this will webpack-merge
  const mergedConfig = merge(commonConfig, envConfig, ...addons(env.addons));

  console.log(mergedConfig); 

  // return our fully merged config
  return mergedConfig;
}
