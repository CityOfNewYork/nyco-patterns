/**
 * Dependencies
 */

// import alias from 'rollup-plugin-alias';          // Define require aliases when bundling packages with Rollup.
import resolve from 'rollup-plugin-node-resolve'; // Locate modules using the Node resolution algorithm, for using third party modules in node_modules.
import commonjs from 'rollup-plugin-commonjs';    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
import vue from 'rollup-plugin-vue';              // Roll .vue files.
import babel from 'rollup-plugin-babel';          // Transpile source code.
import buble from 'rollup-plugin-buble';          // Convert ES2015 with buble.
import replace from 'rollup-plugin-replace';      // Replace content while bundling.

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
