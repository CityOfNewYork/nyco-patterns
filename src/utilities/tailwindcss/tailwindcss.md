## About Utilities

Utilities allow the flexibility to change specific properties of every Pattern in certain views. For example, if a Pattern is set to `display: block` in one view but in another it needs to be set to `display: inline`, one solution would be to create another type of the Pattern. However, a UI developer may need to repeat this process for other Patterns. Writing alternate versions of Patterns is less efficient and flexible for UI development.

A Utility class, such as `.inline { display: inline }`, allows the developer to reuse this attribute without creating a different pattern type. This use case can be extended to every possible CSS attribute, such as color, position, font-families, margin, padding, etc. In addition, they can be bundled within media queries so certain utilities can work for specific screen sizes.

## Tailwindcss

[![tailwindcss](https://tailwindcss.com/img/twitter-large-card.png)](https://tailwindcss.com)

NYCO Patterns integrates the [tailwindcss](https://tailwindcss.com), a CSS utility-first framework processed by [PostCSS](https://postcss.org/) that supports custom configuration. The NYCO Patterns configuration lives in [config/tailwind.js](https://github.com/CityOfNewYork/nyco-patterns/blob/master/config/tailwind.js) and below is a table describing the current configuration.

A simple example for using a utility to add padding to an element would be to use the utility `.p-1`. This will add `8px` of padding on all sides of an element.

    .p-1 {
      padding: 8px
    }

    <div class="p-1"></div>

### Configuration

There are three parts to the NYCO Patterns tailwindcss configuration.

* [Theme](#config-theme): This object contains customizations for particular utilities such as font families, colors, margin, padding, etc. [Source documentation](https://tailwindcss.com/docs/theme).
* [Variants](#config-variants-and-core-plugins): This object contains variants that represent different states that the utilities appear in such as media queries, `:hover`, and `:focus` states. [Source documentation](https://tailwindcss.com/docs/configuring-variants).
* [Core Plugins](#config-variants-and-core-plugins): This array is a white list of utility plugins that defines what sets of utilities will be compiled in the final stylesheet distribution. [Source documentation](https://tailwindcss.com/docs/configuration#core-plugins).

#### Theme

Example; the padding plugin is customized to use `8px` as the basis for all padding increments. `.p-2` would add `8px × 2 = 16px` padding on all sides of an element.

    <div class="p-2"></div>

Colors are part of the theme configuration but are described in more detail in the [NYCO Patterns Color Utility documentation](/colors).

#### Variants

Example; to have padding only appear for desktop screens within NYCO Patterns the prefix `screen-desktop:` is added to the `.p-1` utility.

    <div class="screen-desktop:p-1"></div>

The plugin table below describes the available variants for each utility. An empty array `[]` means only the default state is available. The [screens theme configuration](#config-screens) describes the avaliable break points for the [responsive variants](#responsive-variants).

#### Core Plugins

Example; the core plugin for padding is `padding`. Adding or removing it to the whitelist will determine wether those utilities are compiled to the global stylesheet.

slm{{ utilities/tailwindcss/tailwindcss.slm }}

### Installation

**tailwindcss** is not imported the same way as other patterns. All utilities are compiled to a Sass file...

    /dist/styles/_tailwind.scss

(which can be imported in a Sass project)...

    @import 'node_modules/@nycopportunity/nyco-patterns/dist/styles/_tailwind.scss';

... and a CSS file in the **/dist** folder:

    /dist/styles/tailwind.css

The CSS file can be included through a CDN. Replace `{{ version }}` with the latest release in the top right corner of this page.

    <link href="https://cdn.jsdelivr.net/gh/cityofnewyork/@nycopportunity/nyco-patterns@v{{ version }}/dist/styles/tailwind.css" rel="stylesheet" type="text/css">