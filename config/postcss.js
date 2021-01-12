/**
 * Dependencies
 */

const tailwindcss = require('tailwindcss'); // utility framework/management
const mqpacker = require('css-mqpacker');   // packs media queries together
// const cssnano = require('cssnano');         // modern css compiling/minification

/**
 * Config
 */

const postCss = {
  parser: 'postcss-scss',
  plugins: [
    tailwindcss(require('./tailwindcss.js')),
    mqpacker({sort: true})
  ]
};

module.exports = postCss;
