# MemoryCard Game

Memory Game build with React, using photos from Pexels API.

[Live Demo](www.github.com/strood) <-- Try it out!

### Setup basic project structure

    |webpack-demo
    |- /dist <- output as specifed in webpack.common.js
      |- main.bundle.js <- output from npm run build aka webpack.
      |- index.html <- output from html-webpack-plugin
      |- *More random files will apear here based on our config*
    |- /src
      |- index.js - app/webpack entry point.
    |- /build-utils
      |- /addons - area to add additional situational config/envs
        |- webpack.bundleanalyze.js -demo addon example
        |- webpack.firstplugin.js -demo plugin build area
      |- common-paths.js
      |- webpack.common.js -Common webpack configs
      |- webpack.dev.js -dev only config
      |- webpack.prod.js -prog only config
    |- webpack.config.js - Points to the build utils we are using
    |- package.json - Scripts, dependencies and package info.

    |- general.package.json -Demo package.json file w/ examples
    |- general.webpack.config.js - Demo config examples
    |- /node_modules - Our node modules
