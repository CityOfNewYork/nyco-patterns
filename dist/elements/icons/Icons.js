var Icons = (function () {
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

  return Icons;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbnMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9tb2R1bGVzL3V0aWxpdHkuanMiLCIuLi8uLi8uLi9zcmMvZWxlbWVudHMvaWNvbnMvSWNvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBVdGlsaXR5IGNsYXNzXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgVXRpbGl0eSB7XG4gIC8qKlxuICAgKiBUaGUgVXRpbGl0eSBjb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBVdGlsaXR5IGNsYXNzXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKipcbiAqIEJvb2xlYW4gZm9yIGRlYnVnIG1vZGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHdldGhlciBvciBub3QgdGhlIGZyb250LWVuZCBpcyBpbiBkZWJ1ZyBtb2RlLlxuICovXG5VdGlsaXR5LmRlYnVnID0gKCkgPT4gKFV0aWxpdHkuZ2V0VXJsUGFyYW1ldGVyKFV0aWxpdHkuUEFSQU1TLkRFQlVHKSA9PT0gJzEnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIGtleSBpbiBhIFVSTCBxdWVyeSBzdHJpbmcuIElmIG5vIFVSTCBxdWVyeVxuICogc3RyaW5nIGlzIHByb3ZpZGVkLCB0aGUgY3VycmVudCBVUkwgbG9jYXRpb24gaXMgdXNlZC5cbiAqIEBwYXJhbSAge3N0cmluZ30gIG5hbWUgICAgICAgIC0gS2V5IG5hbWUuXG4gKiBAcGFyYW0gIHs/c3RyaW5nfSBxdWVyeVN0cmluZyAtIE9wdGlvbmFsIHF1ZXJ5IHN0cmluZyB0byBjaGVjay5cbiAqIEByZXR1cm4gez9zdHJpbmd9IFF1ZXJ5IHBhcmFtZXRlciB2YWx1ZS5cbiAqL1xuVXRpbGl0eS5nZXRVcmxQYXJhbWV0ZXIgPSAobmFtZSwgcXVlcnlTdHJpbmcpID0+IHtcbiAgY29uc3QgcXVlcnkgPSBxdWVyeVN0cmluZyB8fCB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICBjb25zdCBwYXJhbSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCAnXFxcXFsnKS5yZXBsYWNlKC9bXFxdXS8sICdcXFxcXScpO1xuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIHBhcmFtICsgJz0oW14mI10qKScpO1xuICBjb25zdCByZXN1bHRzID0gcmVnZXguZXhlYyhxdWVyeSk7XG5cbiAgcmV0dXJuIHJlc3VsdHMgPT09IG51bGwgPyAnJyA6XG4gICAgZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xufTtcblxuLyoqXG4gKiBGb3IgdHJhbnNsYXRpbmcgc3RyaW5ncywgdGhlcmUgaXMgYSBnbG9iYWwgTE9DQUxJWkVEX1NUUklOR1MgYXJyYXkgdGhhdFxuICogaXMgZGVmaW5lZCBvbiB0aGUgSFRNTCB0ZW1wbGF0ZSBsZXZlbCBzbyB0aGF0IHRob3NlIHN0cmluZ3MgYXJlIGV4cG9zZWQgdG9cbiAqIFdQTUwgdHJhbnNsYXRpb24uIFRoZSBMT0NBTElaRURfU1RSSU5HUyBhcnJheSBpcyBjb21wb3NlZCBvZiBvYmplY3RzIHdpdGggYVxuICogYHNsdWdgIGtleSB3aG9zZSB2YWx1ZSBpcyBzb21lIGNvbnN0YW50LCBhbmQgYSBgbGFiZWxgIHZhbHVlIHdoaWNoIGlzIHRoZVxuICogdHJhbnNsYXRlZCBlcXVpdmFsZW50LiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgc2x1ZyBuYW1lIGFuZCByZXR1cm5zIHRoZVxuICogbGFiZWwuXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHNsdWdcbiAqIEByZXR1cm4ge3N0cmluZ30gbG9jYWxpemVkIHZhbHVlXG4gKi9cblV0aWxpdHkubG9jYWxpemUgPSBmdW5jdGlvbihzbHVnKSB7XG4gIGxldCB0ZXh0ID0gc2x1ZyB8fCAnJztcbiAgY29uc3Qgc3RyaW5ncyA9IHdpbmRvdy5MT0NBTElaRURfU1RSSU5HUyB8fCBbXTtcbiAgY29uc3QgbWF0Y2ggPSBzdHJpbmdzLmZpbHRlcihcbiAgICAocykgPT4gKHMuaGFzT3duUHJvcGVydHkoJ3NsdWcnKSAmJiBzWydzbHVnJ10gPT09IHNsdWcpID8gcyA6IGZhbHNlXG4gICk7XG4gIHJldHVybiAobWF0Y2hbMF0gJiYgbWF0Y2hbMF0uaGFzT3duUHJvcGVydHkoJ2xhYmVsJykpID8gbWF0Y2hbMF0ubGFiZWwgOiB0ZXh0O1xufTtcblxuLyoqXG4gKiBBcHBsaWNhdGlvbiBwYXJhbWV0ZXJzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5VdGlsaXR5LlBBUkFNUyA9IHtcbiAgREVCVUc6ICdkZWJ1Zydcbn07XG5cbi8qKlxuICogU2VsZWN0b3JzIGZvciB0aGUgVXRpbGl0eSBtb2R1bGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblV0aWxpdHkuU0VMRUNUT1JTID0ge1xuICBwYXJzZU1hcmtkb3duOiAnW2RhdGEtanM9XCJtYXJrZG93blwiXSdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxpdHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBVdGlsaXR5IGZyb20gJy4uLy4uL2pzL21vZHVsZXMvdXRpbGl0eSc7XG5cbi8qKlxuICogVGhlIEljb24gbW9kdWxlXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgSWNvbnMge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAge1N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgaWNvbiBmaWxlXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIGNsYXNzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwYXRoKSB7XG4gICAgcGF0aCA9IChwYXRoKSA/IHBhdGggOiBJY29ucy5wYXRoO1xuXG4gICAgZmV0Y2gocGF0aClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uub2spXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgaWYgKFV0aWxpdHkuZGVidWcoKSkgY29uc29sZS5kaXIocmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgaWYgKFV0aWxpdHkuZGVidWcoKSkgY29uc29sZS5kaXIoZXJyb3IpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwcml0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcHJpdGUuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgc3ByaXRlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgc3ByaXRlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTogbm9uZTsnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzcHJpdGUpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIHBhdGggb2YgdGhlIGljb24gZmlsZSAqL1xuSWNvbnMucGF0aCA9ICdpY29ucy5zdmcnO1xuXG5leHBvcnQgZGVmYXVsdCBJY29ucztcbiJdLCJuYW1lcyI6WyJVdGlsaXR5IiwiZGVidWciLCJnZXRVcmxQYXJhbWV0ZXIiLCJQQVJBTVMiLCJERUJVRyIsIm5hbWUiLCJxdWVyeVN0cmluZyIsInF1ZXJ5Iiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJwYXJhbSIsInJlcGxhY2UiLCJyZWdleCIsIlJlZ0V4cCIsInJlc3VsdHMiLCJleGVjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYWxpemUiLCJzbHVnIiwidGV4dCIsInN0cmluZ3MiLCJMT0NBTElaRURfU1RSSU5HUyIsIm1hdGNoIiwiZmlsdGVyIiwicyIsImhhc093blByb3BlcnR5IiwibGFiZWwiLCJTRUxFQ1RPUlMiLCJwYXJzZU1hcmtkb3duIiwiSWNvbnMiLCJwYXRoIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsImNvbnNvbGUiLCJkaXIiLCJlcnJvciIsImRhdGEiLCJzcHJpdGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzZXRBdHRyaWJ1dGUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztNQU1NQTs7Ozs7RUFLSixtQkFBYzs7O1dBQ0wsSUFBUDs7Ozs7Ozs7RUFRSkEsT0FBTyxDQUFDQyxLQUFSLEdBQWdCO1dBQU9ELE9BQU8sQ0FBQ0UsZUFBUixDQUF3QkYsT0FBTyxDQUFDRyxNQUFSLENBQWVDLEtBQXZDLE1BQWtELEdBQXpEO0dBQWhCOzs7Ozs7Ozs7O0VBU0FKLE9BQU8sQ0FBQ0UsZUFBUixHQUEwQixVQUFDRyxJQUFELEVBQU9DLFdBQVAsRUFBdUI7UUFDekNDLEtBQUssR0FBR0QsV0FBVyxJQUFJRSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQTdDO1FBQ01DLEtBQUssR0FBR04sSUFBSSxDQUFDTyxPQUFMLENBQWEsTUFBYixFQUFxQixLQUFyQixFQUE0QkEsT0FBNUIsQ0FBb0MsTUFBcEMsRUFBNEMsS0FBNUMsQ0FBZDtRQUNNQyxLQUFLLEdBQUcsSUFBSUMsTUFBSixDQUFXLFdBQVdILEtBQVgsR0FBbUIsV0FBOUIsQ0FBZDtRQUNNSSxPQUFPLEdBQUdGLEtBQUssQ0FBQ0csSUFBTixDQUFXVCxLQUFYLENBQWhCO1dBRU9RLE9BQU8sS0FBSyxJQUFaLEdBQW1CLEVBQW5CLEdBQ0xFLGtCQUFrQixDQUFDRixPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdILE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsR0FBMUIsQ0FBRCxDQURwQjtHQU5GOzs7Ozs7Ozs7Ozs7O0VBb0JBWixPQUFPLENBQUNrQixRQUFSLEdBQW1CLFVBQVNDLElBQVQsRUFBZTtRQUM1QkMsSUFBSSxHQUFHRCxJQUFJLElBQUksRUFBbkI7UUFDTUUsT0FBTyxHQUFHYixNQUFNLENBQUNjLGlCQUFQLElBQTRCLEVBQTVDO1FBQ01DLEtBQUssR0FBR0YsT0FBTyxDQUFDRyxNQUFSLENBQ1osVUFBQ0MsQ0FBRDthQUFRQSxDQUFDLENBQUNDLGNBQUYsQ0FBaUIsTUFBakIsS0FBNEJELENBQUMsQ0FBQyxNQUFELENBQUQsS0FBY04sSUFBM0MsR0FBbURNLENBQW5ELEdBQXVELEtBQTlEO0tBRFksQ0FBZDtXQUdRRixLQUFLLENBQUMsQ0FBRCxDQUFMLElBQVlBLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0csY0FBVCxDQUF3QixPQUF4QixDQUFiLEdBQWlESCxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNJLEtBQTFELEdBQWtFUCxJQUF6RTtHQU5GOzs7Ozs7O0VBYUFwQixPQUFPLENBQUNHLE1BQVIsR0FBaUI7SUFDZkMsS0FBSyxFQUFFO0dBRFQ7Ozs7OztFQVFBSixPQUFPLENBQUM0QixTQUFSLEdBQW9CO0lBQ2xCQyxhQUFhLEVBQUU7R0FEakI7Ozs7Ozs7TUM5RE1DOzs7Ozs7RUFNSixlQUFZQyxJQUFaLEVBQWtCOzs7SUFDaEJBLElBQUksR0FBSUEsSUFBRCxHQUFTQSxJQUFULEdBQWdCRCxLQUFLLENBQUNDLElBQTdCO0lBRUFDLEtBQUssQ0FBQ0QsSUFBRCxDQUFMLENBQ0dFLElBREgsQ0FDUSxVQUFDQyxRQUFELEVBQWM7VUFDZEEsUUFBUSxDQUFDQyxFQUFiLElBQ0UsT0FBT0QsUUFBUSxDQUFDZCxJQUFULEVBQVAsR0FERjtZQUlNcEIsT0FBTyxDQUFDQyxLQUFSLEVBQUosSUFBcUJtQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsUUFBWjtLQU4zQixXQVFTLFVBQUNJLEtBQUQsRUFBVzs7VUFFWnRDLE9BQU8sQ0FBQ0MsS0FBUixFQUFKLElBQXFCbUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLEtBQVo7S0FWekIsRUFZR0wsSUFaSCxDQVlRLFVBQUNNLElBQUQsRUFBVTtVQUNSQyxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFmO01BQ0FGLE1BQU0sQ0FBQ0csU0FBUCxHQUFtQkosSUFBbkI7TUFDQUMsTUFBTSxDQUFDSSxZQUFQLENBQW9CLGFBQXBCLEVBQW1DLElBQW5DO01BQ0FKLE1BQU0sQ0FBQ0ksWUFBUCxDQUFvQixPQUFwQixFQUE2QixnQkFBN0I7TUFDQUgsUUFBUSxDQUFDSSxJQUFULENBQWNDLFdBQWQsQ0FBMEJOLE1BQTFCO0tBakJKO1dBb0JPLElBQVA7Ozs7O0VBS0pWLEtBQUssQ0FBQ0MsSUFBTixHQUFhLFdBQWI7Ozs7Ozs7OyJ9
