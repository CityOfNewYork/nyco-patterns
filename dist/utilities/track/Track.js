var Track = (function () {
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

  return Track;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9tb2R1bGVzL3V0aWxpdHkuanMiLCIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL3RyYWNrL1RyYWNrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgVXRpbGl0eSBjbGFzc1xuICogQGNsYXNzXG4gKi9cbmNsYXNzIFV0aWxpdHkge1xuICAvKipcbiAgICogVGhlIFV0aWxpdHkgY29uc3RydWN0b3JcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgVXRpbGl0eSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiBCb29sZWFuIGZvciBkZWJ1ZyBtb2RlXG4gKiBAcmV0dXJuIHtib29sZWFufSB3ZXRoZXIgb3Igbm90IHRoZSBmcm9udC1lbmQgaXMgaW4gZGVidWcgbW9kZS5cbiAqL1xuVXRpbGl0eS5kZWJ1ZyA9ICgpID0+IChVdGlsaXR5LmdldFVybFBhcmFtZXRlcihVdGlsaXR5LlBBUkFNUy5ERUJVRykgPT09ICcxJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBrZXkgaW4gYSBVUkwgcXVlcnkgc3RyaW5nLiBJZiBubyBVUkwgcXVlcnlcbiAqIHN0cmluZyBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnQgVVJMIGxvY2F0aW9uIGlzIHVzZWQuXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lICAgICAgICAtIEtleSBuYW1lLlxuICogQHBhcmFtICB7P3N0cmluZ30gcXVlcnlTdHJpbmcgLSBPcHRpb25hbCBxdWVyeSBzdHJpbmcgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHs/c3RyaW5nfSBRdWVyeSBwYXJhbWV0ZXIgdmFsdWUuXG4gKi9cblV0aWxpdHkuZ2V0VXJsUGFyYW1ldGVyID0gKG5hbWUsIHF1ZXJ5U3RyaW5nKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5ID0gcXVlcnlTdHJpbmcgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgY29uc3QgcGFyYW0gPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgJ1xcXFxbJykucmVwbGFjZSgvW1xcXV0vLCAnXFxcXF0nKTtcbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBwYXJhbSArICc9KFteJiNdKiknKTtcbiAgY29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocXVlcnkpO1xuXG4gIHJldHVybiByZXN1bHRzID09PSBudWxsID8gJycgOlxuICAgIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn07XG5cbi8qKlxuICogRm9yIHRyYW5zbGF0aW5nIHN0cmluZ3MsIHRoZXJlIGlzIGEgZ2xvYmFsIExPQ0FMSVpFRF9TVFJJTkdTIGFycmF5IHRoYXRcbiAqIGlzIGRlZmluZWQgb24gdGhlIEhUTUwgdGVtcGxhdGUgbGV2ZWwgc28gdGhhdCB0aG9zZSBzdHJpbmdzIGFyZSBleHBvc2VkIHRvXG4gKiBXUE1MIHRyYW5zbGF0aW9uLiBUaGUgTE9DQUxJWkVEX1NUUklOR1MgYXJyYXkgaXMgY29tcG9zZWQgb2Ygb2JqZWN0cyB3aXRoIGFcbiAqIGBzbHVnYCBrZXkgd2hvc2UgdmFsdWUgaXMgc29tZSBjb25zdGFudCwgYW5kIGEgYGxhYmVsYCB2YWx1ZSB3aGljaCBpcyB0aGVcbiAqIHRyYW5zbGF0ZWQgZXF1aXZhbGVudC4gVGhpcyBmdW5jdGlvbiB0YWtlcyBhIHNsdWcgbmFtZSBhbmQgcmV0dXJucyB0aGVcbiAqIGxhYmVsLlxuICogQHBhcmFtICB7c3RyaW5nfSBzbHVnXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGxvY2FsaXplZCB2YWx1ZVxuICovXG5VdGlsaXR5LmxvY2FsaXplID0gZnVuY3Rpb24oc2x1Zykge1xuICBsZXQgdGV4dCA9IHNsdWcgfHwgJyc7XG4gIGNvbnN0IHN0cmluZ3MgPSB3aW5kb3cuTE9DQUxJWkVEX1NUUklOR1MgfHwgW107XG4gIGNvbnN0IG1hdGNoID0gc3RyaW5ncy5maWx0ZXIoXG4gICAgKHMpID0+IChzLmhhc093blByb3BlcnR5KCdzbHVnJykgJiYgc1snc2x1ZyddID09PSBzbHVnKSA/IHMgOiBmYWxzZVxuICApO1xuICByZXR1cm4gKG1hdGNoWzBdICYmIG1hdGNoWzBdLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSA/IG1hdGNoWzBdLmxhYmVsIDogdGV4dDtcbn07XG5cbi8qKlxuICogQXBwbGljYXRpb24gcGFyYW1ldGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuVXRpbGl0eS5QQVJBTVMgPSB7XG4gIERFQlVHOiAnZGVidWcnXG59O1xuXG4vKipcbiAqIFNlbGVjdG9ycyBmb3IgdGhlIFV0aWxpdHkgbW9kdWxlXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5VdGlsaXR5LlNFTEVDVE9SUyA9IHtcbiAgcGFyc2VNYXJrZG93bjogJ1tkYXRhLWpzPVwibWFya2Rvd25cIl0nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsaXR5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbGl0eSBmcm9tICcuLi8uLi9qcy9tb2R1bGVzL3V0aWxpdHknO1xuXG4vKipcbiAqIFRyYWNraW5nIGJ1cyBmb3IgR29vZ2xlIGFuYWx5dGljcyBhbmQgV2VidHJlbmRzLlxuICovXG5jbGFzcyBUcmFjayB7XG4gIGNvbnN0cnVjdG9yKHMpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgcyA9ICghcykgPyB7fSA6IHM7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IHtcbiAgICAgIHNlbGVjdG9yOiAocy5zZWxlY3RvcikgPyBzLnNlbGVjdG9yIDogVHJhY2suc2VsZWN0b3IsXG4gICAgfTtcblxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXModGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGxldCBrZXkgPSBldmVudC50YXJnZXQuZGF0YXNldC50cmFja0tleTtcbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShldmVudC50YXJnZXQuZGF0YXNldC50cmFja0RhdGEpO1xuXG4gICAgICB0aGlzLmNsaWNrKGtleSwgZGF0YSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyBmdW5jdGlvbiB3cmFwcGVyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIGZpbmFsIGRhdGEgb2JqZWN0XG4gICAqL1xuICBjbGljayhrZXksIGRhdGEpIHtcbiAgICAvLyBTZXQgdGhlIHBhdGggbmFtZSBiYXNlZCBvbiB0aGUgbG9jYXRpb25cbiAgICBjb25zdCBkID0gZGF0YS5tYXAoZWwgPT4ge1xuICAgICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSlcbiAgICAgICAgICBlbFtUcmFjay5rZXldID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfS8ke2VsW1RyYWNrLmtleV19YFxuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9KTtcblxuICAgIGxldCB3dCA9IHRoaXMud2VidHJlbmRzKGtleSwgZCk7XG4gICAgbGV0IGdhID0gdGhpcy5ndGFnKGtleSwgZCk7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgaWYgKFV0aWxpdHkuZGVidWcoKSlcbiAgICAgIGNvbnNvbGUuZGlyKHsnVHJhY2snOiBbd3QsIGdhXX0pO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG4gICAgcmV0dXJuIGQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERhdGEgYnVzIGZvciB0cmFja2luZyB2aWV3cyBpbiBXZWJ0cmVuZHMgYW5kIEdvb2dsZSBBbmFseXRpY3NcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgYXBwICBUaGUgbmFtZSBvZiB0aGUgU2luZ2xlIFBhZ2UgQXBwbGljYXRpb24gdG8gdHJhY2tcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAga2V5ICBUaGUga2V5IG9yIGV2ZW50IG9mIHRoZSBkYXRhXG4gICAqIEBwYXJhbSAge2NvbGxlY3Rpb259IGRhdGEgVGhlIGRhdGEgdG8gdHJhY2tcbiAgICovXG4gIHZpZXcoYXBwLCBrZXksIGRhdGEpIHtcbiAgICBsZXQgd3QgPSB0aGlzLndlYnRyZW5kcyhrZXksIGRhdGEpO1xuICAgIGxldCBnYSA9IHRoaXMuZ3RhZ1ZpZXcoYXBwLCBrZXkpO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpXG4gICAgICBjb25zb2xlLmRpcih7J1RyYWNrJzogW3d0LCBnYV19KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgfTtcblxuICAvKipcbiAgICogUHVzaCBFdmVudHMgdG8gV2VidHJlbmRzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICB3ZWJ0cmVuZHMoa2V5LCBkYXRhKSB7XG4gICAgbGV0IGV2ZW50ID0gW3tcbiAgICAgICdXVC50aSc6IGtleVxuICAgIH1dO1xuXG4gICAgaWYgKGRhdGFbMF0gJiYgZGF0YVswXS5oYXNPd25Qcm9wZXJ0eShUcmFjay5rZXkpKSB7XG4gICAgICBldmVudC5wdXNoKHtcbiAgICAgICAgJ0RDUy5kY3N1cmknOiBkYXRhWzBdW1RyYWNrLmtleV1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKGV2ZW50LCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBGb3JtYXQgZGF0YSBmb3IgV2VidHJlbmRzXG4gICAgbGV0IHd0ZCA9IHthcmdzYTogZXZlbnQuZmxhdE1hcChlID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlKS5mbGF0TWFwKGsgPT4gW2ssIGVba11dKTtcbiAgICB9KX07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgV2VidHJlbmRzICE9PSAndW5kZWZpbmVkJylcbiAgICAgIFdlYnRyZW5kcy5tdWx0aVRyYWNrKHd0ZCk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cblxuICAgIHJldHVybiBbJ1dlYnRyZW5kcycsIHd0ZF07XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggQ2xpY2sgRXZlbnRzIHRvIEdvb2dsZSBBbmFseXRpY3NcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAga2V5ICBUaGUga2V5IG9yIGV2ZW50IG9mIHRoZSBkYXRhXG4gICAqIEBwYXJhbSAge2NvbGxlY3Rpb259IGRhdGEgVGhlIGRhdGEgdG8gdHJhY2tcbiAgICovXG4gIGd0YWcoa2V5LCBkYXRhKSB7XG4gICAgbGV0IHVyaSA9IGRhdGEuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5oYXNPd25Qcm9wZXJ0eShUcmFjay5rZXkpKTtcblxuICAgIGxldCBldmVudCA9IHtcbiAgICAgICdldmVudF9jYXRlZ29yeSc6IGtleVxuICAgIH07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBndGFnKFRyYWNrLmtleSwgdXJpW1RyYWNrLmtleV0sIGV2ZW50KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXG5cbiAgICByZXR1cm4gWydndGFnJywgVHJhY2sua2V5LCB1cmlbVHJhY2sua2V5XSwgZXZlbnRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIFNjcmVlbiBWaWV3IEV2ZW50cyB0byBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGFwcCAgVGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKi9cbiAgZ3RhZ1ZpZXcoYXBwLCBrZXkpIHtcbiAgICBsZXQgdmlldyA9IHtcbiAgICAgIGFwcF9uYW1lOiBhcHAsXG4gICAgICBzY3JlZW5fbmFtZToga2V5XG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJylcbiAgICAgIGd0YWcoJ2V2ZW50JywgJ3NjcmVlbl92aWV3Jywgdmlldyk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuXG4gICAgcmV0dXJuIFsnZ3RhZycsIFRyYWNrLmtleSwgJ3NjcmVlbl92aWV3Jywgdmlld107XG4gIH07XG59XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBzZWxlY3RvciB0byBhZGQgdGhlIHRyYWNraW5nIGZ1bmN0aW9uIHRvICovXG5UcmFjay5zZWxlY3RvciA9ICdbZGF0YS1qcyo9XCJ0cmFja1wiXSc7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBldmVudCB0cmFja2luZyBrZXkgdG8gbWFwIHRvIFdlYnRyZW5kcyBEQ1MudXJpICovXG5UcmFjay5rZXkgPSAnZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBUcmFjazsiXSwibmFtZXMiOlsiVXRpbGl0eSIsImRlYnVnIiwiZ2V0VXJsUGFyYW1ldGVyIiwiUEFSQU1TIiwiREVCVUciLCJuYW1lIiwicXVlcnlTdHJpbmciLCJxdWVyeSIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwicGFyYW0iLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJyZXN1bHRzIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImxvY2FsaXplIiwic2x1ZyIsInRleHQiLCJzdHJpbmdzIiwiTE9DQUxJWkVEX1NUUklOR1MiLCJtYXRjaCIsImZpbHRlciIsInMiLCJoYXNPd25Qcm9wZXJ0eSIsImxhYmVsIiwiU0VMRUNUT1JTIiwicGFyc2VNYXJrZG93biIsIlRyYWNrIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsImtleSIsImRhdGFzZXQiLCJ0cmFja0tleSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJ0cmFja0RhdGEiLCJjbGljayIsImQiLCJtYXAiLCJlbCIsInBhdGhuYW1lIiwid3QiLCJ3ZWJ0cmVuZHMiLCJnYSIsImd0YWciLCJjb25zb2xlIiwiZGlyIiwiYXBwIiwiZ3RhZ1ZpZXciLCJwdXNoIiwiT2JqZWN0IiwiYXNzaWduIiwid3RkIiwiYXJnc2EiLCJmbGF0TWFwIiwiZSIsImtleXMiLCJrIiwiV2VidHJlbmRzIiwibXVsdGlUcmFjayIsInVyaSIsImZpbmQiLCJlbGVtZW50IiwidmlldyIsImFwcF9uYW1lIiwic2NyZWVuX25hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFNTUE7Ozs7O0VBS0osbUJBQWM7OztXQUNMLElBQVA7Ozs7Ozs7O0VBUUpBLE9BQU8sQ0FBQ0MsS0FBUixHQUFnQjtXQUFPRCxPQUFPLENBQUNFLGVBQVIsQ0FBd0JGLE9BQU8sQ0FBQ0csTUFBUixDQUFlQyxLQUF2QyxNQUFrRCxHQUF6RDtHQUFoQjs7Ozs7Ozs7OztFQVNBSixPQUFPLENBQUNFLGVBQVIsR0FBMEIsVUFBQ0csSUFBRCxFQUFPQyxXQUFQLEVBQXVCO1FBQ3pDQyxLQUFLLEdBQUdELFdBQVcsSUFBSUUs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
