/**
 * Dependencies
 */

const Sass = require('node-sass');
const modules = require('../config/sass');
const Path = require('path');
const Fs = require('fs');

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
