## Modal Usage

To instantiate the Modal Object through the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.scripts }}">global {{ this.package.nice }} script</a> use the following code:

```javascript
var nyco = new {{ this.package.instantiations.scripts }}();

nyco.dialog();
```

#### ES Module

This method is a wrapper around the [Patterns Scripts dialog utility](https://github.com/CityOfNewYork/patterns-scripts/tree/main/src/dialog) which is included as a dependency of this project. The utility can be imported as an ES module and instantiated separately.

```javascript
import Dialog from '@nycopportunity/pttrn-scripts/src/dialog/dialog';

new Dialog();
```
