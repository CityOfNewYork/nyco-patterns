/**
 * Config
 */

const package = require('../package.json');

/**
 * Config
 */

const site = {
  versions: {
    package: package.version,
    tailwindcss: package.devDependencies.tailwindcss.replace('^', ''),
    bootstrap: '2.3.2'
  },
  urls: {
    production: 'https://cityofnewyork.github.io/nyco-patterns',
    cdn: 'https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist'
  }
};

module.exports = site;