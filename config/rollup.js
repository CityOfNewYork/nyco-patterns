/**
 * Dependencies
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';

/**
 * Config
 */

// Rollup Configuration
const plugins = [
  // eslint(), TODO: ES lint is throwing errors, it needs to be configured for ES6
  resolve(),
  babel({
    exclude: '../node_modules/**'
  }),
  uglify()
];

const sourcemap = 'inline';
const format = 'iife';
const strict = true;
const name = 'NycoPattterns'; // Name of the main script
const modules = [ // Our list of modules we are exporting
  {
    name: 'Feed',
    dir: 'objects/feed'
  },
  {
    name: 'FeedDocs',
    dir: 'objects/feed'
  }
];

// Create main package
const Main = {
  input: './src/js/main.js',
  output: {
    name: name,
    file: `./dist/scripts/${name}.js`,
    sourcemap: sourcemap,
    format: format,
    strict: strict
  },
  plugins: plugins
};

// Create packages for our other modules
for (let i = 0; i < modules.length; i++) {
  modules[i] = {
    input: `./src/${modules[i].dir}/${modules[i].name}.js`,
    output: {
      name: modules[i].name,
      file: `./dist/${modules[i].dir}/${modules[i].name}.js`,
      sourcemap: sourcemap,
      format: format,
      strict: strict
    },
    plugins: plugins
  }
};

modules.push(Main);

export default modules;