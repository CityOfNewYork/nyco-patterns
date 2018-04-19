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
    tailwindcss: package.dependencies.tailwindcss.replace('^', ''),
    bootstrap: '2.3.2'
  },
  urls: {
    production: 'https://cityofnewyork.github.io/nyco-patterns'
  }
};

module.exports = site;