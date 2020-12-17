## Installation

Tailwindcss is not imported the same way as other patterns. All utilities are compiled to a Sass file...

```
/dist/utilities/tailwindcss/_tailwindcss.scss
```

(which can be imported in a Sass project)...

```scss
@import 'node_modules/@nycopportunity/nyco-patterns/dist/utilities/tailwindcss/_tailwindcss.scss';
```

... and a CSS file in the **/dist** folder:

```
/dist/utilities/tailwindcss/tailwindcss.css
```

The CSS file can be included through a CDN. Replace `{{ version }}` with the latest release in the top right corner of this page.

```html
<link href="https://cdn.jsdelivr.net/gh/cityofnewyork/nyco-patterns@v{{ version }}/dist/utilities/tailwindcss/tailwindcss.css" rel="stylesheet" type="text/css">
```

### As a dependency

It is also possible to install Tailwindcss as a dependency in your project and import the NYCO Patterns tailwind.js configuration into your project. See the [Tailwindcss integration guides for various projects](https://tailwindcss.com/docs/installation). Below is the full path to the configuration file.

```javascript
node_modules/@nycopportunity/nyco-patterns/config/tailwind.js
```

### Production distributions and PurgeCSS

It is highly recommended to use [PurgeCSS](https://purgecss.com/) to analyze the classnames used in your static markup files to remove unused CSS classes in your stylesheet. The output of Tailwindcss produces a very large stylesheet with many utilities that won't be used in your project. See the [Tailwindcss optimizing for production guide](https://tailwindcss.com/docs/optimizing-for-production).