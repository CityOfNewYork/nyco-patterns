var Toggle=function(){"use strict";var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,s,a){return s&&e(t.prototype,s),a&&e(t,a),t}}(),s=function(){function s(t){var a=this;e(this,s);var i=document.querySelector("body");return t=t||{},this._settings={selector:t.selector?t.selector:s.selector,namespace:t.namespace?t.namespace:s.namespace,inactiveClass:t.inactiveClass?t.inactiveClass:s.inactiveClass,activeClass:t.activeClass?t.activeClass:s.activeClass},i.addEventListener("click",function(e){e.target.matches(a._settings.selector)&&(e.preventDefault(),a._toggle(e))}),this}return t(s,[{key:"_toggle",value:function(e){var t=this,s=e.target,a=!1;if(a=s.getAttribute("href")?document.querySelector(s.getAttribute("href")):a,!(a=s.getAttribute("aria-controls")?document.querySelector("#"+s.getAttribute("aria-controls")):a))return this;if(this.elementToggle(s,a),s.dataset[this._settings.namespace+"Undo"]){var i=document.querySelector(s.dataset[this._settings.namespace+"Undo"]);i.addEventListener("click",function(e){e.preventDefault(),t.elementToggle(s,a),i.removeEventListener("click")})}return this}},{key:"elementToggle",value:function(e,t){""!==this._settings.activeClass&&(e.classList.toggle(this._settings.activeClass),t.classList.toggle(this._settings.activeClass)),""!==this._settings.inactiveClass&&t.classList.toggle(this._settings.inactiveClass);for(var a=0;a<s.elAriaRoles.length;a++)e.getAttribute(s.elAriaRoles[a])&&e.setAttribute(s.elAriaRoles[a],!("true"===e.getAttribute(s.elAriaRoles[a])));for(var i=0;i<s.targetAriaRoles.length;i++)t.getAttribute(s.targetAriaRoles[i])&&t.setAttribute(s.targetAriaRoles[i],!("true"===t.getAttribute(s.targetAriaRoles[i])));return e.getAttribute("href")&&t.classList.contains(this._settings.activeClass)&&(window.location.hash="",window.location.hash=e.getAttribute("href")),this}}]),s}();return s.selector='[data-js*="toggle"]',s.namespace="toggle",s.inactiveClass="hidden",s.activeClass="active",s.elAriaRoles=["aria-pressed","aria-expanded"],s.targetAriaRoles=["aria-hidden"],s}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbGl0aWVzL3RvZ2dsZS9Ub2dnbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoZSBTaW1wbGUgVG9nZ2xlIGNsYXNzLiBUaGlzIHdpbGwgdG9nZ2xlIHRoZSBjbGFzcyAnYWN0aXZlJyBhbmQgJ2hpZGRlbidcbiAqIG9uIHRhcmdldCBlbGVtZW50cywgZGV0ZXJtaW5lZCBieSBhIGNsaWNrIGV2ZW50IG9uIGEgc2VsZWN0ZWQgbGluayBvclxuICogZWxlbWVudC4gVGhpcyB3aWxsIGFsc28gdG9nZ2xlIHRoZSBhcmlhLWhpZGRlbiBhdHRyaWJ1dGUgZm9yIHRhcmdldGVkXG4gKiBlbGVtZW50cyB0byBzdXBwb3J0IHNjcmVlbiByZWFkZXJzLiBUYXJnZXQgc2V0dGluZ3MgYW5kIG90aGVyIGZ1bmN0aW9uYWxpdHlcbiAqIGNhbiBiZSBjb250cm9sbGVkIHRocm91Z2ggZGF0YSBhdHRyaWJ1dGVzLlxuICpcbiAqIFRoaXMgdXNlcyB0aGUgLm1hdGNoZXMoKSBtZXRob2Qgd2hpY2ggd2lsbCByZXF1aXJlIGEgcG9seWZpbGwgZm9yIElFXG4gKiBodHRwczovL3BvbHlmaWxsLmlvL3YyL2RvY3MvZmVhdHVyZXMvI0VsZW1lbnRfcHJvdG90eXBlX21hdGNoZXNcbiAqXG4gKiBCYXNpYyBVc2FnZTtcbiAqXG4gKiBqYXZhc2NyaXB0OlxuICogICBuZXcgVG9nZ2xlKCkuaW5pdCgpO1xuICpcbiAqIFRvZ2dsaW5nIEFuY2hvciBsaW5rczpcbiAqICAgPGEgZGF0YS1qcz0ndG9nZ2xlJyBocmVmPScjbWFpbi1tZW51Jz5NZW51PC9hPlxuICogICA8ZGl2IGlkPSdtYWluLW1lbnUnIGFyaWEtaGlkZGVuPSd0cnVlJz4gLi4uIDwvZGl2PlxuICpcbiAqIFRvZ2dsaW5nIGFyaWEtY29udHJvbCBlbGVtZW50czpcbiAqXG4gKiAgIDxidXR0b24gZGF0YS1qcz0ndG9nZ2xlJyBhcmlhLWNvbnRyb2xzPScjbWFpbi1tZW51JyBhcmlhLXByZXNzZWQ9J2ZhbHNlJz5cbiAqICAgICAgTWVudVxuICogICA8L2J1dHRvbj5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+IC4uLiA8L2Rpdj5cbiAqXG4gKiBDcmVhdGUgXCJVbmRvXCIgRXZlbnQgKHRvIGNsb3NlIGEgZGlhbG9ndWUpO1xuICogICA8YSBocmVmPScjbWFpbi1tZW51JyBkYXRhLWpzPSd0b2dnbGUnIGRhdGEtdG9nZ2xlLXVuZG89JyNjbG9zZSc+TWVudTwvYT5cbiAqICAgPGRpdiBpZD0nbWFpbi1tZW51JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+XG4gKiAgICAgPGEgaWQ9XCJjbG9zZVwiPkNsb3NlPC9hPlxuICogICA8L2Rpdj5cbiAqIEBjbGFzc1xuICovXG5jbGFzcyBUb2dnbGUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSAge29iamVjdH0gcyBTZXR0aW5ncyBmb3IgdGhpcyBUb2dnbGUgaW5zdGFuY2VcbiAgICogQHJldHVybiB7b2JqZWN0fSAgIFRoZSBjbGFzc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocykge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBzID0gKCFzKSA/IHt9IDogcztcblxuICAgIHRoaXMuX3NldHRpbmdzID0ge1xuICAgICAgc2VsZWN0b3I6IChzLnNlbGVjdG9yKSA/IHMuc2VsZWN0b3IgOiBUb2dnbGUuc2VsZWN0b3IsXG4gICAgICBuYW1lc3BhY2U6IChzLm5hbWVzcGFjZSkgPyBzLm5hbWVzcGFjZSA6IFRvZ2dsZS5uYW1lc3BhY2UsXG4gICAgICBpbmFjdGl2ZUNsYXNzOiAocy5pbmFjdGl2ZUNsYXNzKSA/IHMuaW5hY3RpdmVDbGFzcyA6IFRvZ2dsZS5pbmFjdGl2ZUNsYXNzLFxuICAgICAgYWN0aXZlQ2xhc3M6IChzLmFjdGl2ZUNsYXNzKSA/IHMuYWN0aXZlQ2xhc3MgOiBUb2dnbGUuYWN0aXZlQ2xhc3MsXG4gICAgfTtcblxuICAgIGJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXModGhpcy5fc2V0dGluZ3Muc2VsZWN0b3IpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRoaXMuX3RvZ2dsZShldmVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIGNvbnN0YW50cyB0byB0aGUgZGVidWdnZXJcbiAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCAgVGhlIG1haW4gY2xpY2sgZXZlbnRcbiAgICogQHJldHVybiB7b2JqZWN0fSAgICAgICAgVGhlIGNsYXNzXG4gICAqL1xuICBfdG9nZ2xlKGV2ZW50KSB7XG4gICAgbGV0IGVsID0gZXZlbnQudGFyZ2V0O1xuICAgIGxldCB0YXJnZXQgPSBmYWxzZTtcblxuICAgIC8qKiBBbmNob3IgTGlua3MgKi9cbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwuZ2V0QXR0cmlidXRlKCdocmVmJykpIDogdGFyZ2V0O1xuXG4gICAgLyoqIFRvZ2dsZSBDb250cm9scyAqL1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcbiAgICB0YXJnZXQgPSAoZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpID9cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2VsLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpfWApIDogdGFyZ2V0O1xuXG4gICAgLyoqIE1haW4gRnVuY3Rpb25hbGl0eSAqL1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCk7XG5cbiAgICAvKiogVW5kbyAqL1xuICAgIGlmIChlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF0pIHtcbiAgICAgIGNvbnN0IHVuZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBlbC5kYXRhc2V0W2Ake3RoaXMuX3NldHRpbmdzLm5hbWVzcGFjZX1VbmRvYF1cbiAgICAgICk7XG5cbiAgICAgIHVuZG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50VG9nZ2xlKGVsLCB0YXJnZXQpO1xuICAgICAgICB1bmRvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiB0b2dnbGluZyBtZXRob2RcbiAgICogQHBhcmFtICB7b2JqZWN0fSBlbCAgICAgVGhlIGN1cnJlbnQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlXG4gICAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0IFRoZSB0YXJnZXQgZWxlbWVudCB0byB0b2dnbGUgYWN0aXZlL2hpZGRlblxuICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICBUaGUgY2xhc3NcbiAgICovXG4gIGVsZW1lbnRUb2dnbGUoZWwsIHRhcmdldCkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5hY3RpdmVDbGFzcyAhPT0gJycpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5pbmFjdGl2ZUNsYXNzICE9PSAnJykge1xuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVDbGFzcyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIGVsZW1lbnQgZm9yIGRlZmluZWQgYXJpYSByb2xlcyBhbmQgdG9nZ2xlIHRoZW0gaWYgdGhleSBleGlzdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVG9nZ2xlLmVsQXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKFRvZ2dsZS5lbEFyaWFSb2xlc1tpXSkpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShUb2dnbGUuZWxBcmlhUm9sZXNbaV0sXG4gICAgICAgICAgIShlbC5nZXRBdHRyaWJ1dGUoVG9nZ2xlLmVsQXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhlIHRhcmdldCBmb3IgZGVmaW5lZCBhcmlhIHJvbGVzIGFuZCB0b2dnbGUgdGhlbSBpZiB0aGV5IGV4aXN0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUb2dnbGUudGFyZ2V0QXJpYVJvbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSlcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldLFxuICAgICAgICAgICEodGFyZ2V0LmdldEF0dHJpYnV0ZShUb2dnbGUudGFyZ2V0QXJpYVJvbGVzW2ldKSA9PT0gJ3RydWUnKSk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgZWwuZ2V0QXR0cmlidXRlKCdocmVmJykgJiZcbiAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5fc2V0dGluZ3MuYWN0aXZlQ2xhc3MpKVxuICAgIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgbWFpbiBzZWxlY3RvciB0byBhZGQgdGhlIHRvZ2dsaW5nIGZ1bmN0aW9uIHRvICovXG5Ub2dnbGUuc2VsZWN0b3IgPSAnW2RhdGEtanMqPVwidG9nZ2xlXCJdJztcblxuLyoqIEB0eXBlIHtTdHJpbmd9IFRoZSBuYW1lc3BhY2UgZm9yIG91ciBkYXRhIGF0dHJpYnV0ZSBzZXR0aW5ncyAqL1xuVG9nZ2xlLm5hbWVzcGFjZSA9ICd0b2dnbGUnO1xuXG4vKiogQHR5cGUge1N0cmluZ30gVGhlIGhpZGUgY2xhc3MgKi9cblRvZ2dsZS5pbmFjdGl2ZUNsYXNzID0gJ2hpZGRlbic7XG5cbi8qKiBAdHlwZSB7U3RyaW5nfSBUaGUgYWN0aXZlIGNsYXNzICovXG5Ub2dnbGUuYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuLyoqIEB0eXBlIHtBcnJheX0gQXJpYSByb2xlcyB0byB0b2dnbGUgdHJ1ZS9mYWxzZSBvbiB0aGUgdG9nZ2xpbmcgZWxlbWVudCAqL1xuVG9nZ2xlLmVsQXJpYVJvbGVzID0gWydhcmlhLXByZXNzZWQnLCAnYXJpYS1leHBhbmRlZCddO1xuXG4vKiogQHR5cGUge0FycmF5fSBBcmlhIHJvbGVzIHRvIHRvZ2dsZSB0cnVlL2ZhbHNlIG9uIHRoZSB0YXJnZXQgZWxlbWVudCAqL1xuVG9nZ2xlLnRhcmdldEFyaWFSb2xlcyA9IFsnYXJpYS1oaWRkZW4nXTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlOyJdLCJuYW1lcyI6WyJUb2dnbGUiLCJzIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9zZXR0aW5ncyIsInNlbGVjdG9yIiwibmFtZXNwYWNlIiwiaW5hY3RpdmVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwibWF0Y2hlcyIsIl90aGlzIiwicHJldmVudERlZmF1bHQiLCJfdG9nZ2xlIiwidGhpcyIsImVsIiwiZ2V0QXR0cmlidXRlIiwiZWxlbWVudFRvZ2dsZSIsImRhdGFzZXQiLCJ1bmRvIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImkiLCJlbEFyaWFSb2xlcyIsImxlbmd0aCIsInNldEF0dHJpYnV0ZSIsInRhcmdldEFyaWFSb2xlcyIsImNvbnRhaW5zIiwibG9jYXRpb24iLCJoYXNoIl0sIm1hcHBpbmdzIjoiMlhBbUNNQSx3QkFNUUMsNEJBQ0pDLEVBQU9DLFNBQVNDLGNBQWMsaUJBRTlCSCxXQUVESSxvQkFDUUosRUFBRUssU0FBWUwsRUFBRUssU0FBV04sRUFBT00sbUJBQ2pDTCxFQUFFTSxVQUFhTixFQUFFTSxVQUFZUCxFQUFPTyx3QkFDaENOLEVBQUVPLGNBQWlCUCxFQUFFTyxjQUFnQlIsRUFBT1EsMEJBQzlDUCxFQUFFUSxZQUFlUixFQUFFUSxZQUFjVCxFQUFPUyxlQUduREMsaUJBQWlCLFFBQVMsU0FBQ0MsR0FDekJBLEVBQU1DLE9BQU9DLFFBQVFDLEVBQUtULFVBQVVDLGNBR25DUyxtQkFFREMsUUFBUUwsTUFHUk0sK0NBUUROLGNBQ0ZPLEVBQUtQLEVBQU1DLE9BQ1hBLEdBQVMsT0FHSE0sRUFBR0MsYUFBYSxRQUN4QmhCLFNBQVNDLGNBQWNjLEVBQUdDLGFBQWEsU0FBV1AsTUFJMUNNLEVBQUdDLGFBQWEsaUJBQ3hCaEIsU0FBU0Msa0JBQWtCYyxFQUFHQyxhQUFhLGtCQUFzQlAsR0FHdEQsT0FBT0ssYUFDZkcsY0FBY0YsRUFBSU4sR0FHbkJNLEVBQUdHLFFBQVdKLEtBQUtaLFVBQVVFLGtCQUFrQixLQUMzQ2UsRUFBT25CLFNBQVNDLGNBQ3BCYyxFQUFHRyxRQUFXSixLQUFLWixVQUFVRSxxQkFHMUJHLGlCQUFpQixRQUFTLFNBQUNDLEtBQ3hCSSxtQkFDREssY0FBY0YsRUFBSU4sS0FDbEJXLG9CQUFvQixrQkFJdEJOLDJDQVNLQyxFQUFJTixHQUNtQixLQUEvQkssS0FBS1osVUFBVUksZ0JBQ2RlLFVBQVVDLE9BQU9SLEtBQUtaLFVBQVVJLGVBQzVCZSxVQUFVQyxPQUFPUixLQUFLWixVQUFVSSxjQUdKLEtBQWpDUSxLQUFLWixVQUFVRyxpQkFDVmdCLFVBQVVDLE9BQU9SLEtBQUtaLFVBQVVHLG1CQUlwQyxJQUFJa0IsRUFBSSxFQUFHQSxFQUFJMUIsRUFBTzJCLFlBQVlDLE9BQVFGLElBQ3pDUixFQUFHQyxhQUFhbkIsRUFBTzJCLFlBQVlELEtBQ3JDUixFQUFHVyxhQUFhN0IsRUFBTzJCLFlBQVlELEtBQ1ksU0FBM0NSLEVBQUdDLGFBQWFuQixFQUFPMkIsWUFBWUQsVUFJdEMsSUFBSUEsRUFBSSxFQUFHQSxFQUFJMUIsRUFBTzhCLGdCQUFnQkYsT0FBUUYsSUFDN0NkLEVBQU9PLGFBQWFuQixFQUFPOEIsZ0JBQWdCSixLQUM3Q2QsRUFBT2lCLGFBQWE3QixFQUFPOEIsZ0JBQWdCSixLQUNZLFNBQW5EZCxFQUFPTyxhQUFhbkIsRUFBTzhCLGdCQUFnQkosYUFJakRSLEVBQUdDLGFBQWEsU0FDaEJQLEVBQU9ZLFVBQVVPLFNBQVNkLEtBQUtaLFVBQVVJLHNCQUVsQ3VCLFNBQVNDLEtBQU8sVUFDaEJELFNBQVNDLEtBQU9mLEVBQUdDLGFBQWEsU0FHbENGLHFCQUtYakIsRUFBT00sU0FBVyxzQkFHbEJOLEVBQU9PLFVBQVksU0FHbkJQLEVBQU9RLGNBQWdCLFNBR3ZCUixFQUFPUyxZQUFjLFNBR3JCVCxFQUFPMkIsYUFBZSxlQUFnQixpQkFHdEMzQixFQUFPOEIsaUJBQW1CIn0=