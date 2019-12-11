The toggle utility uses JavaScript to show/hide and hide elements based on user interaction. This will toggle the class 'active' and 'hidden' on the toggle element and target element, determined by the click event on a button or link. This will also toggle Aria attributes present on the toggle element and the target element to support screen readers. Supported aria attributes include <code>aria-pressed</code> and <code>aria-expanded</code> on the toggle element and <code>aria-hidden</code> on the target element. These attributes must be present on each element with default settings when the script loads to support them.

### Usage

p
  div class='code-block'
    pre
      = "import Toggle from '../utilities/toggle/Toggle';\n"
      = "new Toggle();"

This uses the <code>.matches()</code> method which will require a polyfill for IE11 (and other older browser) support. The utility does not ship with a polyfill by default. See <a href='https://polyfill.io/v2/docs/features/#Element_prototype_matches'>Element Prototype Matches on MDN</a> for a suitable polyfill.

The basic example uses the <code>aria-controls</code> on the toggle element to select the <code>id</code> of the target element, and toggle it accordingly
