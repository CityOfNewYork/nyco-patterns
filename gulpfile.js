const GULP = require('gulp');
const SLM = require('gulp-slm');
const PATH = require('path');

const VARS = require( PATH.join(__dirname, 'src/data/vars.json') );

const TEMPLATE_SRC = [
  './src/views/*.slm',
  '!./src/views/index.slm'
];

const TEMPLATE_INDEX = [
  './src/views/index.slm'
];


/**
 * Tasks
 */
GULP.task('build', build);


/**
 * Functions
 */

/**
 * Build slm templates in the src/views into html
 * @return {null}
 */
function build() {

  GULP.src(TEMPLATE_INDEX)
    .pipe(SLM({'locals': {
      'vars': VARS,
      'root': 'demo/',
      'assets': ''
    }}))
    .pipe(GULP.dest('.'));

  GULP.src(TEMPLATE_SRC)
    .pipe(SLM({'locals': {
        'vars': VARS,
        'root': 'demo/',
        'assets': '../'
      }}))
    .pipe(GULP.dest('./demo'));

}

