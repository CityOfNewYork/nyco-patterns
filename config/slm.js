/**
 * Config
 */

const package = require('../package.json');
const tailwind = require('./tailwind.js');

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
    production: 'https://nycopatterns.cityofnewyork.us',
    cdn: 'https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist',
    stylesheet: 'https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist/styles/nyco-patterns-default.css',
    source: 'https://github.com/CityOfNewYork/nyco-patterns',
    release: 'https://github.com/CityOfNewYork/nyco-patterns/tree/v' + package.version,
    github: 'https://github.com/orgs/CityOfNewYork/teams/nycopportunity',
    installation: 'https://github.com/CityOfNewYork/nyco-patterns-framework/blob/master/docs/installation.md',
    patterns: 'https://github.com/CityOfNewYork/nyco-patterns-framework/blob/master/docs/patterns.md',
    nycoPatternsFramework: 'https://github.com/CityOfNewYork/nyco-patterns-framework',
    nycOpportunity: 'http://www.nyc.gov/opportunity',
    nycOpportunityOnGithub: 'https://github.com/topics/nycopportunity?q=org%3Acityofnewyork+topic%3Anycopportunity&unscoped_q=org%3Acityofnewyork+topic%3Anycopportunity',
    medium: 'https://medium.com/@nycopportunity',
    facebook: 'https://www.facebook.com/NYCOpportunity/',
    twitter: 'https://twitter.com/nycopportunity',
    instagram: 'https://www.instagram.com/nycopportunity/',
    bootstrap: 'http://getbootstrap.com/2.3.2',
    tailwind: 'https://tailwindcss.com',
    tailwindDocs: 'https://tailwindcss.com/docs/',
    cityStyleGuide: 'https://www1.nyc.gov/assets/doitt/downloads/pdf/user_experience_design_public.pdf',
    blueprint: 'https://blueprint.cityofnewyork.us',
    blueprintNYCBrand: 'https://blueprint.cityofnewyork.us/design/nyc-brand/',
    playbook: 'https://playbook.cityofnewyork.us/'
  },
  prettier: {
    parser: 'html',
    printWidth: 2000,
    singleQuote: true,
    jsxBracketSameLine: true,
    htmlWhitespaceSensitivity: 'ignore'
  },
  tailwind: tailwind
};

module.exports = site;