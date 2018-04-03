/**
 * Config
 */

const sass = {
  file: './src/scss/site-default.scss',
  outDir: process.env.npm_package_config_style_bundle_dir,
  outFile: process.env.npm_package_config_style_bundle,
  sourceMapEmbed: true,
  includePaths: [
    './node_modules', './src'
  ]
};

const modules = [
  sass,
  {
    file: './src/objects/feed/_feed.scss',
    outDir: process.env.npm_package_config_style_bundle_dir + 'modules/',
    outFile: 'feed.css',
    sourceMapEmbed: sass.sourceMapEmbed,
    includePaths: sass.includePaths
  }
];

module.exports = modules;