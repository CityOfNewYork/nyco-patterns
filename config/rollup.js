/**
 * Dependencies
 */

import resolve from '@rollup/plugin-node-resolve'; // Locate modules using the Node resolution algorithm, for using third party modules in node_modules.
import commonjs from '@rollup/plugin-commonjs';    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import babel from '@rollup/plugin-babel';          // Transpile source code.
import buble from '@rollup/plugin-buble';          // Convert ES2015 with buble.
import replace from '@rollup/plugin-replace';      // Replace content while bundling.
import vue from 'rollup-plugin-vue';               // Roll .vue files.

/**
 * Config
 */

// Rollup Configuration
const rollup = {
  sourcemap: 'inline',
  format: 'iife',
  strict: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    replace({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'SCREEN_DESKTOP': 960,
      'SCREEN_TABLET': 768,
      'SCREEN_MOBILE': 480,
      'SCREEM_SM_MOBILE': 400
    }),
    commonjs(),
    vue(),
    buble({
      transforms: {
        forOf: false
      }
    })
  ]
};

/**
 * Our list of modules we are exporting
 * @return  {Array}  Exported modules
 */
export default [
  {
    input: './src/js/main.js',
    output: [
      {
        name: 'NycoPatterns',
        file: './dist/scripts/nyco-patterns.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/feed.js',
    output: [
      {
        name: 'Feed',
        file: './dist/objects/feed/feed.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/feed-docs.js',
    output: {
      name: 'FeedDocs',
      file: './dist/objects/feed/feed-docs.js',
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/feed-embed.js',
    output: {
      name: 'FeedEmbed',
      file: './dist/objects/feed/feed-embed.js',
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  }
];
