/**
 * Dependencies
 */

const GHPAGES = require('gh-pages');
const DIST = PATH.join(__dirname, 'dist/');


/**
 * Functions
 */

fnCallback(err) {

  if (err) return console.log(err);

  console.log('Published!');

}

/**
 * Init
 */

ghpages.publish(DIST, fnCallback);