/**
 * Dependencies
 */

import resolve from 'rollup-plugin-node-resolve'; // finds external modules
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';


/**
 * Init
 */

export default {
  moduleName: 'nyco',
  entry: './src/js/nyco.js',
  dest: './dist/scripts/nyco.dist.js',
  sourceMap: 'inline',
  format: 'iife',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};
