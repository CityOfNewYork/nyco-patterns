// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'; //finds external modules
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  moduleName: 'oCharts',
  entry: './src/js/o-charts.js',
  format: 'iife',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  dest: './bundle/scripts/bundle.js',
};