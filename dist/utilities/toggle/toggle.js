var Toggle = (function () {
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

  return Toggle;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL3RvZ2dsZS9Ub2dnbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBTaW1wbGUgVG9nZ2xlIGNsYXNzLiBUaGlzIHdpbGwgdG9nZ2xlIHRoZSBjbGFzcyAnYWN0aXZlJyBhbmQgJ2hpZGRlbidcbiAqIG9uIHRhcmdldCBlbGVtZW50cywgZGV0ZXJtaW5lZCBieSBhIGNsaWNrIGV2ZW50IG9uIGEgc2VsZWN0ZWQgbGluayBvclxuICogZWxlbWVudC4gVGhpcyB3aWxsIGFsc28gdG9nZ2xlIHRoZSBhcmlhLWhpZGRlbiBhdHRyaWJ1dGUgZm9yIHRhcmdldGVkXG4gKiBlbGVtZW50cyB0byBzdXBwb3J0IHNjcmVlbiByZWFkZXJzLiBUYXJnZXQgc2V0dGluZ3MgYW5kIG90aGVyIGZ1bmN0aW9uYWxpdHlcbiAqIGNhbiBiZSBjb250cm9sbGVkIHRocm91Z2ggZGF0YSBhdHRyaWJ1dGVzLlxuICpcbiAqIFRoaXMgdXNlcyB0aGUgLm1hdGNoZXMoKSBtZXRob2Qgd2hpY2ggd2lsbCByZXF1aXJlIGEgcG9seWZpbGwgZm9yIElFXG4gKiBodHRwczovL3BvbHlmaWxsLmlvL3YyL2RvY3MvZmVhdHVyZXMvI0VsZW1lbnRfcHJvdG90eXBlX21hdGNoZXNcbiAqXG4gKiBCYXNpYyBVc2FnZTtcbiAqXG4gKiBqYXZhc2NyaXB0OlxuICogICBuZXcgVG9nZ2xlKCkuaW5pdCgpO1xuICpcbiAqIFRvZ2dsaW5nIEFuY2hvciBsaW5rczpcbiAqICAgPGEgZGF0YS1qcz0ndG9nZ2xlJyBocmVmPScjbWFpbi1tZW51Jz5NZW51PC9hPlxuICogICA8ZGl2IGlkPSdtYWluLW1lbnUnIGFyaWEtaGlkZGVuPSd0cnVlJz4gLi4uIDwvZGl2PlxuICpcbiAqIFRvZ2dsaW5nIGFyaWEtY29udHJvbCBlbGVtZW50czpcbiAqXG4gKiAgIDxidXR0b24gZGF0YS1qcz0ndG9nZ2xlJyBhcmlhLWNvbnRyb2xzPScjbWFpbi1tZW51JyBhcmlhLXByZXNzZWQ9J2ZhbHNlJz5cbiAqICAgICAgTWVudVxuICogICA8L2J1dHRvbj5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+IC4uLiA8L2Rpdj5cbiAqXG4gKiBDcmVhdGUgXCJVbmRvXCIgRXZlbnQgKHRvIGNsb3NlIGEgZGlhbG9ndWUpO1xuICogICA8YSBocmVmPScjbWFpbi1tZW51JyBkYXRhLWpzPSd0b2dnbGUnIGRhdGEtdG9nZ2xlLXVuZG89JyNjbG9zZSc+TWVudTwvYT5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+XG4gKiAgICAgPGEgaWQ9XCJjbG9zZVwiPkNsb3NlPC9hPlxuICogICA8L2Rpdj5cbiAqIEBjbGFzc1xuICovXG5jbGFzcyBUb2dnbGUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAge29iamVjdH0gcyBTZXR0aW5ncyBmb3IgdGhpcyBUb2dnbGUgaW5zdGFuY2VcbiAgICogQHJldHVybiB7b2JqZWN0fSAgIFRoZSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocykge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBzID0gKCFzKSA/IHt9IDogcztcblxuICAgIHRoaXMuX3NldHRpbmdzID0ge1xuICAgICAgc2VsZWN0b3I6IChzLnNlbGVjdG9yKSA/IHMuc2VsZWN0b3IgOiBUb2dnbGUuc2VsZWN0b3IsXG4gICAgICBuYW1lc3BhY2U6IChzLm5hbWVzcGFjZSkgPyBzLm5hbWVzcGFjZSA6IFRvZ2dsZS5uYW1lc3BhY2UsXG4gICAgICBpbmFjdGl2ZUNsYXNzOiAocy5pbmFjdGl2ZUNsYXNzKSA/IHMuaW5hY3RpdmVDbGFzcyA6IFRvZ2dsZS5pbmFjdGl2ZUNsYXNzLFxuICAgICAgYWN0aXZlQ2xhc3M6IChzLmFjdGl2ZUNsYXNzKSA/IHMuYWN0aXZlQ2xhc3MgOiBUb2dnbGUuYWN0aXZlQ2xhc3MsXG4gICAgfTtcblxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXModGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuX3RvZ2dsZShldmVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIGNvbnN0YW50cyB0byB0aGUgZGVidWdnZXJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAgVGhlIG1haW4gY2xpY2sgZXZlbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgVGhlIGNsYXNzXG4gICAqL1xuICBfdG9nZ2xlKGV2ZW50KSB7XG4gICAgbGV0IGVsID0gZXZlbnQudGFyZ2V0O1xuICAgIGxldCB0YXJnZXQgPSBmYWxzZTtcblxuICAgIC8qKiBBbmNob3IgTGlua3MgKi9cbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpIDogdGFyZ2V0O1xuXG4gICAgLyoqIFRvZ2dsZSBDb250cm9scyAqL1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpfWApIDogdGFyZ2V0O1xuXG4gICAgLyoqIE1haW4gRnVuY3Rpb25hbGl0eSAqL1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCk7XG5cbiAgICAvKiogVW5kbyAqL1xuICAgIGlmIChlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF0pIHtcbiAgICAgIGNvbnN0IHVuZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF1cbiAgICAgICk7XG5cbiAgICAgIHVuZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50VG9nZ2xlKGVsLCB0YXJnZXQpO1xuICAgICAgICB1bmRvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiB0b2dnbGluZyBtZXRob2RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbCAgICAgVGhlIGN1cnJlbnQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlXG4gICAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0IFRoZSB0YXJnZXQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlL2hpZGRlblxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICBUaGUgY2xhc3NcbiAgICovXG4gIGVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5hY3RpdmVDbGFzcyAhPT0gJycpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5pbmFjdGl2ZUNsYXNzICE9PSAnJykge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIGVsZW1lbnQgZm9yIGRlZmluZWQgYXJpYSByb2xlcyBhbmQgdG9nZ2xlIHRoZW0gaWYgdGhleSBleGlzdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9nZ2xlLmVsQXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFRvZ2dsZS5lbEFyaWFSb2xlc1tpXSkpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShUb2dnbGUuZWxBcmlhUm9sZXNbaV0sXG4gICAgICAgICAgIShlbC5nZXRBdHRyaWJ1dGUoVG9nZ2xlLmVsQXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIHRhcmdldCBmb3IgZGVmaW5lZCBhcmlhIHJvbGVzIGFuZCB0b2dnbGUgdGhlbSBpZiB0aGV5IGV4aXN0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb2dnbGUudGFyZ2V0QXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSlcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldLFxuICAgICAgICAgICEodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgJiZcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpKVxuICAgIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBzZWxlY3RvciB0byBhZGQgdGhlIHRvZ2dsaW5nIGZ1bmN0aW9uIHRvICovXG5Ub2dnbGUuc2VsZWN0b3IgPSAnW2RhdGEtanMqPVwidG9nZ2xlXCJdJztcblxuLyoqIEB0eXBlIHtTdHJpbmd9IFRoZSBuYW1lc3BhY2UgZm9yIG91ciBkYXRhIGF0dHJpYnV0ZSBzZXR0aW5ncyAqL1xuVG9nZ2xlLm5hbWVzcGFjZSA9ICd0b2dnbGUnO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIGhpZGUgY2xhc3MgKi9cblRvZ2dsZS5pbmFjdGl2ZUNsYXNzID0gJ2hpZGRlbic7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgYWN0aXZlIGNsYXNzICovXG5Ub2dnbGUuYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuLyoqIEB0eXBlIHtBcnJheX0gQXJpYSByb2xlcyB0byB0b2dnbGUgdHJ1ZS9mYWxzZSBvbiB0aGUgdG9nZ2xpbmcgZWxlbWVudCAqL1xuVG9nZ2xlLmVsQXJpYVJvbGVzID0gWydhcmlhLXByZXNzZWQnLCAnYXJpYS1leHBhbmRlZCddO1xuXG4vKiogQHR5cGUge0FycmF5fSBBcmlhIHJvbGVzIHRvIHRvZ2dsZSB0cnVlL2ZhbHNlIG9uIHRoZSB0YXJnZXQgZWxlbWVudCAqL1xuVG9nZ2xlLnRhcmdldEFyaWFSb2xlcyA9IFsnYXJpYS1oaWRkZW4nXTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlOyJdLCJuYW1lcyI6WyJUb2dnbGUiLCJzIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwibmFtZXNwYWNlIiwiaW5hY3RpdmVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsInByZXZlbnREZWZhdWx0IiwiX3RvZ2dsZSIsImVsIiwiZ2V0QXR0cmlidXRlIiwiZWxlbWVudFRvZ2dsZSIsImRhdGFzZXQiLCJ1bmRvIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImkiLCJlbEFyaWFSb2xlcyIsImxlbmd0aCIsInNldEF0dHJpYnV0ZSIsInRhcmdldEFyaWFSb2xlcyIsImNvbnRhaW5zIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUNNQTs7Ozs7Ozs7b0JBTVFDLENBQVosRUFBZTs7Ozs7VUFDUEMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtNQUVBSCxDQUFDLEdBQUksQ0FBQ0EsQ0FBRixHQUFPLEVBQVAsR0FBWUEsQ0FBaEI7V0FFS0ksU0FBTCxHQUFpQjtRQUNmQyxRQUFRLEVBQUdMLENBQUMsQ0FBQ0ssUUFBSCxHQUFlTCxDQUFDLENBQUNLLFFBQWpCLEdBQTRCTixNQUFNLENBQUNNLFFBRDlCO1FBRWZDLFNBQVMsRUFBR04sQ0FBQyxDQUFDTSxTQUFILEdBQWdCTixDQUFDLENBQUNNLFNBQWxCLEdBQThCUCxNQUFNLENBQUNPLFNBRmpDO1FBR2ZDLGFBQWEsRUFBR1AsQ0FBQyxDQUFDTyxhQUFILEdBQW9CUCxDQUFDLENBQUNPLGFBQXRCLEdBQXNDUixNQUFNLENBQUNRLGFBSDdDO1FBSWZDLFdBQVcsRUFBR1IsQ0FBQyxDQUFDUSxXQUFILEdBQWtCUixDQUFDLENBQUNRLFdBQXBCLEdBQWtDVCxNQUFNLENBQUNTO09BSnhEO01BT0FQLElBQUksQ0FBQ1EsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ0MsS0FBRCxFQUFXO1lBQ3BDLENBQUNBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxPQUFiLENBQXFCLEtBQUksQ0FBQ1IsU0FBTCxDQUFlQyxRQUFwQyxDQUFMLElBQ0U7UUFFRkssS0FBSyxDQUFDRyxjQUFOOztRQUVBLEtBQUksQ0FB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
