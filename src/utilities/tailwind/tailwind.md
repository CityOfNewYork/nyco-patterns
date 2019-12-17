## About Utilities

Utilities allow the flexibility to change specific properties of every Pattern in certain views. For example, if a Pattern is set to `display: block` in one view but in another it needs to be set to `display: inline`, one solution would be to create another type of the Pattern. However, a UI developer may need to repeat this process for other Patterns.

A Utility class, such as `.inline { display: inline }`, allows the developer to reuse this attribute without creating a different pattern type. This use case can be extended to every possible CSS attribute, such as color, position, font-families, margin, padding, etc. In addition, they can be bundled within media queries so certain utilities can work for specific screen sizes.

## Tailwind

[![Tailwind CSS](https://tailwindcss.com/img/twitter-large-card.png)](https://tailwindcss.com)

NYCO Patterns integrates the [tailwind.css](https://tailwindcss.com), a CSS utility-first framework processed by [PostCSS](https://postcss.org/) that supports [custom configuration](https://tailwindcss.com/docs/configuration). The NYCO Patterns configuration lives in [config/tailwind.js](https://github.com/CityOfNewYork/nyco-patterns/blob/master/config/tailwind.js) and below is a table describing the current [core plugins](https://tailwindcss.com/docs/configuration#core-plugins) available in NYCO Patterns.

A simple example for adding [padding](#config-padding) to an element would be to use the default utility `.p-1` which will add `8px` of padding on all sides.

    .p-1 {
      padding: 8px
    }

    <div class="p-1"></div>

### Customization

The NYCO Patterns Tailwind integration is customized to use `8px` as the basis for all padding increments. `.p-2` would add `8px * 2 = 16px` padding on all sides of an element.

    <div class="p-2"></div>

### Variants

Variants permit certain utilities to appear in different states such as within certain media queries, `:hover`, or `:focus` states. To have padding only appear for desktop screens within NYCO Patterns the prefix `screen-desktop:` is added to the `.p-1` utility.

    <div class="screen-desktop:p-1"></div>

The plugin table below describes the available variants for each utility. An empty array `[]` means only the default utility is available. At the bottom is a description of the avaliable break points for the [responsive variants](#responsive-variants).

### Colors

Color theme settings are described in more detail in the [colors documentation](/colors).

slm{{ utilities/tailwind/tailwind.slm }}
