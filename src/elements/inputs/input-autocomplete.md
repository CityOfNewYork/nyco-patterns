The Autocomplete Input Element uses JavaScript to provide an accessible and selectable list of suggested terms as a user types into the field.

The suggested terms are passed to the `autocomplete` class on instantiation and can be updated on the fly with new terms. Terms are displayed in order by relevance and synonym mapping (see usage details below), Additionally the function is miss-spelling tolerant.

#### Markup

```html
<div class="input-autocomplete">
  <input aria-autocomplete="both" aria-describedby="input-autocomplete__instructions-0" aria-expanded="false" aria-owns="input-autocomplete__options" autocomplete="off" data-js="input-autocomplete__input" type="text" />
  <div aria-live="polite" class="sr-only" id="input-autocomplete__instructions-0"></div>
</div>
```

Note: You can add the `data-persist-dropdown='true'` attribute to the `input` element for testing. The attribute will make the dropdown persist after the input is no longer in focus.

#### Global Script

To use the Autocomplete Input in the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.scripts }}">global {{ this.package.nice }} script</a> use the following code:

```javascript
const nyco = new {{ this.package.instantiations.scripts }}();

nyco.autocomplete({
  options: [
    ['Bronx'], ['Queens']
  ]
});
```

This function will instantiate the autocomplete with the provided options and attach the event listener to an input element with the default selector `[data-js='input-autocomplete__input']` (see markup details in the example above ).

Below is an advanced configuration that passes a callback to the "selected" method of the autocomplete class. This callback is executed after a user has selected an option and the input value has been set. It will pass the selected value (`String`) as the first argument and the autocomplete class (`Object`) as the second.

```javascript
var autocomplete = nyco.autocomplete({
  selected: function(value, autocomplete) {
    console.dir('Selected ' + value + '!');
  }
});
```

##### Updating Options

Below is an example of using the options setter to update the options after the class has been instantiated.

```javascript
autocomplete.options([
  ['Bronx'], ['Queens'], ['Brooklyn'], ['Staten Island'], ['Manhattan']
]);
```

##### Providing Synonyms

Each option can be provided with a list of synonyms that will score the option higher as the user types. Try it out in the example above by typing "Hunts Point" in the input. The option "Bronx" will be listed before all other options. This method can be used to provide common terms for specific search terms that exist in your site.

```javascript
autocomplete.options([
  ['Bronx', 'Hunts Point', 'Arthur Avenue', 'Riverside', 'Mott Haven'],
  ['Queens', 'Corona', 'East Elmhurst', 'Forest Hills', 'Fresh Pond'],
  ['Brooklyn', 'Flatbush', 'Bay Ridge', 'DUMBO', 'Williamsburg'],
  ['Staten Island', 'South Beach', 'Fort Wadsworth', 'Todt Hill', 'Great Kills'],
  ['Manhattan', 'Lower', 'Midtown', 'Chinatown', 'SoHo']
]);
```

##### Providing Strings

The list of strings below are used for screen reader accessibility by default. They can be overridden using the `.strings` method and passing an object of new strings. For the options strings, a dynamic variable string (denoted by `{{ }}` below) is provided and rendered in the output of the string. This method can be used to provide a localized set of strings.

```javascript
autocomplete.strings({
  'DIRECTIONS_TYPE': 'Start typing to generate a list of potential input options',
  'DIRECTIONS_REVIEW': 'Keyboard users can use the up and down arrows to review options and press enter to select an option',
  'OPTION_AVAILABLE': '{{ NUMBER }} options available',
  'OPTION_SELECTED': '{{ VALUE }} selected'
});
```

#### Configuration

The `autocomplete` class accepts an object `{}` with two properties: `selector` and `options`.

Option     | Type       | Importance | Description
:----------|:-----------|:-----------|:-
`options`  | *array*    | required   | The suggested terms to be displayed in the dropdown. Each item is an array with the first item being the visible value. The following values within each array are treated as synonyms that score the priority of term higher if the user types it.
`selected` | *function* | optional   | A callback method that will be executed when a user has selected an option.
`selector` | *string*   | optional   | The selector for the input element. If no selector is provided the default value will be set to `[data-js="input-autocomplete__input"]`.

#### ES Module

The `nyco.autocomplete()` method is a wrapper around the [Patterns Script autocomplete utility](https://github.com/CityOfNewYork/patterns-scripts/tree/main/src/autocomplete) which is included as a dependency of this project. The utility can be imported as an ES module and instantiated separately.

```javascript
import autocomplete from '@nycopportunity/pttrn-scripts/src/autocomplete/autocomplete';

new autocomplete({
  options: [
    ['Bronx'], ['Queens']
  ]
});
```

#### Accessibility

Accessibility is supported through ARIA attributes that will prompt the user on how to use the dropdown list. Screen readers will also announce the list of options in the dropdown as the user navigates them with the keyboard. To maintain the elements accessibility, the `accessibility` utility should be used and the appropriate ARIA attributes applied to the element (see markup section).
