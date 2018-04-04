/**
 * Config
 */

const sass = {
  file: './src/scss/site-default.scss',
  outDir: process.env.npm_package_config_style_bundle_dir,
  outFile: process.env.npm_package_config_style_bundle,
  sourceMapEmbed: true,
  precision: 2,
  includePaths: [
    './node_modules', './src'
  ]
};

const modules = [
  sass,
  {
    file: './src/objects/feed/_feed.scss',
    outDir: './dist/objects/feed/',
    outFile: 'feed.css',
    outputStyle: 'compressed',
    precision: sass.precision,
    includePaths: sass.includePaths
  }
];

module.exports = modules;