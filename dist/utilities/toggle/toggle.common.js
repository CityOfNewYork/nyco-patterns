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

var Toggle =
/*#__PURE__*/
function () {
  /**
   * @constructor
   * @param  {object} s Settings for this Toggle instance
   * @return {object}   The class
   */
  function Toggle(s) {
    var _this = this;

    _classCallCheck(this, Toggle);

    var body = document.querySelector('body');
    s = !s ? {} : s;
    this._settings = {
      selector: s.selector ? s.selector : Toggle.selector,
      namespace: s.namespace ? s.namespace : Toggle.namespace,
      inactiveClass: s.inactiveClass ? s.inactiveClass : Toggle.inactiveClass,
      activeClass: s.activeClass ? s.activeClass : Toggle.activeClass
    };
    body.addEventListener('click', function (event) {
      if (!event.target.matches(_this._settings.selector)) { return; }
      event.preventDefault();

      _this._toggle(event);
    });
    return this;
  }
  /**
   * Logs constants to the debugger
   * @param  {object} event  The main click event
   * @return {object}        The class
   */


  _createClass(Toggle, [{
    key: "_toggle",
    value: function _toggle(event) {
      var _this2 = this;

      var el = event.target;
      var target = false;
      /** Anchor Links */

      target = el.getAttribute('href') ? document.querySelector(el.getAttribute('href')) : target;
      /** Toggle Controls */
      // console.dir(el.getAttribute('aria-controls'));

      target = el.getAttribute('aria-controls') ? document.querySelector("#".concat(el.getAttribute('aria-controls'))) : target;
      /** Main Functionality */

      if (!target) { return this; }
      this.elementToggle(el, target);
      /** Undo */

      if (el.dataset["".concat(this._settings.namespace, "Undo")]) {
        var undo = document.querySelector(el.dataset["".concat(this._settings.namespace, "Undo")]);
        undo.addEventListener('click', function (event) {
          event.preventDefault();

          _this2.elementToggle(el, target);

          undo.removeEventListener('click');
        });
      }

      return this;
    }
    /**
     * The main toggling method
     * @param  {object} el     The current element to toggle active
     * @param  {object} target The target element to toggle active/hidden
     * @return {object}        The class
     */

  }, {
    key: "elementToggle",
    value: function elementToggle(el, target) {
      if (this._settings.activeClass !== '') {
        el.classList.toggle(this._settings.activeClass);
        target.classList.toggle(this._settings.activeClass);
      }

      if (this._settings.inactiveClass !== '') {
        target.classList.toggle(this._settings.inactiveClass);
      } // Check the element for defined aria roles and toggle them if they exist


      for (var i = 0; i < Toggle.elAriaRoles.length; i++) {
        if (el.getAttribute(Toggle.elAriaRoles[i])) { el.setAttribute(Toggle.elAriaRoles[i], !(el.getAttribute(Toggle.elAriaRoles[i]) === 'true')); }
      } // Check the target for defined aria roles and toggle them if they exist


      for (var _i = 0; _i < Toggle.targetAriaRoles.length; _i++) {
        if (target.getAttribute(Toggle.targetAriaRoles[_i])) { target.setAttribute(Toggle.targetAriaRoles[_i], !(target.getAttribute(Toggle.targetAriaRoles[_i]) === 'true')); }
      }

      if (el.getAttribute('href') && target.classList.contains(this._settings.activeClass)) {
        window.location.hash = '';
        window.location.hash = el.getAttribute('href');
      }

      return this;
    }
  }]);

  return Toggle;
}();
/** @type {String} The main selector to add the toggling function to */


Toggle.selector = '[data-js*="toggle"]';
/** @type {String} The namespace for our data attribute settings */

Toggle.namespace = 'toggle';
/** @type {String} The hide class */

Toggle.inactiveClass = 'hidden';
/** @type {String} The active class */

Toggle.activeClass = 'active';
/** @type {Array} Aria roles to toggle true/false on the toggling element */

Toggle.elAriaRoles = ['aria-pressed', 'aria-expanded'];
/** @type {Array} Aria roles to toggle true/false on the target element */

Toggle.targetAriaRoles = ['aria-hidden'];

module.exports = Toggle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlLmNvbW1vbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxpdGllcy90b2dnbGUvVG9nZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaGUgU2ltcGxlIFRvZ2dsZSBjbGFzcy4gVGhpcyB3aWxsIHRvZ2dsZSB0aGUgY2xhc3MgJ2FjdGl2ZScgYW5kICdoaWRkZW4nXG4gKiBvbiB0YXJnZXQgZWxlbWVudHMsIGRldGVybWluZWQgYnkgYSBjbGljayBldmVudCBvbiBhIHNlbGVjdGVkIGxpbmsgb3JcbiAqIGVsZW1lbnQuIFRoaXMgd2lsbCBhbHNvIHRvZ2dsZSB0aGUgYXJpYS1oaWRkZW4gYXR0cmlidXRlIGZvciB0YXJnZXRlZFxuICogZWxlbWVudHMgdG8gc3VwcG9ydCBzY3JlZW4gcmVhZGVycy4gVGFyZ2V0IHNldHRpbmdzIGFuZCBvdGhlciBmdW5jdGlvbmFsaXR5XG4gKiBjYW4gYmUgY29udHJvbGxlZCB0aHJvdWdoIGRhdGEgYXR0cmlidXRlcy5cbiAqXG4gKiBUaGlzIHVzZXMgdGhlIC5tYXRjaGVzKCkgbWV0aG9kIHdoaWNoIHdpbGwgcmVxdWlyZSBhIHBvbHlmaWxsIGZvciBJRVxuICogaHR0cHM6Ly9wb2x5ZmlsbC5pby92Mi9kb2NzL2ZlYXR1cmVzLyNFbGVtZW50X3Byb3RvdHlwZV9tYXRjaGVzXG4gKlxuICogQmFzaWMgVXNhZ2U7XG4gKlxuICogamF2YXNjcmlwdDpcbiAqICAgbmV3IFRvZ2dsZSgpLmluaXQoKTtcbiAqXG4gKiBUb2dnbGluZyBBbmNob3IgbGlua3M6XG4gKiAgIDxhIGRhdGEtanM9J3RvZ2dsZScgaHJlZj0nI21haW4tbWVudSc+TWVudTwvYT5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+IC4uLiA8L2Rpdj5cbiAqXG4gKiBUb2dnbGluZyBhcmlhLWNvbnRyb2wgZWxlbWVudHM6XG4gKlxuICogICA8YnV0dG9uIGRhdGEtanM9J3RvZ2dsZScgYXJpYS1jb250cm9scz0nI21haW4tbWVudScgYXJpYS1wcmVzc2VkPSdmYWxzZSc+XG4gKiAgICAgIE1lbnVcbiAqICAgPC9idXR0b24+XG4gKiAgIDxkaXYgaWQ9J21haW4tbWVudScgYXJpYS1oaWRkZW49J3RydWUnPiAuLi4gPC9kaXY+XG4gKlxuICogQ3JlYXRlIFwiVW5kb1wiIEV2ZW50ICh0byBjbG9zZSBhIGRpYWxvZ3VlKTtcbiAqICAgPGEgaHJlZj0nI21haW4tbWVudScgZGF0YS1qcz0ndG9nZ2xlJyBkYXRhLXRvZ2dsZS11bmRvPScjY2xvc2UnPk1lbnU8L2E+XG4gKiAgIDxkaXYgaWQ9J21haW4tbWVudScgYXJpYS1oaWRkZW49J3RydWUnPlxuICogICAgIDxhIGlkPVwiY2xvc2VcIj5DbG9zZTwvYT5cbiAqICAgPC9kaXY+XG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgVG9nZ2xlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHMgU2V0dGluZ3MgZm9yIHRoaXMgVG9nZ2xlIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge29iamVjdH0gICBUaGUgY2xhc3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHMpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgcyA9ICghcykgPyB7fSA6IHM7XG5cbiAgICB0aGlzLl9zZXR0aW5ncyA9IHtcbiAgICAgIHNlbGVjdG9yOiAocy5zZWxlY3RvcikgPyBzLnNlbGVjdG9yIDogVG9nZ2xlLnNlbGVjdG9yLFxuICAgICAgbmFtZXNwYWNlOiAocy5uYW1lc3BhY2UpID8gcy5uYW1lc3BhY2UgOiBUb2dnbGUubmFtZXNwYWNlLFxuICAgICAgaW5hY3RpdmVDbGFzczogKHMuaW5hY3RpdmVDbGFzcykgPyBzLmluYWN0aXZlQ2xhc3MgOiBUb2dnbGUuaW5hY3RpdmVDbGFzcyxcbiAgICAgIGFjdGl2ZUNsYXNzOiAocy5hY3RpdmVDbGFzcykgPyBzLmFjdGl2ZUNsYXNzIDogVG9nZ2xlLmFjdGl2ZUNsYXNzLFxuICAgIH07XG5cbiAgICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKHRoaXMuX3NldHRpbmdzLnNlbGVjdG9yKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0aGlzLl90b2dnbGUoZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTG9ncyBjb25zdGFudHMgdG8gdGhlIGRlYnVnZ2VyXG4gICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgIFRoZSBtYWluIGNsaWNrIGV2ZW50XG4gICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgIFRoZSBjbGFzc1xuICAgKi9cbiAgX3RvZ2dsZShldmVudCkge1xuICAgIGxldCBlbCA9IGV2ZW50LnRhcmdldDtcbiAgICBsZXQgdGFyZ2V0ID0gZmFsc2U7XG5cbiAgICAvKiogQW5jaG9yIExpbmtzICovXG4gICAgdGFyZ2V0ID0gKGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpKSA6IHRhcmdldDtcblxuICAgIC8qKiBUb2dnbGUgQ29udHJvbHMgKi9cbiAgICAvLyBjb25zb2xlLmRpcihlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSk7XG4gICAgdGFyZ2V0ID0gKGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKSA/XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKX1gKSA6IHRhcmdldDtcblxuICAgIC8qKiBNYWluIEZ1bmN0aW9uYWxpdHkgKi9cbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5lbGVtZW50VG9nZ2xlKGVsLCB0YXJnZXQpO1xuXG4gICAgLyoqIFVuZG8gKi9cbiAgICBpZiAoZWwuZGF0YXNldFtgJHt0aGlzLl9zZXR0aW5ncy5uYW1lc3BhY2V9VW5kb2BdKSB7XG4gICAgICBjb25zdCB1bmRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgZWwuZGF0YXNldFtgJHt0aGlzLl9zZXR0aW5ncy5uYW1lc3BhY2V9VW5kb2BdXG4gICAgICApO1xuXG4gICAgICB1bmRvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZWxlbWVudFRvZ2dsZShlbCwgdGFyZ2V0KTtcbiAgICAgICAgdW5kby5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1haW4gdG9nZ2xpbmcgbWV0aG9kXG4gICAqIEBwYXJhbSAge29iamVjdH0gZWwgICAgIFRoZSBjdXJyZW50IGVsZW1lbnQgdG8gdG9nZ2xlIGFjdGl2ZVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldCBUaGUgdGFyZ2V0IGVsZW1lbnQgdG8gdG9nZ2xlIGFjdGl2ZS9oaWRkZW5cbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgVGhlIGNsYXNzXG4gICAqL1xuICBlbGVtZW50VG9nZ2xlKGVsLCB0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MgIT09ICcnKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuX3NldHRpbmdzLmFjdGl2ZUNsYXNzKTtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuX3NldHRpbmdzLmFjdGl2ZUNsYXNzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVDbGFzcyAhPT0gJycpIHtcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuX3NldHRpbmdzLmluYWN0aXZlQ2xhc3MpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoZSBlbGVtZW50IGZvciBkZWZpbmVkIGFyaWEgcm9sZXMgYW5kIHRvZ2dsZSB0aGVtIGlmIHRoZXkgZXhpc3RcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRvZ2dsZS5lbEFyaWFSb2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZShUb2dnbGUuZWxBcmlhUm9sZXNbaV0pKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoVG9nZ2xlLmVsQXJpYVJvbGVzW2ldLFxuICAgICAgICAgICEoZWwuZ2V0QXR0cmlidXRlKFRvZ2dsZS5lbEFyaWFSb2xlc1tpXSkgPT09ICd0cnVlJykpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIHRoZSB0YXJnZXQgZm9yIGRlZmluZWQgYXJpYSByb2xlcyBhbmQgdG9nZ2xlIHRoZW0gaWYgdGhleSBleGlzdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9nZ2xlLnRhcmdldEFyaWFSb2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoVG9nZ2xlLnRhcmdldEFyaWFSb2xlc1tpXSkpXG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoVG9nZ2xlLnRhcmdldEFyaWFSb2xlc1tpXSxcbiAgICAgICAgICAhKHRhcmdldC5nZXRBdHRyaWJ1dGUoVG9nZ2xlLnRhcmdldEFyaWFSb2xlc1tpXSkgPT09ICd0cnVlJykpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpICYmXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuX3NldHRpbmdzLmFjdGl2ZUNsYXNzKSlcbiAgICB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIG1haW4gc2VsZWN0b3IgdG8gYWRkIHRoZSB0b2dnbGluZyBmdW5jdGlvbiB0byAqL1xuVG9nZ2xlLnNlbGVjdG9yID0gJ1tkYXRhLWpzKj1cInRvZ2dsZVwiXSc7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbmFtZXNwYWNlIGZvciBvdXIgZGF0YSBhdHRyaWJ1dGUgc2V0dGluZ3MgKi9cblRvZ2dsZS5uYW1lc3BhY2UgPSAndG9nZ2xlJztcblxuLyoqIEB0eXBlIHtTdHJpbmd9IFRoZSBoaWRlIGNsYXNzICovXG5Ub2dnbGUuaW5hY3RpdmVDbGFzcyA9ICdoaWRkZW4nO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIGFjdGl2ZSBjbGFzcyAqL1xuVG9nZ2xlLmFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XG5cbi8qKiBAdHlwZSB7QXJyYXl9IEFyaWEgcm9sZXMgdG8gdG9nZ2xlIHRydWUvZmFsc2Ugb24gdGhlIHRvZ2dsaW5nIGVsZW1lbnQgKi9cblRvZ2dsZS5lbEFyaWFSb2xlcyA9IFsnYXJpYS1wcmVzc2VkJywgJ2FyaWEtZXhwYW5kZWQnXTtcblxuLyoqIEB0eXBlIHtBcnJheX0gQXJpYSByb2xlcyB0byB0b2dnbGUgdHJ1ZS9mYWxzZSBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQgKi9cblRvZ2dsZS50YXJnZXRBcmlhUm9sZXMgPSBbJ2FyaWEtaGlkZGVuJ107XG5cbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTsiXSwibmFtZXMiOlsiVG9nZ2xlIiwicyIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfc2V0dGluZ3MiLCJzZWxlY3RvciIsIm5hbWVzcGFjZSIsImluYWN0aXZlQ2xhc3MiLCJhY3RpdmVDbGFzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsIm1hdGNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsIl90b2dnbGUiLCJlbCIsImdldEF0dHJpYnV0ZSIsImVsZW1lbnRUb2dnbGUiLCJkYXRhc2V0IiwidW5kbyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJpIiwiZWxBcmlhUm9sZXMiLCJsZW5ndGgiLCJzZXRBdHRyaWJ1dGUiLCJ0YXJnZXRBcmlhUm9sZXMiLCJjb250YWlucyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaGFzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUNNQTs7Ozs7Ozs7a0JBTVFDLENBQVosRUFBZTs7Ozs7UUFDUEMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtJQUVBSCxDQUFDLEdBQUksQ0FBQ0EsQ0FBRixHQUFPLEVBQVAsR0FBWUEsQ0FBaEI7U0FFS0ksU0FBTCxHQUFpQjtNQUNmQyxRQUFRLEVBQUdMLENBQUMsQ0FBQ0ssUUFBSCxHQUFlTCxDQUFDLENBQUNLLFFBQWpCLEdBQTRCTixNQUFNLENBQUNNLFFBRDlCO01BRWZDLFNBQVMsRUFBR04sQ0FBQyxDQUFDTSxTQUFILEdBQWdCTixDQUFDLENBQUNNLFNBQWxCLEdBQThCUCxNQUFNLENBQUNPLFNBRmpDO01BR2ZDLGFBQWEsRUFBR1AsQ0FBQyxDQUFDTyxhQUFILEdBQW9CUCxDQUFDLENBQUNPLGFBQXRCLEdBQXNDUixNQUFNLENBQUNRLGFBSDdDO01BSWZDLFdBQVcsRUFBR1IsQ0FBQyxDQUFDUSxXQUFILEdBQWtCUixDQUFDLENBQUNRLFdBQXBCLEdBQWtDVCxNQUFNLENBQUNTO0tBSnhEO0lBT0FQLElBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ0MsS0FBRCxFQUFXO1VBQ3BDLENBQUNBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxPQUFiLENBQXFCLEtBQUksQ0FBQ1IsU0FBTCxDQUFlQyxRQUFwQyxDQUFMLElBQ0U7TUFFRkssS0FBSyxDQUFDRyxjQUFOOztNQUVBLEtBQUksQ0FBQ0MsT0FBTCxDQUFhSixLQUFiO0tBTkY7V0FTTyxJQUFQOzs7Ozs7Ozs7Ozs0QkFRTUEsT0FBTzs7O1VBQ1RLLEVBQUUsR0FBR0wsS0FBSyxDQUFDQyxNQUFmO1VBQ0lBLE1BQU0sR0FBRyxLQUFiOzs7TUFHQUEsTUFBTSxHQUFJSSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0IsTUFBaEIsQ0FBRCxHQUNQZCxRQUFRLENBQUNDLGFBQVQsQ0FBdUJZLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQixNQUFoQixDQUF2QixDQURPLEdBQzJDTCxNQURwRDs7OztNQUtBQSxNQUFNLEdBQUlJLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQixlQUFoQixDQUFELEdBQ1BkLFFBQVEsQ0FBQ0MsYUFBVCxZQUEyQlksRUFBRSxDQUFDQyxZQUFILENBQWdCLGVBQWhCLENBQTNCLEVBRE8sR0FDMERMLE1BRG5FOzs7VUFJSSxDQUFDQSxNQUFMLElBQWEsT0FBTyxJQUFQO1dBQ1JNLGFBQUwsQ0FBbUJGLEVBQW5CLEVBQXVCSixNQUF2Qjs7O1VBR0lJLEVBQUUsQ0FBQ0csT0FBSCxXQUFjLEtBQUtkLFNBQUwsQ0FBZUUsU0FBN0IsVUFBSixFQUFtRDtZQUMzQ2EsSUFBSSxHQUFHakIsUUFBUSxDQUFDQyxhQUFULENBQ1hZLEVBQUUsQ0FBQ0csT0FBSCxXQUFjLEtBQUtkLFNBQUwsQ0FBZUUsU0FBN0IsVUFEVyxDQUFiO1FBSUFhLElBQUksQ0FBQ1YsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ0MsS0FBRCxFQUFXO1VBQ3hDQSxLQUFLLENBQUNHLGNBQU47O1VBQ0EsTUFBSSxDQUFDSSxhQUFMLENBQW1CRixFQUFuQixFQUF1QkosTUFBdkI7O1VBQ0FRLElBQUksQ0FBQ0MsbUJBQUwsQ0FBeUIsT0FBekI7U0FIRjs7O2FBT0ssSUFBUDs7Ozs7Ozs7Ozs7a0NBU1lMLElBQUlKLFFBQVE7VUFDcEIsS0FBS1AsU0FBTCxDQUFlSSxXQUFmLEtBQStCLEVBQW5DLEVBQXVDO1FBQ3JDTyxFQUFFLENBQUNNLFNBQUgsQ0FBYUMsTUFBYixDQUFvQixLQUFLbEIsU0FBTCxDQUFlSSxXQUFuQztRQUNBRyxNQUFNLENBQUNVLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCLEtBQUtsQixTQUFMLENBQWVJLFdBQXZDOzs7VUFHRSxLQUFLSixTQUFMLENBQWVHLGFBQWYsS0FBaUMsRUFBckMsRUFBeUM7UUFDdkNJLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQkMsTUFBakIsQ0FBd0IsS0FBS2xCLFNBQUwsQ0FBZUcsYUFBdkM7T0FQc0I7OztXQVduQixJQUFJZ0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3hCLE1BQU0sQ0FBQ3lCLFdBQVAsQ0FBbUJDLE1BQXZDLEVBQStDRixDQUFDLEVBQWhELEVBQW9EO1lBQzlDUixFQUFFLENBQUNDLFlBQUgsQ0FBZ0JqQixNQUFNLENBQUN5QixXQUFQLENBQW1CRCxDQUFuQixDQUFoQixDQUFKLElBQ0VSLEVBQUUsQ0FBQ1csWUFBSCxDQUFnQjNCLE1BQU0sQ0FBQ3lCLFdBQVAsQ0FBbUJELENBQW5CLENBQWhCLEVBQ0UsRUFBRVIsRUFBRSxDQUFDQyxZQUFILENBQWdCakIsTUFBTSxDQUFDeUIsV0FBUCxDQUFtQkQsQ0FBbkIsQ0FBaEIsTUFBMkMsTUFBN0MsQ0FERjtPQWJvQjs7O1dBa0JuQixJQUFJQSxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHeEIsTUFBTSxDQUFDNEIsZUFBUCxDQUF1QkYsTUFBM0MsRUFBbURGLEVBQUMsRUFBcEQsRUFBd0Q7WUFDbERaLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQmpCLE1BQU0sQ0FBQzRCLGVBQVAsQ0FBdUJKLEVBQXZCLENBQXBCLENBQUosSUFDRVosTUFBTSxDQUFDZSxZQUFQLENBQW9CM0IsTUFBTSxDQUFDNEIsZUFBUCxDQUF1QkosRUFBdkIsQ0FBcEIsRUFDRSxFQUFFWixNQUFNLENBQUNLLFlBQVAsQ0FBb0JqQixNQUFNLENBQUM0QixlQUFQLENBQXVCSixFQUF2QixDQUFwQixNQUFtRCxNQUFyRCxDQURGOzs7VUFLRlIsRUFBRSxDQUFDQyxZQUFILENBQWdCLE1BQWhCLEtBQ0FMLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQk8sUUFBakIsQ0FBMEIsS0FBS3hCLFNBQUwsQ0FBZUksV0FBekMsQ0FGRixFQUdBO1FBQ0VxQixNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLEVBQXZCO1FBQ0FGLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUJoQixFQUFFLENBQUNDLFlBQUgsQ0FBZ0IsTUFBaEIsQ0FBdkI7OzthQUdLLElBQVA7Ozs7Ozs7OztBQUtKakIsTUFBTSxDQUFDTSxRQUFQLEdBQWtCLHFCQUFsQjs7O0FBR0FOLE1BQU0sQ0FBQ08sU0FBUCxHQUFtQixRQUFuQjs7O0FBR0FQLE1BQU0sQ0FBQ1EsYUFBUCxHQUF1QixRQUF2Qjs7O0FBR0FSLE1BQU0sQ0FBQ1MsV0FBUCxHQUFxQixRQUFyQjs7O0FBR0FULE1BQU0sQ0FBQ3lCLFdBQVAsR0FBcUIsQ0FBQyxjQUFELEVBQWlCLGVBQWpCLENBQXJCOzs7QUFHQXpCLE1BQU0sQ0FBQzRCLGVBQVAsR0FBeUIsQ0FBQyxhQUFELENBQXpCOzs7OyJ9
