## Toggle Usage

To instantiate toggling through the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.scripts }}">global {{ this.package.nice }} script</a> use the following code:

```javascript
var nyco = new {{ this.package.instantiations.scripts }}();

nyco.toggle();
```

##### Buttons

`<button>` elements with the `data-js="toggle"` attribute will toggle other elements by ID using the selector in the `aria-controls` attribute (without the hash `#` sign).

##### Anchor Links

`<a>` tags with the `data-js="toggle"` attribute will toggle, *scroll to*, and *shift focus* to other elements by ID using selector in the `href` attribute (must include the hash `#` sign).

#### ES Module

This method is a wrapper around the [Patterns Scripts toggle utility](https://github.com/CityOfNewYork/patterns-scripts/tree/main/src/toggle) which is included as a dependency of this project. The utility can be imported as an ES module and instantiated separately.

```javascript
import Toggle from '@nycopportunity/pttrn-scripts/src/toggle/toggle';

new Toggle();
```
