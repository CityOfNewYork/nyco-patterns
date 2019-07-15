var Toggle = (function () {
  'use strict';

  /**
   * The Simple Toggle class. This will toggle the class 'active' and 'hidden'
   * on target elements, determined by a click event on a selected link or
   * element. This will also toggle the aria-hidden attribute for targeted
   * elements to support screen readers. Target settings and other functionality
   * can be controlled through data attributes.
   *
   * This uses the .matches() method which will require a polyfill for IE
   * https://polyfill.io/v2/docs/features/#Element_prototype_matches
   *
   * Basic Usage;
   *
   * javascript:
   *   new Toggle().init();
   *
   * Toggling Anchor links:
   *   <a data-js='toggle' href='#main-menu'>Menu</a>
   *   <div id='main-menu' aria-hidden='true'> ... </div>
   *
   * Toggling aria-control elements:
   *
   *   <button data-js='toggle' aria-controls='#main-menu' aria-pressed='false'>
   *      Menu
   *   </button>
   *   <div id='main-menu' aria-hidden='true'> ... </div>
   *
   * Create "Undo" Event (to close a dialogue);
   *   <a href='#main-menu' data-js='toggle' data-toggle-undo='#close'>Menu</a>
   *   <div id='main-menu' aria-hidden='true'>
   *     <a id="close">Close</a>
   *   </div>
   * @class
   */

  var Toggle = function Toggle(s) {
    var this$1 = this;
    var body = document.querySelector('body');
    s = !s ? {} : s;
    this._settings = {
      selector: s.selector ? s.selector : Toggle.selector,
      namespace: s.namespace ? s.namespace : Toggle.namespace,
      inactiveClass: s.inactiveClass ? s.inactiveClass : Toggle.inactiveClass,
      activeClass: s.activeClass ? s.activeClass : Toggle.activeClass
    };
    body.addEventListener('click', function (event) {
      if (!event.target.matches(this$1._settings.selector)) {
        return;
      }

      event.preventDefault();

      this$1._toggle(event);
    });
    return this;
  };
  /**
   * Logs constants to the debugger
   * @param{object} eventThe main click event
   * @return {object}      The class
   */


  Toggle.prototype._toggle = function _toggle(event) {
    var this$1 = this;
    var el = event.target;
    var target = false;
    /** Anchor Links */

    target = el.getAttribute('href') ? document.querySelector(el.getAttribute('href')) : target;
    /** Toggle Controls */
    // console.dir(el.getAttribute('aria-controls'));

    target = el.getAttribute('aria-controls') ? document.querySelector("#" + el.getAttribute('aria-controls')) : target;
    /** Main Functionality */

    if (!target) {
      return this;
    }

    this.elementToggle(el, target);
    /** Undo */

    if (el.dataset[this._settings.namespace + "Undo"]) {
      var undo = document.querySelector(el.dataset[this._settings.namespace + "Undo"]);
      undo.addEventListener('click', function (event) {
        event.preventDefault();
        this$1.elementToggle(el, target);
        undo.removeEventListener('click');
      });
    }

    return this;
  };
  /**
   * The main toggling method
   * @param{object} el   The current element to toggle active
   * @param{object} target The target element to toggle active/hidden
   * @return {object}      The class
   */


  Toggle.prototype.elementToggle = function elementToggle(el, target) {
    if (this._settings.activeClass !== '') {
      el.classList.toggle(this._settings.activeClass);
      target.classList.toggle(this._settings.activeClass);
    }

    if (this._settings.inactiveClass !== '') {
      target.classList.toggle(this._settings.inactiveClass);
    } // Check the element for defined aria roles and toggle them if they exist


    for (var i = 0; i < Toggle.elAriaRoles.length; i++) {
      if (el.getAttribute(Toggle.elAriaRoles[i])) {
        el.setAttribute(Toggle.elAriaRoles[i], !(el.getAttribute(Toggle.elAriaRoles[i]) === 'true'));
      }
    } // Check the target for defined aria roles and toggle them if they exist


    for (var i$1 = 0; i$1 < Toggle.targetAriaRoles.length; i$1++) {
      if (target.getAttribute(Toggle.targetAriaRoles[i$1])) {
        target.setAttribute(Toggle.targetAriaRoles[i$1], !(target.getAttribute(Toggle.targetAriaRoles[i$1]) === 'true'));
      }
    }

    if (el.getAttribute('href') && target.classList.contains(this._settings.activeClass)) {
      window.location.hash = '';
      window.location.hash = el.getAttribute('href');
    }

    return this;
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL3RvZ2dsZS9Ub2dnbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBTaW1wbGUgVG9nZ2xlIGNsYXNzLiBUaGlzIHdpbGwgdG9nZ2xlIHRoZSBjbGFzcyAnYWN0aXZlJyBhbmQgJ2hpZGRlbidcbiAqIG9uIHRhcmdldCBlbGVtZW50cywgZGV0ZXJtaW5lZCBieSBhIGNsaWNrIGV2ZW50IG9uIGEgc2VsZWN0ZWQgbGluayBvclxuICogZWxlbWVudC4gVGhpcyB3aWxsIGFsc28gdG9nZ2xlIHRoZSBhcmlhLWhpZGRlbiBhdHRyaWJ1dGUgZm9yIHRhcmdldGVkXG4gKiBlbGVtZW50cyB0byBzdXBwb3J0IHNjcmVlbiByZWFkZXJzLiBUYXJnZXQgc2V0dGluZ3MgYW5kIG90aGVyIGZ1bmN0aW9uYWxpdHlcbiAqIGNhbiBiZSBjb250cm9sbGVkIHRocm91Z2ggZGF0YSBhdHRyaWJ1dGVzLlxuICpcbiAqIFRoaXMgdXNlcyB0aGUgLm1hdGNoZXMoKSBtZXRob2Qgd2hpY2ggd2lsbCByZXF1aXJlIGEgcG9seWZpbGwgZm9yIElFXG4gKiBodHRwczovL3BvbHlmaWxsLmlvL3YyL2RvY3MvZmVhdHVyZXMvI0VsZW1lbnRfcHJvdG90eXBlX21hdGNoZXNcbiAqXG4gKiBCYXNpYyBVc2FnZTtcbiAqXG4gKiBqYXZhc2NyaXB0OlxuICogICBuZXcgVG9nZ2xlKCkuaW5pdCgpO1xuICpcbiAqIFRvZ2dsaW5nIEFuY2hvciBsaW5rczpcbiAqICAgPGEgZGF0YS1qcz0ndG9nZ2xlJyBocmVmPScjbWFpbi1tZW51Jz5NZW51PC9hPlxuICogICA8ZGl2IGlkPSdtYWluLW1lbnUnIGFyaWEtaGlkZGVuPSd0cnVlJz4gLi4uIDwvZGl2PlxuICpcbiAqIFRvZ2dsaW5nIGFyaWEtY29udHJvbCBlbGVtZW50czpcbiAqXG4gKiAgIDxidXR0b24gZGF0YS1qcz0ndG9nZ2xlJyBhcmlhLWNvbnRyb2xzPScjbWFpbi1tZW51JyBhcmlhLXByZXNzZWQ9J2ZhbHNlJz5cbiAqICAgICAgTWVudVxuICogICA8L2J1dHRvbj5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+IC4uLiA8L2Rpdj5cbiAqXG4gKiBDcmVhdGUgXCJVbmRvXCIgRXZlbnQgKHRvIGNsb3NlIGEgZGlhbG9ndWUpO1xuICogICA8YSBocmVmPScjbWFpbi1tZW51JyBkYXRhLWpzPSd0b2dnbGUnIGRhdGEtdG9nZ2xlLXVuZG89JyNjbG9zZSc+TWVudTwvYT5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+XG4gKiAgICAgPGEgaWQ9XCJjbG9zZVwiPkNsb3NlPC9hPlxuICogICA8L2Rpdj5cbiAqIEBjbGFzc1xuICovXG5jbGFzcyBUb2dnbGUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAge29iamVjdH0gcyBTZXR0aW5ncyBmb3IgdGhpcyBUb2dnbGUgaW5zdGFuY2VcbiAgICogQHJldHVybiB7b2JqZWN0fSAgIFRoZSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocykge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBzID0gKCFzKSA/IHt9IDogcztcblxuICAgIHRoaXMuX3NldHRpbmdzID0ge1xuICAgICAgc2VsZWN0b3I6IChzLnNlbGVjdG9yKSA/IHMuc2VsZWN0b3IgOiBUb2dnbGUuc2VsZWN0b3IsXG4gICAgICBuYW1lc3BhY2U6IChzLm5hbWVzcGFjZSkgPyBzLm5hbWVzcGFjZSA6IFRvZ2dsZS5uYW1lc3BhY2UsXG4gICAgICBpbmFjdGl2ZUNsYXNzOiAocy5pbmFjdGl2ZUNsYXNzKSA/IHMuaW5hY3RpdmVDbGFzcyA6IFRvZ2dsZS5pbmFjdGl2ZUNsYXNzLFxuICAgICAgYWN0aXZlQ2xhc3M6IChzLmFjdGl2ZUNsYXNzKSA/IHMuYWN0aXZlQ2xhc3MgOiBUb2dnbGUuYWN0aXZlQ2xhc3MsXG4gICAgfTtcblxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXModGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuX3RvZ2dsZShldmVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIGNvbnN0YW50cyB0byB0aGUgZGVidWdnZXJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAgVGhlIG1haW4gY2xpY2sgZXZlbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgVGhlIGNsYXNzXG4gICAqL1xuICBfdG9nZ2xlKGV2ZW50KSB7XG4gICAgbGV0IGVsID0gZXZlbnQudGFyZ2V0O1xuICAgIGxldCB0YXJnZXQgPSBmYWxzZTtcblxuICAgIC8qKiBBbmNob3IgTGlua3MgKi9cbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpIDogdGFyZ2V0O1xuXG4gICAgLyoqIFRvZ2dsZSBDb250cm9scyAqL1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpfWApIDogdGFyZ2V0O1xuXG4gICAgLyoqIE1haW4gRnVuY3Rpb25hbGl0eSAqL1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCk7XG5cbiAgICAvKiogVW5kbyAqL1xuICAgIGlmIChlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF0pIHtcbiAgICAgIGNvbnN0IHVuZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF1cbiAgICAgICk7XG5cbiAgICAgIHVuZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50VG9nZ2xlKGVsLCB0YXJnZXQpO1xuICAgICAgICB1bmRvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiB0b2dnbGluZyBtZXRob2RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbCAgICAgVGhlIGN1cnJlbnQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlXG4gICAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0IFRoZSB0YXJnZXQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlL2hpZGRlblxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICBUaGUgY2xhc3NcbiAgICovXG4gIGVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5hY3RpdmVDbGFzcyAhPT0gJycpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5pbmFjdGl2ZUNsYXNzICE9PSAnJykge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIGVsZW1lbnQgZm9yIGRlZmluZWQgYXJpYSByb2xlcyBhbmQgdG9nZ2xlIHRoZW0gaWYgdGhleSBleGlzdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9nZ2xlLmVsQXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFRvZ2dsZS5lbEFyaWFSb2xlc1tpXSkpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShUb2dnbGUuZWxBcmlhUm9sZXNbaV0sXG4gICAgICAgICAgIShlbC5nZXRBdHRyaWJ1dGUoVG9nZ2xlLmVsQXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIHRhcmdldCBmb3IgZGVmaW5lZCBhcmlhIHJvbGVzIGFuZCB0b2dnbGUgdGhlbSBpZiB0aGV5IGV4aXN0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb2dnbGUudGFyZ2V0QXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSlcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldLFxuICAgICAgICAgICEodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgJiZcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpKVxuICAgIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBzZWxlY3RvciB0byBhZGQgdGhlIHRvZ2dsaW5nIGZ1bmN0aW9uIHRvICovXG5Ub2dnbGUuc2VsZWN0b3IgPSAnW2RhdGEtanMqPVwidG9nZ2xlXCJdJztcblxuLyoqIEB0eXBlIHtTdHJpbmd9IFRoZSBuYW1lc3BhY2UgZm9yIG91ciBkYXRhIGF0dHJpYnV0ZSBzZXR0aW5ncyAqL1xuVG9nZ2xlLm5hbWVzcGFjZSA9ICd0b2dnbGUnO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIGhpZGUgY2xhc3MgKi9cblRvZ2dsZS5pbmFjdGl2ZUNsYXNzID0gJ2hpZGRlbic7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgYWN0aXZlIGNsYXNzICovXG5Ub2dnbGUuYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuLyoqIEB0eXBlIHtBcnJheX0gQXJpYSByb2xlcyB0byB0b2dnbGUgdHJ1ZS9mYWxzZSBvbiB0aGUgdG9nZ2xpbmcgZWxlbWVudCAqL1xuVG9nZ2xlLmVsQXJpYVJvbGVzID0gWydhcmlhLXByZXNzZWQnLCAnYXJpYS1leHBhbmRlZCddO1xuXG4vKiogQHR5cGUge0FycmF5fSBBcmlhIHJvbGVzIHRvIHRvZ2dsZSB0cnVlL2ZhbHNlIG9uIHRoZSB0YXJnZXQgZWxlbWVudCAqL1xuVG9nZ2xlLnRhcmdldEFyaWFSb2xlcyA9IFsnYXJpYS1oaWRkZW4nXTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlOyJdLCJuYW1lcyI6WyJUb2dnbGUiLCJzIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwibmFtZXNwYWNlIiwiaW5hY3RpdmVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsInRoaXMiLCJwcmV2ZW50RGVmYXVsdCIsIl90b2dnbGUiLCJsZXQiLCJlbCIsImdldEF0dHJpYnV0ZSIsImVsZW1lbnRUb2dnbGUiLCJkYXRhc2V0IiwiY29uc3QiLCJ1bmRvIiwidGhpcyQxIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImkiLCJlbEFyaWFSb2xlcyIsImxlbmd0aCIsInNldEF0dHJpYnV0ZSIsInRhcmdldEFyaWFSb2xlcyIsImNvbnRhaW5zIiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUNBLElBQU1BLE1BQU0sR0FNVixlQUFBLENBQVlDLENBQVosRUFBZTs7RUFDZixNQUFRQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixDQUFmO0VBRUFILEVBQUFBLENBQUcsR0FBSSxDQUFDQSxDQUFGLEdBQU8sRUFBUCxHQUFZQSxDQUFsQjtFQUVBLE9BQU9JLFNBQVAsR0FBbUI7RUFDZkMsSUFBQUEsUUFBUSxFQUFHTCxDQUFDLENBQUNLLFFBQUgsR0FBZUwsQ0FBQyxDQUFDSyxRQUFqQixHQUE0Qk4sTUFBTSxDQUFDTSxRQUQ5QjtFQUVmQyxJQUFBQSxTQUFTLEVBQUdOLENBQUMsQ0FBQ00sU0FBSCxHQUFnQk4sQ0FBQyxDQUFDTSxTQUFsQixHQUE4QlAsTUFBTSxDQUFDTyxTQUZqQztFQUdmQyxJQUFBQSxhQUFhLEVBQUdQLENBQUMsQ0FBQ08sYUFBSCxHQUFvQlAsQ0FBQyxDQUFDTyxhQUF0QixHQUFzQ1IsTUFBTSxDQUFDUSxhQUg3QztFQUlmQyxJQUFBQSxXQUFXLEVBQUdSLENBQUMsQ0FBQ1EsV0FBSCxHQUFrQlIsQ0FBQyxDQUFDUSxXQUFwQixHQUFrQ1QsTUFBTSxDQUFDUztFQUp2QyxHQUFuQjtFQU9BUCxFQUFBQSxJQUFNLENBQUNRLGdCQUFQLENBQXdCLE9BQXhCLFlBQWtDQyxPQUFPO0VBQ3JDLFFBQUksQ0FBQ0EsS0FBSyxDQUFD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
