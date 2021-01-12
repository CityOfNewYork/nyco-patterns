const path = require('path');

module.exports = {
  'src': path.join(process.env.PWD, 'node_modules/feather-icons/dist/icons'),
  'dist': path.join(process.env.PWD, 'dist', 'svg', 'feather.svg'),
  'ext': '.svg',
  'prefix': 'feather-'
};
