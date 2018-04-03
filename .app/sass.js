/**
 * Dependencies
 */

const Sass = require('node-sass');
const modules = require('../config/sass');
const Path = require('path');
const Fs = require('fs');

/**
 * Constants
 */

// const bundle = modules[0]Path.join(__dirname, '../', modules[0].outDir);
// const name = modules[0].config.outFile;

/**
 * Functions
 */

// function render(err, result) {
//   if (err) {
//     console.log(`${err.formatted}`);
//   } else {
//     Fs.writeFile(`${bundle}${name}`, result.css, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(`SASS written to ${bundle}${name}`);
//       }
//     });
//   }
// }

/**
 * Init
 */

modules.forEach(function(module) {
  let bundle = Path.join(__dirname, '../', module.outDir);
  let name = module.outFile;
  Sass.render(module, (err, result) => {
    if (err) {
      console.log(`${err.formatted}`);
    } else {
      Fs.writeFile(`${bundle}${name}`, result.css, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`SASS written to ${bundle}${name}`);
        }
      });
    }
  });

});
