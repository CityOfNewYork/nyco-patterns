/**
 * Dependencies
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
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
    commonjs(),
    vue(),
    buble(),
    babel({
      exclude: '../node_modules/**'
    }),
  ]
};

const modules = [ // Our list of modules we are exporting
  {
    input: './src/js/main.js',
    output: [
      {
        name: 'NycoPatterns',
        file: './dist/scripts/NycoPatterns.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      },
      {
        name: 'NycoPatterns',
        file: './dist/scripts/NycoPatterns.common.js',
        sourcemap: rollup.sourcemap,
        format: 'cjs',
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/elements/icons/Icons.js',
    output: [
      {
        name: 'Icons',
        file: './dist/elements/icons/Icons.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      },
      {
        name: 'Icons',
        file: './dist/elements/icons/Icons.common.js',
        sourcemap: rollup.sourcemap,
        format: 'cjs',
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/Feed.js',
    output: [
      {
        name: 'Feed',
        file: './dist/objects/feed/Feed.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      },
      {
        name: 'Feed',
        file: './dist/objects/feed/Feed.common.js',
        sourcemap: rollup.sourcemap,
        format: 'cjs',
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/utilities/toggle/Toggle.js',
    output: [
      {
        name: 'Toggle',
        file: './dist/utilities/toggle/Toggle.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      },
      {
        name: 'Toggle',
        file: './dist/utilities/toggle/Toggle.common.js',
        sourcemap: rollup.sourcemap,
        format: 'cjs',
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/utilities/track/Track.js',
    output: [
      {
        name: 'Track',
        file: './dist/utilities/track/Track.js',
        sourcemap: rollup.sourcemap,
        format: rollup.format,
        strict: rollup.strict
      },
      {
        name: 'Track',
        file: './dist/utilities/track/Track.common.js',
        sourcemap: rollup.sourcemap,
        format: 'cjs',
        strict: rollup.strict
      }
    ],
    plugins: rollup.plugins
  },
  {
    input: './src/objects/feed/FeedDocs.js',
    output: {
      name: 'FeedDocs',
      file: './dist/objects/feed/FeedDocs.js',
      sourcemap: rollup.sourcemap,
      format: rollup.format,
      strict: rollup.strict
    },
    plugins: rollup.plugins
  }
];



export default modules;
