'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Utility =
/**
 * The Utility constructor
 * @return {object} The Utility class
 */
function Utility() {
  _classCallCheck(this, Utility);

  return this;
};
/**
 * Boolean for debug mode
 * @return {boolean} wether or not the front-end is in debug mode.
 */


Utility.debug = function () {
  return Utility.getUrlParameter(Utility.PARAMS.DEBUG) === '1';
};
/**
 * Returns the value of a given key in a URL query string. If no URL query
 * string is provided, the current URL location is used.
 * @param  {string}  name        - Key name.
 * @param  {?string} queryString - Optional query string to check.
 * @return {?string} Query parameter value.
 */


Utility.getUrlParameter = function (name, queryString) {
  var query = queryString || window.location.search;
  var param = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
  var results = regex.exec(query);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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


Utility.localize = function (slug) {
  var text = slug || '';
  var strings = window.LOCALIZED_STRINGS || [];
  var match = strings.filter(function (s) {
    return s.hasOwnProperty('slug') && s['slug'] === slug ? s : false;
  });
  return match[0] && match[0].hasOwnProperty('label') ? match[0].label : text;
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

/**
 * The Icon module
 * @class
 */

var Icons =
/**
 * @constructor
 * @param  {String} path The path of the icon file
 * @return {object} The class
 */
function Icons(path) {
  _classCallCheck(this, Icons);

  path = path ? path : Icons.path;
  fetch(path).then(function (response) {
    if (response.ok) { return response.text(); }else // eslint-disable-next-line no-console
      if (Utility.debug()) { console.dir(response); }
  })["catch"](function (error) {
    // eslint-disable-next-line no-console
    if (Utility.debug()) { console.dir(error); }
  }).then(function (data) {
    var sprite = document.createElement('div');
    sprite.innerHTML = data;
    sprite.setAttribute('aria-hidden', true);
    sprite.setAttribute('style', 'display: none;');
    document.body.appendChild(sprite);
  });
  return this;
};
/** @type {String} The path of the icon file */


Icons.path = 'icons.svg';

module.exports = Icons;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbnMuY29tbW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvbW9kdWxlcy91dGlsaXR5LmpzIiwiLi4vLi4vLi4vc3JjL2VsZW1lbnRzL2ljb25zL0ljb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgVXRpbGl0eSBjbGFzc1xuICogQGNsYXNzXG4gKi9cbmNsYXNzIFV0aWxpdHkge1xuICAvKipcbiAgICogVGhlIFV0aWxpdHkgY29uc3RydWN0b3JcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgVXRpbGl0eSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiBCb29sZWFuIGZvciBkZWJ1ZyBtb2RlXG4gKiBAcmV0dXJuIHtib29sZWFufSB3ZXRoZXIgb3Igbm90IHRoZSBmcm9udC1lbmQgaXMgaW4gZGVidWcgbW9kZS5cbiAqL1xuVXRpbGl0eS5kZWJ1ZyA9ICgpID0+IChVdGlsaXR5LmdldFVybFBhcmFtZXRlcihVdGlsaXR5LlBBUkFNUy5ERUJVRykgPT09ICcxJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBrZXkgaW4gYSBVUkwgcXVlcnkgc3RyaW5nLiBJZiBubyBVUkwgcXVlcnlcbiAqIHN0cmluZyBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnQgVVJMIGxvY2F0aW9uIGlzIHVzZWQuXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lICAgICAgICAtIEtleSBuYW1lLlxuICogQHBhcmFtICB7P3N0cmluZ30gcXVlcnlTdHJpbmcgLSBPcHRpb25hbCBxdWVyeSBzdHJpbmcgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHs/c3RyaW5nfSBRdWVyeSBwYXJhbWV0ZXIgdmFsdWUuXG4gKi9cblV0aWxpdHkuZ2V0VXJsUGFyYW1ldGVyID0gKG5hbWUsIHF1ZXJ5U3RyaW5nKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5ID0gcXVlcnlTdHJpbmcgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgY29uc3QgcGFyYW0gPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgJ1xcXFxbJykucmVwbGFjZSgvW1xcXV0vLCAnXFxcXF0nKTtcbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBwYXJhbSArICc9KFteJiNdKiknKTtcbiAgY29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocXVlcnkpO1xuXG4gIHJldHVybiByZXN1bHRzID09PSBudWxsID8gJycgOlxuICAgIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn07XG5cbi8qKlxuICogRm9yIHRyYW5zbGF0aW5nIHN0cmluZ3MsIHRoZXJlIGlzIGEgZ2xvYmFsIExPQ0FMSVpFRF9TVFJJTkdTIGFycmF5IHRoYXRcbiAqIGlzIGRlZmluZWQgb24gdGhlIEhUTUwgdGVtcGxhdGUgbGV2ZWwgc28gdGhhdCB0aG9zZSBzdHJpbmdzIGFyZSBleHBvc2VkIHRvXG4gKiBXUE1MIHRyYW5zbGF0aW9uLiBUaGUgTE9DQUxJWkVEX1NUUklOR1MgYXJyYXkgaXMgY29tcG9zZWQgb2Ygb2JqZWN0cyB3aXRoIGFcbiAqIGBzbHVnYCBrZXkgd2hvc2UgdmFsdWUgaXMgc29tZSBjb25zdGFudCwgYW5kIGEgYGxhYmVsYCB2YWx1ZSB3aGljaCBpcyB0aGVcbiAqIHRyYW5zbGF0ZWQgZXF1aXZhbGVudC4gVGhpcyBmdW5jdGlvbiB0YWtlcyBhIHNsdWcgbmFtZSBhbmQgcmV0dXJucyB0aGVcbiAqIGxhYmVsLlxuICogQHBhcmFtICB7c3RyaW5nfSBzbHVnXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGxvY2FsaXplZCB2YWx1ZVxuICovXG5VdGlsaXR5LmxvY2FsaXplID0gZnVuY3Rpb24oc2x1Zykge1xuICBsZXQgdGV4dCA9IHNsdWcgfHwgJyc7XG4gIGNvbnN0IHN0cmluZ3MgPSB3aW5kb3cuTE9DQUxJWkVEX1NUUklOR1MgfHwgW107XG4gIGNvbnN0IG1hdGNoID0gc3RyaW5ncy5maWx0ZXIoXG4gICAgKHMpID0+IChzLmhhc093blByb3BlcnR5KCdzbHVnJykgJiYgc1snc2x1ZyddID09PSBzbHVnKSA/IHMgOiBmYWxzZVxuICApO1xuICByZXR1cm4gKG1hdGNoWzBdICYmIG1hdGNoWzBdLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSA/IG1hdGNoWzBdLmxhYmVsIDogdGV4dDtcbn07XG5cbi8qKlxuICogQXBwbGljYXRpb24gcGFyYW1ldGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuVXRpbGl0eS5QQVJBTVMgPSB7XG4gIERFQlVHOiAnZGVidWcnXG59O1xuXG4vKipcbiAqIFNlbGVjdG9ycyBmb3IgdGhlIFV0aWxpdHkgbW9kdWxlXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5VdGlsaXR5LlNFTEVDVE9SUyA9IHtcbiAgcGFyc2VNYXJrZG93bjogJ1tkYXRhLWpzPVwibWFya2Rvd25cIl0nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsaXR5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbGl0eSBmcm9tICcuLi8uLi9qcy9tb2R1bGVzL3V0aWxpdHknO1xuXG4vKipcbiAqIFRoZSBJY29uIG1vZHVsZVxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEljb25zIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIGljb24gZmlsZVxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3IocGF0aCkge1xuICAgIHBhdGggPSAocGF0aCkgPyBwYXRoIDogSWNvbnMucGF0aDtcblxuICAgIGZldGNoKHBhdGgpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKVxuICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpIGNvbnNvbGUuZGlyKHJlc3BvbnNlKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpIGNvbnNvbGUuZGlyKGVycm9yKTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBzcHJpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3ByaXRlLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIHNwcml0ZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgIHNwcml0ZS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6IG5vbmU7Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc3ByaXRlKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqIEB0eXBlIHtTdHJpbmd9IFRoZSBwYXRoIG9mIHRoZSBpY29uIGZpbGUgKi9cbkljb25zLnBhdGggPSAnaWNvbnMuc3ZnJztcblxuZXhwb3J0IGRlZmF1bHQgSWNvbnM7XG4iXSwibmFtZXMiOlsiVXRpbGl0eSIsImRlYnVnIiwiZ2V0VXJsUGFyYW1ldGVyIiwiUEFSQU1TIiwiREVCVUciLCJuYW1lIiwicXVlcnlTdHJpbmciLCJxdWVyeSIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicGFyYW0iLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJyZXN1bHRzIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImxvY2FsaXplIiwic2x1ZyIsInRleHQiLCJzdHJpbmdzIiwiTE9DQUxJWkVEX1NUUklOR1MiLCJtYXRjaCIsImZpbHRlciIsInMiLCJoYXNPd25Qcm9wZXJ0eSIsImxhYmVsIiwiU0VMRUNUT1JTIiwicGFyc2VNYXJrZG93biIsIkljb25zIiwicGF0aCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJjb25zb2xlIiwiZGlyIiwiZXJyb3IiLCJkYXRhIiwic3ByaXRlIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwiYm9keSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQU1NQTs7Ozs7QUFLSixtQkFBYzs7O1NBQ0wsSUFBUDs7Ozs7Ozs7QUFRSkEsT0FBTyxDQUFDQyxLQUFSLEdBQWdCO1NBQU9ELE9BQU8sQ0FBQ0UsZUFBUixDQUF3QkYsT0FBTyxDQUFDRyxNQUFSLENBQWVDLEtBQXZDLE1BQWtELEdBQXpEO0NBQWhCOzs7Ozs7Ozs7O0FBU0FKLE9BQU8sQ0FBQ0UsZUFBUixHQUEwQixVQUFDRyxJQUFELEVBQU9DLFdBQVAsRUFBdUI7TUFDekNDLEtBQUssR0FBR0QsV0FBVyxJQUFJRSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQTdDO01BQ01DLEtBQUssR0FBR04sSUFBSSxDQUFDTyxPQUFMLENBQWEsTUFBYixFQUFxQixLQUFyQixFQUE0QkEsT0FBNUIsQ0FBb0MsTUFBcEMsRUFBNEMsS0FBNUMsQ0FBZDtNQUNNQyxLQUFLLEdBQUcsSUFBSUMsTUFBSixDQUFXLFdBQVdILEtBQVgsR0FBbUIsV0FBOUIsQ0FBZDtNQUNNSSxPQUFPLEdBQUdGLEtBQUssQ0FBQ0csSUFBTixDQUFXVCxLQUFYLENBQWhCO1NBRU9RLE9BQU8sS0FBSyxJQUFaLEdBQW1CLEVBQW5CLEdBQ0xFLGtCQUFrQixDQUFDRixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdILE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsR0FBMUIsQ0FBRCxDQURwQjtDQU5GOzs7Ozs7Ozs7Ozs7O0FBb0JBWixPQUFPLENBQUNrQixRQUFSLEdBQW1CLFVBQVNDLElBQVQsRUFBZTtNQUM1QkMsSUFBSSxHQUFHRCxJQUFJLElBQUksRUFBbkI7TUFDTUUsT0FBTyxHQUFHYixNQUFNLENBQUNjLGlCQUFQLElBQTRCLEVBQTVDO01BQ01DLEtBQUssR0FBR0YsT0FBTyxDQUFDRyxNQUFSLENBQ1osVUFBQ0MsQ0FBRDtXQUFRQSxDQUFDLENBQUNDLGNBQUYsQ0FBaUIsTUFBakIsS0FBNEJELENBQUMsQ0FBQyxNQUFELENBQUQsS0FBY04sSUFBM0MsR0FBbURNLENBQW5ELEdBQXVELEtBQTlEO0dBRFksQ0FBZDtTQUdRRixLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVlBLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0csY0FBVCxDQUF3QixPQUF4QixDQUFiLEdBQWlESCxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNJLEtBQTFELEdBQWtFUCxJQUF6RTtDQU5GOzs7Ozs7O0FBYUFwQixPQUFPLENBQUNHLE1BQVIsR0FBaUI7RUFDZkMsS0FBSyxFQUFFO0NBRFQ7Ozs7OztBQVFBSixPQUFPLENBQUM0QixTQUFSLEdBQW9CO0VBQ2xCQyxhQUFhLEVBQUU7Q0FEakI7Ozs7Ozs7SUM5RE1DOzs7Ozs7QUFNSixlQUFZQyxJQUFaLEVBQWtCOzs7RUFDaEJBLElBQUksR0FBSUEsSUFBRCxHQUFTQSxJQUFULEdBQWdCRCxLQUFLLENBQUNDLElBQTdCO0VBRUFDLEtBQUssQ0FBQ0QsSUFBRCxDQUFMLENBQ0dFLElBREgsQ0FDUSxVQUFDQyxRQUFELEVBQWM7UUFDZEEsUUFBUSxDQUFDQyxFQUFiLElBQ0UsT0FBT0QsUUFBUSxDQUFDZCxJQUFULEVBQVAsR0FERjtVQUlNcEIsT0FBTyxDQUFDQyxLQUFSLEVBQUosSUFBcUJtQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsUUFBWjtHQU4zQixXQVFTLFVBQUNJLEtBQUQsRUFBVzs7UUFFWnRDLE9BQU8sQ0FBQ0MsS0FBUixFQUFKLElBQXFCbUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLEtBQVo7R0FWekIsRUFZR0wsSUFaSCxDQVlRLFVBQUNNLElBQUQsRUFBVTtRQUNSQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFmO0lBQ0FGLE1BQU0sQ0FBQ0csU0FBUCxHQUFtQkosSUFBbkI7SUFDQUMsTUFBTSxDQUFDSSxZQUFQLENBQW9CLGFBQXBCLEVBQW1DLElBQW5DO0lBQ0FKLE1BQU0sQ0FBQ0ksWUFBUCxDQUFvQixPQUFwQixFQUE2QixnQkFBN0I7SUFDQUgsUUFBUSxDQUFDSSxJQUFULENBQWNDLFdBQWQsQ0FBMEJOLE1BQTFCO0dBakJKO1NBb0JPLElBQVA7Ozs7O0FBS0pWLEtBQUssQ0FBQ0MsSUFBTixHQUFhLFdBQWI7Ozs7In0=
