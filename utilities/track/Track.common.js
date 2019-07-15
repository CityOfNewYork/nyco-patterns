'use strict';

/**
 * The Utility class
 * @class
 */

var Utility = function Utility() {
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

var Track = function Track(s) {
  var this$1 = this;
  var body = document.querySelector('body');
  s = !s ? {} : s;
  this._settings = {
    selector: s.selector ? s.selector : Track.selector
  };
  body.addEventListener('click', function (event) {
    if (!event.target.matches(this$1._settings.selector)) {
      return;
    }

    var key = event.target.dataset.trackKey;
    var data = JSON.parse(event.target.dataset.trackData);
    this$1.click(key, data);
  });
  return this;
};
/**
 * Tracking function wrapper
 * @param{string}   keyThe key or event of the data
 * @param{collection} data The data to track
 * @return {object}        The final data object
 */


Track.prototype.click = function click(key, data) {
  // Set the path name based on the location
  var d = data.map(function (el) {
    if (el.hasOwnProperty(Track.key)) {
      el[Track.key] = window.location.pathname + "/" + el[Track.key];
    }

    return el;
  });
  var wt = this.webtrends(key, d);
  var ga = this.gtag(key, d);
  /* eslint-disable no-console */

  if (Utility.debug()) {
    console.dir({
      'Track': [wt, ga]
    });
  }
  /* eslint-enable no-console */


  return d;
};
/**
 * Data bus for tracking views in Webtrends and Google Analytics
 * @param{string}   appThe name of the Single Page Application to track
 * @param{string}   keyThe key or event of the data
 * @param{collection} data The data to track
 */

Track.prototype.view = function view(app, key, data) {
  var wt = this.webtrends(key, data);
  var ga = this.gtagView(app, key);
  /* eslint-disable no-console */

  if (Utility.debug()) {
    console.dir({
      'Track': [wt, ga]
    });
  }
  /* eslint-enable no-console */

};
/**
 * Push Events to Webtrends
 * @param{string}   keyThe key or event of the data
 * @param{collection} data The data to track
 */

Track.prototype.webtrends = function webtrends(key, data) {
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

  if (typeof Webtrends !== 'undefined') {
    Webtrends.multiTrack(wtd);
  }
  /* eslint-disable no-undef */


  return ['Webtrends', wtd];
};
/**
 * Push Click Events to Google Analytics
 * @param{string}   keyThe key or event of the data
 * @param{collection} data The data to track
 */

Track.prototype.gtag = function gtag$1(key, data) {
  var uri = data.find(function (element) {
    return element.hasOwnProperty(Track.key);
  });
  var event = {
    'event_category': key
  };
  /* eslint-disable no-undef */

  if (typeof gtag !== 'undefined') {
    gtag(Track.key, uri[Track.key], event);
  }
  /* eslint-enable no-undef */


  return ['gtag', Track.key, uri[Track.key], event];
};
/**
 * Push Screen View Events to Google Analytics
 * @param{string}   appThe name of the application
 * @param{string}   keyThe key or event of the data
 */

Track.prototype.gtagView = function gtagView(app, key) {
  var view = {
    app_name: app,
    screen_name: key
  };
  /* eslint-disable no-undef */

  if (typeof gtag !== 'undefined') {
    gtag('event', 'screen_view', view);
  }
  /* eslint-enable no-undef */


  return ['gtag', Track.key, 'screen_view', view];
};
/** @type {String} The main selector to add the tracking function to */


Track.selector = '[data-js*="track"]';
/** @type {String} The main event tracking key to map to Webtrends DCS.uri */

Track.key = 'event';

module.exports = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suY29tbW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvanMvbW9kdWxlcy91dGlsaXR5LmpzIiwiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy90cmFjay9UcmFjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhlIFV0aWxpdHkgY2xhc3NcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBVdGlsaXR5IHtcbiAgLyoqXG4gICAqIFRoZSBVdGlsaXR5IGNvbnN0cnVjdG9yXG4gICAqIEByZXR1cm4ge29iamVjdH0gVGhlIFV0aWxpdHkgY2xhc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogQm9vbGVhbiBmb3IgZGVidWcgbW9kZVxuICogQHJldHVybiB7Ym9vbGVhbn0gd2V0aGVyIG9yIG5vdCB0aGUgZnJvbnQtZW5kIGlzIGluIGRlYnVnIG1vZGUuXG4gKi9cblV0aWxpdHkuZGVidWcgPSAoKSA9PiAoVXRpbGl0eS5nZXRVcmxQYXJhbWV0ZXIoVXRpbGl0eS5QQVJBTVMuREVCVUcpID09PSAnMScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZ2l2ZW4ga2V5IGluIGEgVVJMIHF1ZXJ5IHN0cmluZy4gSWYgbm8gVVJMIHF1ZXJ5XG4gKiBzdHJpbmcgaXMgcHJvdmlkZWQsIHRoZSBjdXJyZW50IFVSTCBsb2NhdGlvbiBpcyB1c2VkLlxuICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZSAgICAgICAgLSBLZXkgbmFtZS5cbiAqIEBwYXJhbSAgez9zdHJpbmd9IHF1ZXJ5U3RyaW5nIC0gT3B0aW9uYWwgcXVlcnkgc3RyaW5nIHRvIGNoZWNrLlxuICogQHJldHVybiB7P3N0cmluZ30gUXVlcnkgcGFyYW1ldGVyIHZhbHVlLlxuICovXG5VdGlsaXR5LmdldFVybFBhcmFtZXRlciA9IChuYW1lLCBxdWVyeVN0cmluZykgPT4ge1xuICBjb25zdCBxdWVyeSA9IHF1ZXJ5U3RyaW5nIHx8IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGNvbnN0IHBhcmFtID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sICdcXFxcWycpLnJlcGxhY2UoL1tcXF1dLywgJ1xcXFxdJyk7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cCgnW1xcXFw/Jl0nICsgcGFyYW0gKyAnPShbXiYjXSopJyk7XG4gIGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHF1ZXJ5KTtcblxuICByZXR1cm4gcmVzdWx0cyA9PT0gbnVsbCA/ICcnIDpcbiAgICBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG59O1xuXG4vKipcbiAqIEZvciB0cmFuc2xhdGluZyBzdHJpbmdzLCB0aGVyZSBpcyBhIGdsb2JhbCBMT0NBTElaRURfU1RSSU5HUyBhcnJheSB0aGF0XG4gKiBpcyBkZWZpbmVkIG9uIHRoZSBIVE1MIHRlbXBsYXRlIGxldmVsIHNvIHRoYXQgdGhvc2Ugc3RyaW5ncyBhcmUgZXhwb3NlZCB0b1xuICogV1BNTCB0cmFuc2xhdGlvbi4gVGhlIExPQ0FMSVpFRF9TVFJJTkdTIGFycmF5IGlzIGNvbXBvc2VkIG9mIG9iamVjdHMgd2l0aCBhXG4gKiBgc2x1Z2Aga2V5IHdob3NlIHZhbHVlIGlzIHNvbWUgY29uc3RhbnQsIGFuZCBhIGBsYWJlbGAgdmFsdWUgd2hpY2ggaXMgdGhlXG4gKiB0cmFuc2xhdGVkIGVxdWl2YWxlbnQuIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBzbHVnIG5hbWUgYW5kIHJldHVybnMgdGhlXG4gKiBsYWJlbC5cbiAqIEBwYXJhbSAge3N0cmluZ30gc2x1Z1xuICogQHJldHVybiB7c3RyaW5nfSBsb2NhbGl6ZWQgdmFsdWVcbiAqL1xuVXRpbGl0eS5sb2NhbGl6ZSA9IGZ1bmN0aW9uKHNsdWcpIHtcbiAgbGV0IHRleHQgPSBzbHVnIHx8ICcnO1xuICBjb25zdCBzdHJpbmdzID0gd2luZG93LkxPQ0FMSVpFRF9TVFJJTkdTIHx8IFtdO1xuICBjb25zdCBtYXRjaCA9IHN0cmluZ3MuZmlsdGVyKFxuICAgIChzKSA9PiAocy5oYXNPd25Qcm9wZXJ0eSgnc2x1ZycpICYmIHNbJ3NsdWcnXSA9PT0gc2x1ZykgPyBzIDogZmFsc2VcbiAgKTtcbiAgcmV0dXJuIChtYXRjaFswXSAmJiBtYXRjaFswXS5oYXNPd25Qcm9wZXJ0eSgnbGFiZWwnKSkgPyBtYXRjaFswXS5sYWJlbCA6IHRleHQ7XG59O1xuXG4vKipcbiAqIEFwcGxpY2F0aW9uIHBhcmFtZXRlcnNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cblV0aWxpdHkuUEFSQU1TID0ge1xuICBERUJVRzogJ2RlYnVnJ1xufTtcblxuLyoqXG4gKiBTZWxlY3RvcnMgZm9yIHRoZSBVdGlsaXR5IG1vZHVsZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuVXRpbGl0eS5TRUxFQ1RPUlMgPSB7XG4gIHBhcnNlTWFya2Rvd246ICdbZGF0YS1qcz1cIm1hcmtkb3duXCJdJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbGl0eTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFV0aWxpdHkgZnJvbSAnLi4vLi4vanMvbW9kdWxlcy91dGlsaXR5JztcblxuLyoqXG4gKiBUcmFja2luZyBidXMgZm9yIEdvb2dsZSBhbmFseXRpY3MgYW5kIFdlYnRyZW5kcy5cbiAqL1xuY2xhc3MgVHJhY2sge1xuICBjb25zdHJ1Y3RvcihzKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIHMgPSAoIXMpID8ge30gOiBzO1xuXG4gICAgdGhpcy5fc2V0dGluZ3MgPSB7XG4gICAgICBzZWxlY3RvcjogKHMuc2VsZWN0b3IpID8gcy5zZWxlY3RvciA6IFRyYWNrLnNlbGVjdG9yLFxuICAgIH07XG5cbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKHRoaXMuX3NldHRpbmdzLnNlbGVjdG9yKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQga2V5ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudHJhY2tLZXk7XG4gICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LmRhdGFzZXQudHJhY2tEYXRhKTtcblxuICAgICAgdGhpcy5jbGljayhrZXksIGRhdGEpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2tpbmcgZnVuY3Rpb24gd3JhcHBlclxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICogQHBhcmFtICB7Y29sbGVjdGlvbn0gZGF0YSBUaGUgZGF0YSB0byB0cmFja1xuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFRoZSBmaW5hbCBkYXRhIG9iamVjdFxuICAgKi9cbiAgY2xpY2soa2V5LCBkYXRhKSB7XG4gICAgLy8gU2V0IHRoZSBwYXRoIG5hbWUgYmFzZWQgb24gdGhlIGxvY2F0aW9uXG4gICAgY29uc3QgZCA9IGRhdGEubWFwKGVsID0+IHtcbiAgICAgICAgaWYgKGVsLmhhc093blByb3BlcnR5KFRyYWNrLmtleSkpXG4gICAgICAgICAgZWxbVHJhY2sua2V5XSA9IGAke3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZX0vJHtlbFtUcmFjay5rZXldfWBcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfSk7XG5cbiAgICBsZXQgd3QgPSB0aGlzLndlYnRyZW5kcyhrZXksIGQpO1xuICAgIGxldCBnYSA9IHRoaXMuZ3RhZyhrZXksIGQpO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpXG4gICAgICBjb25zb2xlLmRpcih7J1RyYWNrJzogW3d0LCBnYV19KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cblxuICAgIHJldHVybiBkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEYXRhIGJ1cyBmb3IgdHJhY2tpbmcgdmlld3MgaW4gV2VidHJlbmRzIGFuZCBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGFwcCAgVGhlIG5hbWUgb2YgdGhlIFNpbmdsZSBQYWdlIEFwcGxpY2F0aW9uIHRvIHRyYWNrXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICB2aWV3KGFwcCwga2V5LCBkYXRhKSB7XG4gICAgbGV0IHd0ID0gdGhpcy53ZWJ0cmVuZHMoa2V5LCBkYXRhKTtcbiAgICBsZXQgZ2EgPSB0aGlzLmd0YWdWaWV3KGFwcCwga2V5KTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICBpZiAoVXRpbGl0eS5kZWJ1ZygpKVxuICAgICAgY29uc29sZS5kaXIoeydUcmFjayc6IFt3dCwgZ2FdfSk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggRXZlbnRzIHRvIFdlYnRyZW5kc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICogQHBhcmFtICB7Y29sbGVjdGlvbn0gZGF0YSBUaGUgZGF0YSB0byB0cmFja1xuICAgKi9cbiAgd2VidHJlbmRzKGtleSwgZGF0YSkge1xuICAgIGxldCBldmVudCA9IFt7XG4gICAgICAnV1QudGknOiBrZXlcbiAgICB9XTtcblxuICAgIGlmIChkYXRhWzBdICYmIGRhdGFbMF0uaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSkge1xuICAgICAgZXZlbnQucHVzaCh7XG4gICAgICAgICdEQ1MuZGNzdXJpJzogZGF0YVswXVtUcmFjay5rZXldXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmFzc2lnbihldmVudCwgZGF0YSk7XG4gICAgfVxuXG4gICAgLy8gRm9ybWF0IGRhdGEgZm9yIFdlYnRyZW5kc1xuICAgIGxldCB3dGQgPSB7YXJnc2E6IGV2ZW50LmZsYXRNYXAoZSA9PiB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoZSkuZmxhdE1hcChrID0+IFtrLCBlW2tdXSk7XG4gICAgfSl9O1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBpZiAodHlwZW9mIFdlYnRyZW5kcyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBXZWJ0cmVuZHMubXVsdGlUcmFjayh3dGQpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5cbiAgICByZXR1cm4gWydXZWJ0cmVuZHMnLCB3dGRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIENsaWNrIEV2ZW50cyB0byBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICBndGFnKGtleSwgZGF0YSkge1xuICAgIGxldCB1cmkgPSBkYXRhLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQuaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSk7XG5cbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICAnZXZlbnRfY2F0ZWdvcnknOiBrZXlcbiAgICB9O1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnKVxuICAgICAgZ3RhZyhUcmFjay5rZXksIHVyaVtUcmFjay5rZXldLCBldmVudCk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuXG4gICAgcmV0dXJuIFsnZ3RhZycsIFRyYWNrLmtleSwgdXJpW1RyYWNrLmtleV0sIGV2ZW50XTtcbiAgfTtcblxuICAvKipcbiAgICogUHVzaCBTY3JlZW4gVmlldyBFdmVudHMgdG8gR29vZ2xlIEFuYWx5dGljc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBhcHAgIFRoZSBuYW1lIG9mIHRoZSBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICBrZXkgIFRoZSBrZXkgb3IgZXZlbnQgb2YgdGhlIGRhdGFcbiAgICovXG4gIGd0YWdWaWV3KGFwcCwga2V5KSB7XG4gICAgbGV0IHZpZXcgPSB7XG4gICAgICBhcHBfbmFtZTogYXBwLFxuICAgICAgc2NyZWVuX25hbWU6IGtleVxuICAgIH07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBndGFnKCdldmVudCcsICdzY3JlZW5fdmlldycsIHZpZXcpO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cblxuICAgIHJldHVybiBbJ2d0YWcnLCBUcmFjay5rZXksICdzY3JlZW5fdmlldycsIHZpZXddO1xuICB9O1xufVxuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIG1haW4gc2VsZWN0b3IgdG8gYWRkIHRoZSB0cmFja2luZyBmdW5jdGlvbiB0byAqL1xuVHJhY2suc2VsZWN0b3IgPSAnW2RhdGEtanMqPVwidHJhY2tcIl0nO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIG1haW4gZXZlbnQgdHJhY2tpbmcga2V5IHRvIG1hcCB0byBXZWJ0cmVuZHMgRENTLnVyaSAqL1xuVHJhY2sua2V5ID0gJ2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgVHJhY2s7Il0sIm5hbWVzIjpbIlV0aWxpdHkiLCJkZWJ1ZyIsImdldFVybFBhcmFtZXRlciIsIlBBUkFNUyIsIkRFQlVHIiwibmFtZSIsInF1ZXJ5U3RyaW5nIiwicXVlcnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsImNvbnN0IiwicGFyYW0iLCJyZXBsYWNlIiwicmVnZXgiLCJSZWdFeHAiLCJyZXN1bHRzIiwiZXhlYyIsImRlY29kZVVSSUNvbXBvbmVudCIsImxvY2FsaXplIiwic2x1ZyIsInRleHQiLCJsZXQiLCJzdHJpbmdzIiwiTE9DQUxJWkVEX1NUUklOR1MiLCJtYXRjaCIsImZpbHRlciIsInMiLCJoYXNPd25Qcm9wZXJ0eSIsImxhYmVsIiwiU0VMRUNUT1JTIiwicGFyc2VNYXJrZG93biIsIlRyYWNrIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsInRoaXMiLCJrZXkiLCJkYXRhc2V0IiwidHJhY2tLZXkiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwidHJhY2tEYXRhIiwidGhpcyQxIiwiY2xpY2siLCJkIiwibWFwIiwiZWwiLCJwYXRobmFtZSIsInd0Iiwid2VidHJlbmRzIiwiZ2EiLCJndGFnIiwiY29uc29sZSIsImRpciIsInZpZXciLCJhcHAiLCJndGFnVmlldyIsInB1c2giLCJPYmplY3QiLCJhc3NpZ24iLCJ3dGQiLCJhcmdzYSIsImZsYXRNYXAiLCJlIiwia2V5cyIsImsiLCJXZWJ0cmVuZHMiLCJtdWx0aVRyYWNrIiwidXJpIiwiZmluZCIsImVsZW1lbnQiLCJhcHBfbmFtZSIsInNjcmVlbl9uYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUEsSUFBTUEsT0FBTyxHQUtYLGdCQUFBLEdBQWM7U0FDTCxJQUFUO0NBTkY7Ozs7Ozs7QUFjQUEsT0FBTyxDQUFDQyxLQUFSLGVBQW1CO1NBQUlELE9BQU8sQ0FBQ0UsZUFBUixDQUF3QkYsT0FBTyxDQUFDRyxNQUFSLENBQWVDLEtBQXZDLE1BQWtEO0NBQXpFOzs7Ozs7Ozs7O0FBU0FKLE9BQU8sQ0FBQ0UsZUFBUixhQUEyQkcsTUFBTUMsYUFBYTtNQUN0Q0MsS0FBSyxHQUFHRCxX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
