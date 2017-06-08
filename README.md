# Agency patterns for the Mayor's Office for Economic Opportunity
This library maintains common agency patterns and may be used in internal or
external projects.

## Agency Colors


## Usage
Include this repository as a dependency in your `package.json` file.

```
  "devDependencies": {
    ...
    "oeo-patterns": "git+https://github.com/CityOfNewYork/oeo-patterns.git"
    ...
  }
```

Run `npm install oeo-patterns` to install it.

### Styles
#### Embed
You can copy the distribution file `dist/styles/site.min.css` into your project
and link to it in the head of the document.

```
<link rel="stylesheet" href="dist/styles/site.min.css">
```

#### Build
You can also inlcude the src `oeo-patterns/src/scss/site.scss` in whichever build
tool you prefer.

#### Recommended
Create your own `site.scss` in your source and include specific patterns individually
so that you can include it within your project's styles and build your own distribution.
Be sure to add `node_modules` to the include paths of your build tool.

```
@charset 'utf-8';

@import 'oeo-patterns/src/scss/utilities/colors';
@import 'oeo-patterns/src/scss/utilities/transitions';
```

As an example, this library uses `cssnano-cli`, `node-sass`, and `nodemon` to watch
changes, bundle, and create distributions.

```
  "config": {
    "style_src": "src/scss/site.scss",
    "style_bundle": "bundle/styles/site.concat.css",
    "style_dist": "dist/styles/site.min.css"
  },
  "scripts": {
    "styles-watch": "nodemon --ext scss --watch src/styles -x 'npm run styles'",
    "styles-postcss": "cssnano --sourcemap < $npm_package_config_style_bundle > $npm_package_config_style_dist",
    "styles": "node-sass --sourceMapEmbed true --include-path node_modules $npm_package_config_style_src $npm_package_config_style_bundle && npm run styles-postcss"
  },
```
