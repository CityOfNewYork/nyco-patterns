/**
 * Config
 */

const package = require('../package.json');

/**
 * Config
 */

const site = {
  package: package,
  versions: {
    package: package.version,
    tailwindcss: package.devDependencies.tailwindcss.replace('^', ''),
    bootstrap: '2.3.2'
  },
  urls: {
    production: 'https://cityofnewyork.github.io/nyco-patterns',
    cdn: 'https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist'
  },
  prettier: {
    parser: 'html',
    printWidth: 2000,
    singleQuote: true,
    jsxBracketSameLine: true,
    htmlWhitespaceSensitivity: 'ignore'
  }
};

module.exports = site;