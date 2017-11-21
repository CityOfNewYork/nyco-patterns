/**
 * Dependencies
 */

const EXPRESS = require('express');
const APP = EXPRESS();
const PATH = require('path');
const PORT = process.env.PORT;
const STATIC = PATH.join(__dirname, 'dist');
const VIEWS = PATH.join(__dirname, 'src/views');
const ENGINE = 'slm';
const LOCALS = {
  'vars': require(PATH.join(__dirname, 'src/data/vars.json'))
};


/**
 * Functions
 */

function fnGet(request, resolve) {

  resolve.render(request.params[0], LOCALS);

}

function fnListenCallback() {

  let p = APP.get('port');

  console.log(`NYCO Patterns listening on port ${p}!`);

}


/**
 * Init
 */

APP.set('views', VIEWS); // set the views directory
APP.set('view engine', ENGINE); // set the template engine
APP.set('port', PORT); // set the port
APP.use(EXPRESS.static(STATIC)); // choose the static file directory
APP.get('/*', fnGet); // request handler
APP.listen(APP.get('port'), fnListenCallback); // set the port to listen on

