var Track=function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),n=function t(){return e(this,t),this};n.debug=function(){return"1"===n.getUrlParameter(n.PARAMS.DEBUG)},n.getUrlParameter=function(e,t){var n=t||window.location.search,r=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),a=new RegExp("[\\?&]"+r+"=([^&#]*)").exec(n);return null===a?"":decodeURIComponent(a[1].replace(/\+/g," "))},n.localize=function(e){var t=e||"",n=(window.LOCALIZED_STRINGS||[]).filter(function(t){return!(!t.hasOwnProperty("slug")||t.slug!==e)&&t});return n[0]&&n[0].hasOwnProperty("label")?n[0].label:t},n.PARAMS={DEBUG:"debug"},n.SELECTORS={parseMarkdown:'[data-js="markdown"]'};var r=function(){function r(t){var n=this;e(this,r);var a=document.querySelector("body");return t=t||{},this._settings={selector:t.selector?t.selector:r.selector},a.addEventListener("click",function(e){if(e.target.matches(n._settings.selector)){var t=e.target.dataset.trackKey,r=JSON.parse(e.target.dataset.trackData);n.click(t,r)}}),this}return t(r,[{key:"click",value:function(e,t){var a=t.map(function(e){return e.hasOwnProperty(r.key)&&(e[r.key]=window.location.pathname+"/"+e[r.key]),e}),i=this.webtrends(e,a),c=this.gtag(e,a);return n.debug()&&console.dir({Track:[i,c]}),a}},{key:"view",value:function(e,t,r){var a=this.webtrends(t,r),i=this.gtagView(e,t);n.debug()&&console.dir({Track:[a,i]})}},{key:"webtrends",value:function(e,t){var n=[{"WT.ti":e}];t[0]&&t[0].hasOwnProperty(r.key)?n.push({"DCS.dcsuri":t[0][r.key]}):Object.assign(n,t);var a={argsa:n.flatMap(function(e){return Object.keys(e).flatMap(function(t){return[t,e[t]]})})};return"undefined"!=typeof Webtrends&&Webtrends.multiTrack(a),["Webtrends",a]}},{key:"gtag",value:function(e){function t(t,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e,t){var n=t.find(function(e){return e.hasOwnProperty(r.key)}),a={event_category:e};return"undefined"!=typeof gtag&&gtag(r.key,n[r.key],a),["gtag",r.key,n[r.key],a]})},{key:"gtagView",value:function(e,t){var n={app_name:e,screen_name:t};return"undefined"!=typeof gtag&&gtag("event","screen_view",n),["gtag",r.key,"screen_view",n]}}]),r}();return r.selector='[data-js*="track"]',r.key="event",r}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9tb2R1bGVzL3V0aWxpdHkuanMiLCIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL3RyYWNrL1RyYWNrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgVXRpbGl0eSBjbGFzc1xuICogQGNsYXNzXG4gKi9cbmNsYXNzIFV0aWxpdHkge1xuICAvKipcbiAgICogVGhlIFV0aWxpdHkgY29uc3RydWN0b3JcbiAgICogQHJldHVybiB7b2JqZWN0fSBUaGUgVXRpbGl0eSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiBCb29sZWFuIGZvciBkZWJ1ZyBtb2RlXG4gKiBAcmV0dXJuIHtib29sZWFufSB3ZXRoZXIgb3Igbm90IHRoZSBmcm9udC1lbmQgaXMgaW4gZGVidWcgbW9kZS5cbiAqL1xuVXRpbGl0eS5kZWJ1ZyA9ICgpID0+IChVdGlsaXR5LmdldFVybFBhcmFtZXRlcihVdGlsaXR5LlBBUkFNUy5ERUJVRykgPT09ICcxJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBnaXZlbiBrZXkgaW4gYSBVUkwgcXVlcnkgc3RyaW5nLiBJZiBubyBVUkwgcXVlcnlcbiAqIHN0cmluZyBpcyBwcm92aWRlZCwgdGhlIGN1cnJlbnQgVVJMIGxvY2F0aW9uIGlzIHVzZWQuXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lICAgICAgICAtIEtleSBuYW1lLlxuICogQHBhcmFtICB7P3N0cmluZ30gcXVlcnlTdHJpbmcgLSBPcHRpb25hbCBxdWVyeSBzdHJpbmcgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHs/c3RyaW5nfSBRdWVyeSBwYXJhbWV0ZXIgdmFsdWUuXG4gKi9cblV0aWxpdHkuZ2V0VXJsUGFyYW1ldGVyID0gKG5hbWUsIHF1ZXJ5U3RyaW5nKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5ID0gcXVlcnlTdHJpbmcgfHwgd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgY29uc3QgcGFyYW0gPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgJ1xcXFxbJykucmVwbGFjZSgvW1xcXV0vLCAnXFxcXF0nKTtcbiAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBwYXJhbSArICc9KFteJiNdKiknKTtcbiAgY29uc3QgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMocXVlcnkpO1xuXG4gIHJldHVybiByZXN1bHRzID09PSBudWxsID8gJycgOlxuICAgIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn07XG5cbi8qKlxuICogRm9yIHRyYW5zbGF0aW5nIHN0cmluZ3MsIHRoZXJlIGlzIGEgZ2xvYmFsIExPQ0FMSVpFRF9TVFJJTkdTIGFycmF5IHRoYXRcbiAqIGlzIGRlZmluZWQgb24gdGhlIEhUTUwgdGVtcGxhdGUgbGV2ZWwgc28gdGhhdCB0aG9zZSBzdHJpbmdzIGFyZSBleHBvc2VkIHRvXG4gKiBXUE1MIHRyYW5zbGF0aW9uLiBUaGUgTE9DQUxJWkVEX1NUUklOR1MgYXJyYXkgaXMgY29tcG9zZWQgb2Ygb2JqZWN0cyB3aXRoIGFcbiAqIGBzbHVnYCBrZXkgd2hvc2UgdmFsdWUgaXMgc29tZSBjb25zdGFudCwgYW5kIGEgYGxhYmVsYCB2YWx1ZSB3aGljaCBpcyB0aGVcbiAqIHRyYW5zbGF0ZWQgZXF1aXZhbGVudC4gVGhpcyBmdW5jdGlvbiB0YWtlcyBhIHNsdWcgbmFtZSBhbmQgcmV0dXJucyB0aGVcbiAqIGxhYmVsLlxuICogQHBhcmFtICB7c3RyaW5nfSBzbHVnXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGxvY2FsaXplZCB2YWx1ZVxuICovXG5VdGlsaXR5LmxvY2FsaXplID0gZnVuY3Rpb24oc2x1Zykge1xuICBsZXQgdGV4dCA9IHNsdWcgfHwgJyc7XG4gIGNvbnN0IHN0cmluZ3MgPSB3aW5kb3cuTE9DQUxJWkVEX1NUUklOR1MgfHwgW107XG4gIGNvbnN0IG1hdGNoID0gc3RyaW5ncy5maWx0ZXIoXG4gICAgKHMpID0+IChzLmhhc093blByb3BlcnR5KCdzbHVnJykgJiYgc1snc2x1ZyddID09PSBzbHVnKSA/IHMgOiBmYWxzZVxuICApO1xuICByZXR1cm4gKG1hdGNoWzBdICYmIG1hdGNoWzBdLmhhc093blByb3BlcnR5KCdsYWJlbCcpKSA/IG1hdGNoWzBdLmxhYmVsIDogdGV4dDtcbn07XG5cbi8qKlxuICogQXBwbGljYXRpb24gcGFyYW1ldGVyc1xuICogQHR5cGUge09iamVjdH1cbiAqL1xuVXRpbGl0eS5QQVJBTVMgPSB7XG4gIERFQlVHOiAnZGVidWcnXG59O1xuXG4vKipcbiAqIFNlbGVjdG9ycyBmb3IgdGhlIFV0aWxpdHkgbW9kdWxlXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5VdGlsaXR5LlNFTEVDVE9SUyA9IHtcbiAgcGFyc2VNYXJrZG93bjogJ1tkYXRhLWpzPVwibWFya2Rvd25cIl0nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsaXR5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbGl0eSBmcm9tICcuLi8uLi9qcy9tb2R1bGVzL3V0aWxpdHknO1xuXG4vKipcbiAqIFRyYWNraW5nIGJ1cyBmb3IgR29vZ2xlIGFuYWx5dGljcyBhbmQgV2VidHJlbmRzLlxuICovXG5jbGFzcyBUcmFjayB7XG4gIGNvbnN0cnVjdG9yKHMpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgcyA9ICghcykgPyB7fSA6IHM7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IHtcbiAgICAgIHNlbGVjdG9yOiAocy5zZWxlY3RvcikgPyBzLnNlbGVjdG9yIDogVHJhY2suc2VsZWN0b3IsXG4gICAgfTtcblxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXModGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGxldCBrZXkgPSBldmVudC50YXJnZXQuZGF0YXNldC50cmFja0tleTtcbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShldmVudC50YXJnZXQuZGF0YXNldC50cmFja0RhdGEpO1xuXG4gICAgICB0aGlzLmNsaWNrKGtleSwgZGF0YSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFja2luZyBmdW5jdGlvbiB3cmFwcGVyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgVGhlIGZpbmFsIGRhdGEgb2JqZWN0XG4gICAqL1xuICBjbGljayhrZXksIGRhdGEpIHtcbiAgICAvLyBTZXQgdGhlIHBhdGggbmFtZSBiYXNlZCBvbiB0aGUgbG9jYXRpb25cbiAgICBjb25zdCBkID0gZGF0YS5tYXAoZWwgPT4ge1xuICAgICAgICBpZiAoZWwuaGFzT3duUHJvcGVydHkoVHJhY2sua2V5KSlcbiAgICAgICAgICBlbFtUcmFjay5rZXldID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfS8ke2VsW1RyYWNrLmtleV19YFxuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9KTtcblxuICAgIGxldCB3dCA9IHRoaXMud2VidHJlbmRzKGtleSwgZCk7XG4gICAgbGV0IGdhID0gdGhpcy5ndGFnKGtleSwgZCk7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgaWYgKFV0aWxpdHkuZGVidWcoKSlcbiAgICAgIGNvbnNvbGUuZGlyKHsnVHJhY2snOiBbd3QsIGdhXX0pO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG4gICAgcmV0dXJuIGQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERhdGEgYnVzIGZvciB0cmFja2luZyB2aWV3cyBpbiBXZWJ0cmVuZHMgYW5kIEdvb2dsZSBBbmFseXRpY3NcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgYXBwICBUaGUgbmFtZSBvZiB0aGUgU2luZ2xlIFBhZ2UgQXBwbGljYXRpb24gdG8gdHJhY2tcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAga2V5ICBUaGUga2V5IG9yIGV2ZW50IG9mIHRoZSBkYXRhXG4gICAqIEBwYXJhbSAge2NvbGxlY3Rpb259IGRhdGEgVGhlIGRhdGEgdG8gdHJhY2tcbiAgICovXG4gIHZpZXcoYXBwLCBrZXksIGRhdGEpIHtcbiAgICBsZXQgd3QgPSB0aGlzLndlYnRyZW5kcyhrZXksIGRhdGEpO1xuICAgIGxldCBnYSA9IHRoaXMuZ3RhZ1ZpZXcoYXBwLCBrZXkpO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgIGlmIChVdGlsaXR5LmRlYnVnKCkpXG4gICAgICBjb25zb2xlLmRpcih7J1RyYWNrJzogW3d0LCBnYV19KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgfTtcblxuICAvKipcbiAgICogUHVzaCBFdmVudHMgdG8gV2VidHJlbmRzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKiBAcGFyYW0gIHtjb2xsZWN0aW9ufSBkYXRhIFRoZSBkYXRhIHRvIHRyYWNrXG4gICAqL1xuICB3ZWJ0cmVuZHMoa2V5LCBkYXRhKSB7XG4gICAgbGV0IGV2ZW50ID0gW3tcbiAgICAgICdXVC50aSc6IGtleVxuICAgIH1dO1xuXG4gICAgaWYgKGRhdGFbMF0gJiYgZGF0YVswXS5oYXNPd25Qcm9wZXJ0eShUcmFjay5rZXkpKSB7XG4gICAgICBldmVudC5wdXNoKHtcbiAgICAgICAgJ0RDUy5kY3N1cmknOiBkYXRhWzBdW1RyYWNrLmtleV1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKGV2ZW50LCBkYXRhKTtcbiAgICB9XG5cbiAgICAvLyBGb3JtYXQgZGF0YSBmb3IgV2VidHJlbmRzXG4gICAgbGV0IHd0ZCA9IHthcmdzYTogZXZlbnQuZmxhdE1hcChlID0+IHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhlKS5mbGF0TWFwKGsgPT4gW2ssIGVba11dKTtcbiAgICB9KX07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgV2VidHJlbmRzICE9PSAndW5kZWZpbmVkJylcbiAgICAgIFdlYnRyZW5kcy5tdWx0aVRyYWNrKHd0ZCk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cblxuICAgIHJldHVybiBbJ1dlYnRyZW5kcycsIHd0ZF07XG4gIH07XG5cbiAgLyoqXG4gICAqIFB1c2ggQ2xpY2sgRXZlbnRzIHRvIEdvb2dsZSBBbmFseXRpY3NcbiAgICogQHBhcmFtICB7c3RyaW5nfSAgICAga2V5ICBUaGUga2V5IG9yIGV2ZW50IG9mIHRoZSBkYXRhXG4gICAqIEBwYXJhbSAge2NvbGxlY3Rpb259IGRhdGEgVGhlIGRhdGEgdG8gdHJhY2tcbiAgICovXG4gIGd0YWcoa2V5LCBkYXRhKSB7XG4gICAgbGV0IHVyaSA9IGRhdGEuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5oYXNPd25Qcm9wZXJ0eShUcmFjay5rZXkpKTtcblxuICAgIGxldCBldmVudCA9IHtcbiAgICAgICdldmVudF9jYXRlZ29yeSc6IGtleVxuICAgIH07XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICBndGFnKFRyYWNrLmtleSwgdXJpW1RyYWNrLmtleV0sIGV2ZW50KTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXG5cbiAgICByZXR1cm4gWydndGFnJywgVHJhY2sua2V5LCB1cmlbVHJhY2sua2V5XSwgZXZlbnRdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIFNjcmVlbiBWaWV3IEV2ZW50cyB0byBHb29nbGUgQW5hbHl0aWNzXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGFwcCAgVGhlIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uXG4gICAqIEBwYXJhbSAge3N0cmluZ30gICAgIGtleSAgVGhlIGtleSBvciBldmVudCBvZiB0aGUgZGF0YVxuICAgKi9cbiAgZ3RhZ1ZpZXcoYXBwLCBrZXkpIHtcbiAgICBsZXQgdmlldyA9IHtcbiAgICAgIGFwcF9uYW1lOiBhcHAsXG4gICAgICBzY3JlZW5fbmFtZToga2V5XG4gICAgfTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJylcbiAgICAgIGd0YWcoJ2V2ZW50JywgJ3NjcmVlbl92aWV3Jywgdmlldyk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xuXG4gICAgcmV0dXJuIFsnZ3RhZycsIFRyYWNrLmtleSwgJ3NjcmVlbl92aWV3Jywgdmlld107XG4gIH07XG59XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBzZWxlY3RvciB0byBhZGQgdGhlIHRyYWNraW5nIGZ1bmN0aW9uIHRvICovXG5UcmFjay5zZWxlY3RvciA9ICdbZGF0YS1qcyo9XCJ0cmFja1wiXSc7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBldmVudCB0cmFja2luZyBrZXkgdG8gbWFwIHRvIFdlYnRyZW5kcyBEQ1MudXJpICovXG5UcmFjay5rZXkgPSAnZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBUcmFjazsiXSwibmFtZXMiOlsiVXRpbGl0eSIsInRoaXMiLCJkZWJ1ZyIsImdldFVybFBhcmFtZXRlciIsIlBBUkFNUyIsIkRFQlVHIiwibmFtZSIsInF1ZXJ5U3RyaW5nIiwicXVlcnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInBhcmFtIiwicmVwbGFjZSIsInJlc3VsdHMiLCJSZWdFeHAiLCJleGVjIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYWxpemUiLCJzbHVnIiwidGV4dCIsIm1hdGNoIiwiTE9DQUxJWkVEX1NUUklOR1MiLCJmaWx0ZXIiLCJzIiwiaGFzT3duUHJvcGVydHkiLCJsYWJlbCIsIlNFTEVDVE9SUyIsIlRyYWNrIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsIl90aGlzIiwia2V5IiwiZGF0YXNldCIsInRyYWNrS2V5IiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsInRyYWNrRGF0YSIsImNsaWNrIiwiZCIsIm1hcCIsImVsIiwicGF0aG5hbWUiLCJ3dCIsIndlYnRyZW5kcyIsImdhIiwiZ3RhZyIsImNvbnNvbGUiLCJkaXIiLCJhcHAiLCJndGFnVmlldyIsInB1c2giLCJhc3NpZ24iLCJ3dGQiLCJhcmdzYSIsImZsYXRNYXAiLCJPYmplY3QiLCJrZXlzIiwiZSIsImsiLCJXZWJ0cmVuZHMiLCJtdWx0aVRyYWNrIiwidXJpIiwiZmluZCIsImVsZW1lbnQiLCJ2aWV3Il0sIm1hcHBpbmdzIjoiMFhBTU1BLEVBS0osOEJBQ1NDLE1BUVhELEVBQVFFLE1BQVEsaUJBQXlELE1BQWxERixFQUFRRyxnQkFBZ0JILEVBQVFJLE9BQU9DLFFBUzlETCxFQUFRRyxnQkFBa0IsU0FBQ0csRUFBTUMsT0FDekJDLEVBQVFELEdBQWVFLE9BQU9DLFNBQVNDLE9BQ3ZDQyxFQUFRTixFQUFLTyxRQUFRLE9BQVEsT0FBT0EsUUFBUSxPQUFRLE9BRXBEQyxFQURRLElBQUlDLE9BQU8sU0FBV0gsRUFBUSxhQUN0QkksS0FBS1IsVUFFUixPQUFaTSxFQUFtQixHQUN4QkcsbUJBQW1CSCxFQUFRLEdBQUdELFFBQVEsTUFBTyxPQWFqRGIsRUFBUWtCLFNBQVcsU0FBU0MsT0FDdEJDLEVBQU9ELEdBQVEsR0FFYkUsR0FEVVosT0FBT2EsdUJBQ0RDLE9BQ3BCLFNBQUNDLFlBQU9BLEVBQUVDLGVBQWUsU0FBV0QsRUFBQSxPQUFjTCxJQUFRSyxXQUVwREgsRUFBTSxJQUFNQSxFQUFNLEdBQUdJLGVBQWUsU0FBWUosRUFBTSxHQUFHSyxNQUFRTixHQU8zRXBCLEVBQVFJLGNBQ0MsU0FPVEosRUFBUTJCLHlCQUNTLDRCQ2hFWEMsd0JBQ1FKLDRCQUNKSyxFQUFPQyxTQUFTQyxjQUFjLGlCQUU5QlAsV0FFRFEsb0JBQ1FSLEVBQUVTLFNBQVlULEVBQUVTLFNBQVdMLEVBQU1LLFlBR3pDQyxpQkFBaUIsUUFBUyxTQUFDQyxNQUN6QkEsRUFBTUMsT0FBT0MsUUFBUUMsRUFBS04sVUFBVUMsZUFHckNNLEVBQU1KLEVBQU1DLE9BQU9JLFFBQVFDLFNBQzNCQyxFQUFPQyxLQUFLQyxNQUFNVCxFQUFNQyxPQUFPSSxRQUFRSyxhQUV0Q0MsTUFBTVAsRUFBS0csTUFHWHpDLDZDQVNIc0MsRUFBS0csT0FFSEssRUFBSUwsRUFBS00sSUFBSSxtQkFDWEMsRUFBR3hCLGVBQWVHLEVBQU1XLE9BQzFCVSxFQUFHckIsRUFBTVcsS0FBVTlCLE9BQU9DLFNBQVN3QyxhQUFZRCxFQUFHckIsRUFBTVcsTUFDbkRVLElBR1BFLEVBQUtsRCxLQUFLbUQsVUFBVWIsRUFBS1EsR0FDekJNLEVBQUtwRCxLQUFLcUQsS0FBS2YsRUFBS1EsVUFHcEIvQyxFQUFRRSxTQUNWcUQsUUFBUUMsS0FBSzVCLE9BQVV1QixFQUFJRSxLQUd0Qk4sK0JBU0pVLEVBQUtsQixFQUFLRyxPQUNUUyxFQUFLbEQsS0FBS21ELFVBQVViLEVBQUtHLEdBQ3pCVyxFQUFLcEQsS0FBS3lELFNBQVNELEVBQUtsQixHQUd4QnZDLEVBQVFFLFNBQ1ZxRCxRQUFRQyxLQUFLNUIsT0FBVXVCLEVBQUlFLHVDQVNyQmQsRUFBS0csT0FDVFAsWUFDT0ksSUFHUEcsRUFBSyxJQUFNQSxFQUFLLEdBQUdqQixlQUFlRyxFQUFNVyxPQUNwQ29CLG1CQUNVakIsRUFBSyxHQUFHZCxFQUFNVyxjQUd2QnFCLE9BQU96QixFQUFPTyxPQUluQm1CLEdBQU9DLE1BQU8zQixFQUFNNEIsUUFBUSxtQkFDdkJDLE9BQU9DLEtBQUtDLEdBQUdILFFBQVEsbUJBQU1JLEVBQUdELEVBQUVDLGVBSWxCLG9CQUFkQyxXQUNUQSxVQUFVQyxXQUFXUixJQUdmLFlBQWFBLGdKQVFsQnRCLEVBQUtHLE9BQ0o0QixFQUFNNUIsRUFBSzZCLEtBQUssU0FBQ0MsVUFBWUEsRUFBUS9DLGVBQWVHLEVBQU1XLE9BRTFESixrQkFDZ0JJLFNBSUEsb0JBQVRlLE1BQ1RBLEtBQUsxQixFQUFNVyxJQUFLK0IsRUFBSTFDLEVBQU1XLEtBQU1KLElBRzFCLE9BQVFQLEVBQU1XLElBQUsrQixFQUFJMUMsRUFBTVcsS0FBTUoscUNBUXBDc0IsRUFBS2xCLE9BQ1JrQyxZQUNRaEIsY0FDR2xCLFNBSUssb0JBQVRlLE1BQ1RBLEtBQUssUUFBUyxjQUFlbUIsSUFHdkIsT0FBUTdDLEVBQU1XLElBQUssY0FBZWtDLG1CQUs5QzdDLEVBQU1LLFNBQVcscUJBR2pCTCxFQUFNVyxJQUFNIn0=
