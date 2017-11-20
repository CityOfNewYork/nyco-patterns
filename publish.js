/**
 * Dependencies
 */

const GHPAGES = require('gh-pages');
const PATH = require('path');
const DIST = PATH.join(__dirname, 'dist/');


/**
 * Functions
 */

function fnCallback(err) {

  if (err) return console.log(err);

  console.log('Published!');

}

/**
 * Init
 */

GHPAGES.publish(DIST, fnCallback);