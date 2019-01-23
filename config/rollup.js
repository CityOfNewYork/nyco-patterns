/**
 * Dependencies
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
// import replace from 'rollup-plugin-replace';
// import eslint from 'rollup-plugin-eslint';

/**
 * Config
 */

// Rollup Configuration
const rollup = {
  sourcemap: 'inline',
  format: 'iife',
  strict: true,
  plugins: [
    // eslint(), TODO: ES lint is throwing errors, it needs to be configured for ES6
    resolve(),
    babel({
      exclude: '../node_modules/**'
    }),
    uglify()
  ]
};

const modules = [ // Our list of modules we are exporting
  {
    input: './src/js/main.js',
    output: {
      name: 'NycoPattterns',
      file: `./dist/scripts/NycoPattterns.js`,
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/Feed.js',
    output: {
      name: 'Feed',
      file: `./dist/objects/feed/Feed.js`,
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/FeedDocs.js',
    output: {
      name: 'FeedDocs',
      file: `./dist/objects/feed/FeedDocs.js`,
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  }
];

export default modules;
