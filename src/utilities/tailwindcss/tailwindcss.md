## About Utilities

Utilities allow the flexibility to change specific properties of every Pattern in certain views. For example, if a Pattern is set to `display: block` in one view but in another it needs to be set to `display: inline`, one solution would be to create another type of the Pattern. However, a UI developer may need to repeat this process for other Patterns. Writing alternate versions of Patterns is less efficient for UI development.

A utility class, such as `.inline { display: inline }`, allows the developer to reuse this attribute without creating a different pattern type or writing more CSS. This use case can be extended to every possible CSS attribute, such as color, position, font-families, margin, padding, etc. In addition, they can be bundled within media queries so certain utilities can work for specific screen sizes.

A simple example for using a utility to add padding to an element would be to use the utility `.p-1`. This will add `8px` of padding on all sides of an element.

**CSS**

```css
.p-1 { padding: 8px }
.border { border: 1px }
```

**HTML**

```html
<div class="border p-1">
  An element styled with utilities
</div>
```

**Renders**

<div class="border p-1">
  An element styled with utilities
</div>

### Utilities and Design Tokens

Utilities can also be used to create new components that are not readily available in a pattern library. This enables scale of the design system but maintains the relationship with the design through it's tokens. While some utilities are very CSS centric for front-end development purposes (display, accessibility, position, etc.) others are programmatic implementations of the design tokens that make the system unique (colors, typography, grid, etc.).

**CSS**

```css
.p-2 { padding: 16px }
.bg-blue { background-color: #284CCA }
.text-navy { background-color: #24325B }
.shadow-up { box-shadow: 8px 8px 0px 0px }
.text-base-white { color: #FFF }
```

**HTML**

```html
<div class="bg-blue text-navy shadow-up rounded p-2">
  <div class="text-base-white">An element styled with utilities.</div>
</div>
```

**Renders**

<div class="bg-blue text-navy shadow-up rounded p-2">
  <div class="text-base-white">An element styled with utilities.</div>
</div>

## Tailwindcss

NYCO Patterns integrates [Tailwindcss](https://tailwindcss.com/), a CSS utility-first framework that is customized with NYCO Pattern design tokens. There are three parts to the Tailwindcss configuration.

* **Core Plugins**: This array is a white list of utility plugins that defines what sets of utilities will be compiled in the final stylesheet distribution. [Source documentation](https://tailwindcss.com/docs/configuration#core-plugins). Example; the core plugin for padding is `padding`. Adding or removing it to the array will determine wether those utilities are compiled to the global stylesheet.

* **Variants**: This object contains variants that represent different states that the utilities appear in such as media queries, `:hover`, and `:focus` states. [Source documentation](https://tailwindcss.com/docs/configuring-variants). Example; to have padding only appear for desktop screens within NYCO Patterns the variant `desktop:` is added to the `.p-1` utility: `<div class="desktop:p-1"></div>`.

* **Theme**: This object contains NYCO design tokens for particular utilities such as font families, colors, margin, padding, etc. [Source documentation](https://tailwindcss.com/docs/theme). Example; the padding plugin is customized to use `8px` as the basis for all padding increments. `.p-2` would add `8px × 2 = 16px` padding on all sides of an element: `<div class="p-2"></div>`. Colors are also part of the theme configuration but are described in more detail in the [NYCO Patterns Color Utility documentation](/colors).

Below is a table describing the current [configuration source](https://github.com/CityOfNewYork/nyco-patterns/blob/master/config/tailwind.js) that includes which core plugins are enabled, what variants they use, and if they are themed with NYCO Pattern design tokens.

include{{ utilities/tailwindcss/tailwindcss.slm }}
