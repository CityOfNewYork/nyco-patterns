/**
 * Dependencies
 */

const resolve = require('@rollup/plugin-node-resolve'); // Locate modules using the Node resolution algorithm, for using third party modules in node_modules.
const commonjs = require('@rollup/plugin-commonjs');    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
const replace = require('@rollup/plugin-replace');      // Replace content while bundling.
const vue = require('rollup-plugin-vue');               // Roll .vue files.

/**
 * Config
 *
 * @type {Object}
 */
const rollup = {
  sourcemap: 'inline',
  format: 'iife',
  strict: true,
  plugins: [
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'SCREEN_DESKTOP': 960,
      'SCREEN_TABLET': 768,
      'SCREEN_MOBILE': 480,
      'SCREEM_SM_MOBILE': 400
    }),
    commonjs(),
    vue()
  ]
};

/**
 * Our list of modules we are exporting
 *
 * @type {Array}
 */
module.exports = [
  {
    input: './src/js/default.js',
    output: [{
      name: 'NYCO',
      file: './dist/scripts/nyco.js',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    }],
    plugins: rollup.plugins,
    devModule: true
  },
  {
    input: './src/js/charts.js',
    output: [{
      name: 'Charts',
      file: './dist/scripts/charts.js',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    }],
    plugins: rollup.plugins,
    devModule: true
  },
  {
    input: './src/objects/feed/feed.js',
    output: [{
      name: 'Feed',
      file: './dist/objects/feed/feed.js',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    }],
    plugins: rollup.plugins,
    devModule: true
  },
  {
    input: './src/objects/feed/feed-docs.js',
    output: [{
      name: 'FeedDocs',
      file: './dist/objects/feed/feed-docs.js',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    }],
    plugins: rollup.plugins,
    devModule: true
  },
  {
    input: './src/objects/feed/feed-embed.js',
    output: [{
      name: 'FeedEmbed',
      file: './dist/objects/feed/feed-embed.js',
      sourcemap: (process.env.NODE_ENV === 'production') ? false : rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    }],
    plugins: rollup.plugins,
    devModule: true
  }
];
