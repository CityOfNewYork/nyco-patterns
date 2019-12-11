'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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
 * Tracking bus for Google analytics and Webtrends.
 */

var Track =
/*#__PURE__*/
function () {
  function Track(s) {
    var _this = this;

    _classCallCheck(this, Track);

    var body = document.querySelector('body');
    s = !s ? {} : s;
    this._settings = {
      selector: s.selector ? s.selector : Track.selector
    };
    body.addEventListener('click', function (event) {
      if (!event.target.matches(_this._settings.selector)) { return; }
      var key = event.target.dataset.trackKey;
      var data = JSON.parse(event.target.dataset.trackData);

      _this.click(key, data);
    });
    return this;
  }
  /**
   * Tracking function wrapper
   * @param  {string}     key  The key or event of the data
   * @param  {collection} data The data to track
   * @return {object}          The final data object
   */


  _createClass(Track, [{
    key: "click",
    value: function click(key, data) {
      // Set the path name based on the location
      var d = data.map(function (el) {
        if (el.hasOwnProperty(Track.key)) { el[Track.key] = "".concat(window.location.pathname, "/").concat(el[Track.key]); }
        return el;
      });
      var wt = this.webtrends(key, d);
      var ga = this.gtag(key, d);
      /* eslint-disable no-console */

      if (Utility.debug()) { console.dir({
        'Track': [wt, ga]
      }); }
      /* eslint-enable no-console */

      return d;
    }
  }, {
    key: "view",

    /**
     * Data bus for tracking views in Webtrends and Google Analytics
     * @param  {string}     app  The name of the Single Page Application to track
     * @param  {string}     key  The key or event of the data
     * @param  {collection} data The data to track
     */
    value: function view(app, key, data) {
      var wt = this.webtrends(key, data);
      var ga = this.gtagView(app, key);
      /* eslint-disable no-console */

      if (Utility.debug()) { console.dir({
        'Track': [wt, ga]
      }); }
      /* eslint-enable no-console */
    }
  }, {
    key: "webtrends",

    /**
     * Push Events to Webtrends
     * @param  {string}     key  The key or event of the data
     * @param  {collection} data The data to track
     */
    value: function webtrends(key, data) {
      var event = [{
        'WT.ti': key
      }];

      if (data[0] && data[0].hasOwnProperty(Track.key)) {
        event.push({
          'DCS.dcsuri': data[0][Track.key]
        });
      } else {
        Object.assign(event, data);
      } // Format data for Webtrends


      var wtd = {
        argsa: event.flatMap(function (e) {
          return Object.keys(e).flatMap(function (k) {
            return [k, e[k]];
          });
        })
      };
      /* eslint-disable no-undef */

      if (typeof Webtrends !== 'undefined') { Webtrends.multiTrack(wtd); }
      /* eslint-disable no-undef */

      return ['Webtrends', wtd];
    }
  }, {
    key: "gtag",

    /**
     * Push Click Events to Google Analytics
     * @param  {string}     key  The key or event of the data
     * @param  {collection} data The data to track
     */
    value: function (_gtag) {
      function gtag(_x, _x2) {
        return _gtag.apply(this, arguments);
      }

      gtag.toString = function () {
        return _gtag.toString();
      };

      return gtag;
    }(function (key, data) {
      var uri = data.find(function (element) {
        return element.hasOwnProperty(Track.key);
      });
      var event = {
        'event_category': key
      };
      /* eslint-disable no-undef */

      if (typeof gtag !== 'undefined') { gtag(Track.key, uri[Track.key], event); }
      /* eslint-enable no-undef */

      return ['gtag', Track.key, uri[Track.key], event];
    })
  }, {
    key: "gtagView",

    /**
     * Push Screen View Events to Google Analytics
     * @param  {string}     app  The name of the application
     * @param  {string}     key  The key or event of the data
     */
    value: function gtagView(app, key) {
      var view = {
        app_name: app,
        screen_name: key
      };
      /* eslint-disable no-undef */

      if (typeof gtag !== 'undefined') { gtag('event', 'screen_view', view); }
      /* eslint-enable no-undef */

      return ['gtag', Track.key, 'screen_view', view];
    }
  }]);

  return Track;
}();
/** @type {String} The main selector to add the tracking function to */


Track.selector = '[data-js*="track"]';
/** @type {String} The main event tracking key to map to Webtrends DCS.uri */

Track.key = 'event';

module.exports = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suY29tbW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvbW9kdWxlcy91dGlsaXR5LmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy90cmFjay9UcmFjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIFV0aWxpdHkgY2xhc3NcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBVdGlsaXR5IHtcbiAgLyoqXG4gICAqIFRoZSBVdGlsaXR5IGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIFV0aWxpdHkgY2xhc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogQm9vbGVhbiBmb3IgZGVidWcgbW9kZVxuICogQHJldHVybiB7Ym9vbGVhbn0gd2V0aGVyIG9yIG5vdCB0aGUgZnJvbnQtZW5kIGlzIGluIGRlYnVnIG1vZGUuXG4gKi9cblV0aWxpdHkuZGVidWcgPSAoKSA9PiAoVXRpbGl0eS5nZXRVcmxQYXJhbWV0ZXIoVXRpbGl0eS5QQVJBTVMuREVCVUcpID09PSAnMScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4ga2V5IGluIGEgVVJMIHF1ZXJ5IHN0cmluZy4gSWYgbm8gVVJMIHF1ZXJ5XG4gKiBzdHJpbmcgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50IFVSTCBsb2NhdGlvbiBpcyB1c2VkLlxuICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZSAgICAgICAgLSBLZXkgbmFtZS5cbiAqIEBwYXJhbSAgez9zdHJpbmd9IHF1ZXJ5U3RyaW5nIC0gT3B0aW9uYWwgcXVlcnkgc3RyaW5nIHRvIGNoZWNrLlxuICogQHJldHVybiB7P3N0cmluZ30gUXVlcnkgcGFyYW1ldGVyIHZhbHVlLlxuICovXG5VdGlsaXR5LmdldFVybFBhcmFtZXRlciA9IChuYW1lLCBxdWVyeVN0cmluZykgPT4ge1xuICBjb25zdCBxdWVyeSA9IHF1ZXJ5U3RyaW5nIHx8IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGNvbnN0IHBhcmFtID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sICdcXFxcWycpLnJlcGxhY2UoL1tcXF1dLywgJ1xcXFxdJyk7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnW1xcXFw/Jl0nICsgcGFyYW0gKyAnPShbXiYjXSopJyk7XG4gIGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHF1ZXJ5KTtcblxuICByZXR1cm4gcmVzdWx0cyA9PT0gbnVsbCA/ICcnIDpcbiAgICBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59O1xuXG4vKipcbiAqIEZvciB0cmFuc2xhdGluZyBzdHJpbmdzLCB0aGVyZSBpcyBhIGdsb2JhbCBMT0NBTElaRURfU1RSSU5HUyBhcnJheSB0aGF0XG4gKiBpcyBkZWZpbmVkIG9uIHRoZSBIVE1MIHRlbXBsYXRlIGxldmVsIHNvIHRoYXQgdGhvc2Ugc3RyaW5ncyBhcmUgZXhwb3NlZCB0b1xuICogV1BNTCB0cmFuc2xhdGlvbi4gVGhlIExPQ0FMSVpFRF9TVFJJTkdTIGFycmF5IGlzIGNvbXBvc2VkIG9mIG9iamVjdHMgd2l0aCBhXG4gKiBgc2x1Z2Aga2V5IHdob3NlIHZhbHVlIGlzIHNvbWUgY29uc3RhbnQsIGFuZCBhIGBsYWJlbGAgdmFsdWUgd2hpY2ggaXMgdGhlXG4gKiB0cmFuc2xhdGVkIGVxdWl2YWxlbnQuIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBzbHVnIG5hbWUgYW5kIHJldHVybnMgdGhlXG4gKiBsYWJlbC5cbiAqIEBwYXJhbSAge3N0cmluZ30gc2x1Z1xuICogQHJldHVybiB7c3RyaW5nfSBsb2NhbGl6ZWQgdmFsdWVcbiAqL1xuVXRpbGl0eS5sb2NhbGl6ZSA9IGZ1bmN0aW9uKHNsdWcpIHtcbiAgbGV0IHRleHQgPSBzbHVnIHx8ICcnO1xuICBjb25zdCBzdHJpbmdzID0gd2luZG93LkxPQ0FMSVpFRF9TVFJJTkdTIHx8IFtdO1xuICBjb25zdCBtYXRjaCA9IHN0cmluZ3MuZmlsdGVyKFxuICAgIChzKSA9PiAocy5oYXNPd25Qcm9wZXJ0eSgnc2x1ZycpICYmIHNbJ3NsdWcnXSA9PT0gc2x1ZykgPyBzIDogZmFsc2VcbiAgKTtcbiAgcmV0dXJuIChtYXRjaFswXSAmJiBtYXRjaFswXS5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSkgPyBtYXRjaFswXS5sYWJlbCA6IHRleHQ7XG59O1xuXG4vKipcbiAqIEFwcGxpY2F0aW9uIHBhcmFtZXRlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblV0aWxpdHkuUEFSQU1TID0ge1xuICBERUJVRzogJ2RlYnVnJ1xufTtcblxuLyoqXG4gKiBTZWxlY3RvcnMgZm9yIHRoZSBVdGlsaXR5IG1vZHVsZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuVXRpbGl0eS5TRUxFQ1RPUlMgPSB7XG4gIHBhcnNlTWFya2Rvd246ICdbZGF0YS1qcz1cIm1hcmtkb3duXCJdJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbGl0eTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vanMvbW9kdWxlcy91dGlsaXR5JztcblxuLyoqXG4gKiBUcmFja2luZyBidXMgZm9yIEdvb2dsZSBhbmFseXRpY3MgYW5kIFdlYnRyZW5kcy5cbiAqL1xuY2xhc3MgVHJhY2sge1xuICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIHMgPSAoIXMpID8ge30gOiBzO1xuXG4gICAgdGhpcy5fc2V0dGluZ3MgPSB7XG4gICAgICBzZWxlY3RvcjogKHMuc2VsZWN0b3IpID8gcy5zZWxlY3RvciA6IFRyYWNrLnNlbGVjdG9yLFxuICAgIH07XG5cbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKHRoaXMuX3NldHRpbmdzLnNlbGVjdG9yKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQga2V5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudHJhY2tLZXk7XG4gICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LmRhdGFzZXQudHJhY2tEYXRhKTtcblxuICAgICAgdGhpcy5jbGljayhrZXksIGRhdGEpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgZnVuY3Rpb24gd3JhcHBlclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICogQHBhcmFtICB7Y29sbGVjdGlvbn0gZGF0YSBUaGUgZGF0YSB0byB0cmFja1xuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBmaW5hbCBkYXRhIG9iamVjdFxuICAgKi9cbiAgY2xpY2soa2V5LCBkYXRhKSB7XG4gICAgLy8gU2V0IHRoZSBwYXRoIG5hbWUgYmFzZWQgb24gdGhlIGxvY2F0aW9uXG4gICAgY29uc3QgZCA9IGRhdGEubWFwKGVsID0+IHtcbiAgICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KFRyYWNrLmtleSkpXG4gICAgICAgICAgZWxbVHJhY2sua2V5XSA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0vJHtlbFtUcmFjay5rZXldfWBcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfSk7XG5cbiAgICBsZXQgd3QgPSB0aGlzLndlYnRyZW5kcyhrZXksIGQpO1xuICAgIGxldCBnYSA9IHRoaXMuZ3RhZyhrZXksIGQpO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpXG4gICAgICBjb25zb2xlLmRpcih7J1RyYWNrJzogW3d0LCBnYV19KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuICAgIHJldHVybiBkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEYXRhIGJ1cyBmb3IgdHJhY2tpbmcgdmlld3MgaW4gV2VidHJlbmRzIGFuZCBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGFwcCAgVGhlIG5hbWUgb2YgdGhlIFNpbmdsZSBQYWdlIEFwcGxpY2F0aW9uIHRvIHRyYWNrXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICB2aWV3KGFwcCwga2V5LCBkYXRhKSB7XG4gICAgbGV0IHd0ID0gdGhpcy53ZWJ0cmVuZHMoa2V5LCBkYXRhKTtcbiAgICBsZXQgZ2EgPSB0aGlzLmd0YWdWaWV3KGFwcCwga2V5KTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICBpZiAoVXRpbGl0eS5kZWJ1ZygpKVxuICAgICAgY29uc29sZS5kaXIoeydUcmFjayc6IFt3dCwgZ2FdfSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggRXZlbnRzIHRvIFdlYnRyZW5kc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICogQHBhcmFtICB7Y29sbGVjdGlvbn0gZGF0YSBUaGUgZGF0YSB0byB0cmFja1xuICAgKi9cbiAgd2VidHJlbmRzKGtleSwgZGF0YSkge1xuICAgIGxldCBldmVudCA9IFt7XG4gICAgICAnV1QudGknOiBrZXlcbiAgICB9XTtcblxuICAgIGlmIChkYXRhWzBdICYmIGRhdGFbMF0uaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSkge1xuICAgICAgZXZlbnQucHVzaCh7XG4gICAgICAgICdEQ1MuZGNzdXJpJzogZGF0YVswXVtUcmFjay5rZXldXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbihldmVudCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gRm9ybWF0IGRhdGEgZm9yIFdlYnRyZW5kc1xuICAgIGxldCB3dGQgPSB7YXJnc2E6IGV2ZW50LmZsYXRNYXAoZSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZSkuZmxhdE1hcChrID0+IFtrLCBlW2tdXSk7XG4gICAgfSl9O1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBpZiAodHlwZW9mIFdlYnRyZW5kcyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBXZWJ0cmVuZHMubXVsdGlUcmFjayh3dGQpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5cbiAgICByZXR1cm4gWydXZWJ0cmVuZHMnLCB3dGRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIENsaWNrIEV2ZW50cyB0byBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICBndGFnKGtleSwgZGF0YSkge1xuICAgIGxldCB1cmkgPSBkYXRhLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQuaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSk7XG5cbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAnZXZlbnRfY2F0ZWdvcnknOiBrZXlcbiAgICB9O1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgZ3RhZyhUcmFjay5rZXksIHVyaVtUcmFjay5rZXldLCBldmVudCk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuXG4gICAgcmV0dXJuIFsnZ3RhZycsIFRyYWNrLmtleSwgdXJpW1RyYWNrLmtleV0sIGV2ZW50XTtcbiAgfTtcblxuICAvKipcbiAgICogUHVzaCBTY3JlZW4gVmlldyBFdmVudHMgdG8gR29vZ2xlIEFuYWx5dGljc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBhcHAgIFRoZSBuYW1lIG9mIHRoZSBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICovXG4gIGd0YWdWaWV3KGFwcCwga2V5KSB7XG4gICAgbGV0IHZpZXcgPSB7XG4gICAgICBhcHBfbmFtZTogYXBwLFxuICAgICAgc2NyZWVuX25hbWU6IGtleVxuICAgIH07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBndGFnKCdldmVudCcsICdzY3JlZW5fdmlldycsIHZpZXcpO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cblxuICAgIHJldHVybiBbJ2d0YWcnLCBUcmFjay5rZXksICdzY3JlZW5fdmlldycsIHZpZXddO1xuICB9O1xufVxuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIG1haW4gc2VsZWN0b3IgdG8gYWRkIHRoZSB0cmFja2luZyBmdW5jdGlvbiB0byAqL1xuVHJhY2suc2VsZWN0b3IgPSAnW2RhdGEtanMqPVwidHJhY2tcIl0nO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIG1haW4gZXZlbnQgdHJhY2tpbmcga2V5IHRvIG1hcCB0byBXZWJ0cmVuZHMgRENTLnVyaSAqL1xuVHJhY2sua2V5ID0gJ2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgVHJhY2s7Il0sIm5hbWVzIjpbIlV0aWxpdHkiLCJkZWJ1ZyIsImdldFVybFBhcmFtZXRlciIsIlBBUkFNUyIsIkRFQlVHIiwibmFtZSIsInF1ZXJ5U3RyaW5nIiwicXVlcnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInBhcmFtIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwicmVzdWx0cyIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhbGl6ZSIsInNsdWciLCJ0ZXh0Iiwic3RyaW5ncyIsIkxPQ0FMSVpFRF9TVFJJTkdTIiwibWF0Y2giLCJmaWx0ZXIiLCJzIiwiaGFzT3duUHJvcGVydHkiLCJsYWJlbCIsIlNFTEVDVE9SUyIsInBhcnNlTWFya2Rvd24iLCJUcmFjayIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfc2V0dGluZ3MiLCJzZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsIm1hdGNoZXMiLCJrZXkiLCJkYXRhc2V0IiwidHJhY2tLZXkiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwidHJhY2tEYXRhIiwiY2xpY2siLCJkIiwibWFwIiwiZWwiLCJwYXRobmFtZSIsInd0Iiwid2VidHJlbmRzIiwiZ2EiLCJndGFnIiwiY29uc29sZSIsImRpciIsImFwcCIsImd0YWdWaWV3IiwicHVzaCIsIk9iamVjdCIsImFzc2lnbiIsInd0ZCIsImFyZ3NhIiwiZmxhdE1hcCIsImUiLCJrZXlzIiwiayIsIldlYnRyZW5kcyIsIm11bHRpVHJhY2siLCJ1cmkiLCJmaW5kIiwiZWxlbWVudCIsInZpZXciLCJhcHBfbmFtZSIsInNjcmVlbl9uYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNTUE7Ozs7O0FBS0osbUJBQWM7OztTQUNMLElBQVA7Ozs7Ozs7O0FBUUpBLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQjtTQUFPRCxPQUFPLENBQUNFLGVBQVIsQ0FBd0JGLE9BQU8sQ0FBQ0csTUFBUixDQUFlQyxLQUF2QyxNQUFrRCxHQUF6RDtDQUFoQjs7Ozs7Ozs7OztBQVNBSixPQUFPLENBQUNFLGVBQVIsR0FBMEIsVUFBQ0csSUFBRCxFQUFPQyxXQUFQLEVBQXVCO01BQ3pDQyxLQUFLLEdBQUdELFdBQVcs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
