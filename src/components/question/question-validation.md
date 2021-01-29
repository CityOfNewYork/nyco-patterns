## Validation

To utilize form validation through the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.scripts }}">global {{ this.package.nice }} script</a> use the following code.

```html
<form id="question-demo">
  <!-- Form Questions -->
</form>
```

Assuming you have a form on the page with an ID of `question-demo`, pass the `<form>` ID to the `nyco.valid()` method:

```javascript
var nyco = new {{ this.package.instantiations.scripts }}();

nyco.valid('#question-demo', function(event) {
  event.preventDefault();

  return false;
});
```

The method accepts two arguments; the first being the ID of the form and the second is the event handler for an invalid response.

#### ES Module

This method is a wrapper around the [Patterns Scripts form utility](https://github.com/CityOfNewYork/patterns-scripts/tree/main/src/forms) which is included as a dependency of this project. The utility can be imported as an ES module and instantiated separately.

```javascript
import Forms from '@nycopportunity/pttrn-scripts/src/forms/forms';

let Form = new Forms(document.querySelector('#question-demo'));

Form.submit = function(event) {
  event.preventDefault();

  return false;
};

Form.selectors.ERROR_MESSAGE_PARENT = '[data-js*="question-container"]';

Form.watch();
```