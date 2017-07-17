/**
 * Dependencies
 */
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const static = __dirname;
const views = path.join(__dirname, 'src/views');
const engine = 'slm';


/**
 * Functions
 */
function fnGet(request, resolve) {

  resolve.render(request.params[0]);

}

function fnListenCallback() {

  let p = app.get('port');

  console.log(`NYCO Patterns listening on port ${p}!`);

}


/**
 * Init
 */
app.set('views', views); // set the views directory
app.set('view engine', engine); // set the template engine
app.set('port', port); // set the port
app.use(express.static(static)); // choose the static file directory
app.get('/*', fnGet); // request handler
app.listen(app.get('port'), fnListenCallback); // set the port to listen on

