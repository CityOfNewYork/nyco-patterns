'use strict';

/**
 * The Utility class
 * @class
 */
class Utility {
  /**
   * The Utility constructor
   * @return {object} The Utility class
   */
  constructor() {
    return this;
  }
}

/**
 * Boolean for debug mode
 * @return {boolean} wether or not the front-end is in debug mode.
 */
Utility.debug = () => (Utility.getUrlParameter(Utility.PARAMS.DEBUG) === '1');

/**
 * Returns the value of a given key in a URL query string. If no URL query
 * string is provided, the current URL location is used.
 * @param  {string}  name        - Key name.
 * @param  {?string} queryString - Optional query string to check.
 * @return {?string} Query parameter value.
 */
Utility.getUrlParameter = (name, queryString) => {
  const query = queryString || window.location.search;
  const param = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
  const results = regex.exec(query);

  return results === null ? '' :
    decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/**
 * For translating strings, there is a global LOCALIZED_STRINGS array that
 * is defined on the HTML template level so that those strings are exposed to
 * WPML translation. The LOCALIZED_STRINGS array is composed of objects with a
 * `slug` key whose value is some constant, and a `label` value which is the
 * translated equivalent. This function takes a slug name and returns the
 * label.
 * @param  {string} slug
 * @return {string} localized value
 */
Utility.localize = function(slug) {
  let text = slug || '';
  const strings = window.LOCALIZED_STRINGS || [];
  const match = strings.filter(
    (s) => (s.hasOwnProperty('slug') && s['slug'] === slug) ? s : false
  );
  return (match[0] && match[0].hasOwnProperty('label')) ? match[0].label : text;
};

/**
 * A markdown parsing method. It relies on the dist/markdown.min.js script
 * which is a browser compatible version of markdown-js
 * @url https://github.com/evilstreak/markdown-js
 * @return {Object} The iteration over the markdown DOM parents
 */
Utility.parseMarkdown = () => {
  if (typeof markdown === 'undefined') return false;

  const mds = document.querySelectorAll(Utility.SELECTORS.parseMarkdown);

  for (let i = 0; i < mds.length; i++) {
    let element = mds[i];
    fetch(element.dataset.jsMarkdown)
      .then((response) => {
        if (response.ok)
          return response.text();
        else {
          element.innerHTML = '';
          // eslint-disable-next-line no-console
          if (Utility.debug()) console.dir(response);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        if (Utility.debug()) console.dir(error);
      })
      .then((data) => {
        try {
          element.classList.toggle('animated');
          element.classList.toggle('fadeIn');
          element.innerHTML = markdown.toHTML(data);
        } catch (error) {}
      });
  }
};

/**
 * Application parameters
 * @type {Object}
 */
Utility.PARAMS = {
  DEBUG: 'debug'
};

/**
 * Selectors for the Utility module
 * @type {Object}
 */
Utility.SELECTORS = {
  parseMarkdown: '[data-js="markdown"]'
};

export default Utility;
