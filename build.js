/**
 * Dependencies
 */

const SLM = require('slm').compile;
const PATH = require('path');
const FS = require('fs');
const VIEWS = PATH.join(__dirname, 'src/views/');
const DIST = PATH.join(__dirname, 'dist/');
const LOCALS = {
  'vars': require(PATH.join(__dirname, 'src/data/vars.json'))
};


/**
 * Functions
 */

function fnWrite(filename, data) {

  let rename = `${filename.split('.')[0]}.html`;

  FS.writeFile(`${DIST}${rename}`, data, (err) => {

    if (err) return console.log(err);

    console.log(`Compiled ${rename}`);

  });

}

function fnRead(filename, fnCallback) {

  let path = `${VIEWS}${filename}`;

  FS.readFile(path, 'utf-8', (err, src) => {

    if (err) return console.log(err);

    let compiled = SLM(src, {
      'filename': path
    })(LOCALS);

    fnCallback(filename, compiled);

  });

}


/**
 * Init
 */

FS.readdir(VIEWS, 'utf-8', function(err, files) {

  for (let i = files.length - 1; i >= 0; i--) {

    if (files[i].indexOf('.slm') > -1) fnRead(files[i], fnWrite);

  }

});

