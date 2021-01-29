## Icon Usage

### Inline SVG Sprites

To use SVG icons, you can inline each sprite in your page markup by adding it to a template partial or copy/pasting the SVG sprite file contents into the base template of your application or site.

* <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.svg }}">Icon sprite</a>. Includes logos, custom icons, checkbox, radio, and select box graphics. Path **{{ this.package.cdn.svg }}**
* <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.feather }}">Feather icon sprite</a>. Path **{{ this.package.cdn.feather }}**

However, it is recommended to asynchronously retrieve the file and inline it to reduce the overall page size. {{ this.package.nice }} uses `fetch()` to retrieve the sprite and add it to the DOM on page load. This will cache the sprite file without including it in the page to decrease the size of each page.

To import the icon through the <a href="{{ this.package.cdn.release }}{{ this.package.version }}{{ this.package.cdn.scripts }}">global {{ this.package.nice }} script</a> use the following code:

```javascript
var nyco = new {{ this.package.instantiations.scripts }}();

nyco.icons();
nyco.icons('svg/feather.svg');
```

The script expects the default icon sprite path to be located at the path **svg/icons.svg** (relative to the displayed page). To overwrite this, pass a path string as an argument to the method:

```javascript
nyco.icons('path/to/icons.svg');
```

#### ES Module

This method is a wrapper around the [Patterns Scripts icon utility](https://github.com/CityOfNewYork/patterns-scripts/tree/main/src/icons) which is included as a dependency of this project. The utility can be imported as an ES module and instantiated separately.

```javascript
import Icons from '@nycopportunity/pttrn-scripts/src/icons/icons';

new Icons(); // Inline the icon sprite
new Icons('svg/feather.svg'); // Inline the Feather icon sprite

// or specify custom local path

new Icons('path/to/icons.svg');
new Icons('path/to/feather.svg');

// or CDN

new Icons('{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.svg }}');
new Icons('{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.feather }}');
```

### Markup

Once the sprite is inlined on the desired page to display an icon on, individual icons can be referenced with the SVG `<use>` tag. To change the color of inline SVG icon shapes that have their fill set as `currentColor`, use [Tailwindcss text color utilities](colors).

In this logo example, the `role` attribute is set to image and the `<title>` tag is set inside the SVG. This enables compatibility with screen readers to read the title as they would alternative text in images.

<div class="py-2 text-center"><svg class="icon-logo-nyco icon-large text-navy" role="img">
  <title id="icon-logo-nyco-title">The NYC Opportunity Logo</title><use xlink:href="#icon-logo-nyco"></use>
</svg></div>

```html
<svg class="icon-logo-nyco icon-large text-navy" role="img">
  <title id="icon-logo-nyco-title">
    The NYC Opportunity Logo
  </title>

  <use xlink:href="#icon-logo-nyco"></use>
</svg>
```

It may not always be necessary to have screen readers read icons if they are purely decorative or are associated with a text label. They can be hidden with the `aria-hidden` attribute. In the following example an icon is included in a link that has a text label

<div class="py-6 text-center"><a href="#" class="inline-flex items-center"><svg class="icon-ui mie-1" aria-hidden="true"><use xlink:href="#feather-feather"></use></svg> Feather Label</a></div>

```html
<a href="#" class="inline-flex items-center">
  <svg class="icon-ui mie-1" aria-hidden="true">
    <use xlink:href="#feather-feather"></use>
  </svg> Feather Label
</a>
```

### Icon size utilities

To manage the size of the icons, use the icon size utilities. The dimensions are based on the **{{ this.tokens.grid }}** grid and include the following sizes;

Class         | Dimensions
--------------|-
`icon-1`      | {{ this.tokens.iconSizes.1 }}
`icon-2`      | {{ this.tokens.iconSizes.2 }}
`icon-3`      | {{ this.tokens.iconSizes.3 }}
`icon-4`      | {{ this.tokens.iconSizes.4 }}
`icon-5`      | {{ this.tokens.iconSizes.5 }}
`icon-6`      | {{ this.tokens.iconSizes.6 }}
`icon-7`      | {{ this.tokens.iconSizes.7 }}
`icon-8`      | {{ this.tokens.iconSizes.8 }}
`icon-9`      | {{ this.tokens.iconSizes.9 }}
`icon-10`     | {{ this.tokens.iconSizes.10 }}
`icon-11`     | {{ this.tokens.iconSizes.11 }}
`icon-12`     | {{ this.tokens.iconSizes.12 }}
`icon-large`  | {{ this.tokens.iconSizes.large }}
`icon-xlarge` | {{ this.tokens.iconSizes.xlarge }}

## Maintaining the size of the icon sprite

Care should be taken to reduce the size of the icon sprite in production builds by only including icons that are used in your project. The Gulp.js script below is a rough example of how to build an icon sprite by examining the static template files in a view directory.

```javascript
const VIEWS = 'path/to/view/templates';
const PATTERNS = 'path/to/patterns/source';

let list = [];

/**
 * Build the icon list from templates
 */
gulp.task('svgs:list', () => gulp.src([
    `${VIEWS}/**/*.twig`,
    `${VIEWS}/**/*.vue`
  ]).pipe(through.obj((chunk, encoding, callback) => {
    const regex = /xlink:href="([\S]*)#([\S]+)"/g
    let content = chunk.contents.toString('utf8');
    let m;

    while ((m = regex.exec(content)) !== null) {
      list.push(m[2]);
    }

    callback(null, chunk);
  }))
);

/**
 * Add full path name to the sprite source
 */
gulp.task('svgs:add', () => gulp.src('assets/svg/icons.svg')
  .pipe(through.obj((chunk, encoding, callback) => {
    list = list.filter((item, index) => list.indexOf(item) === index)
      .map(item => `${PATTERNS}/src/svg/${item}.svg`);

    callback(null, chunk);
  }))
);

/**
 * Add optimize and store icons in a new sprite
 */
gulp.task('svgs:compile', () =>
  gulp.src(list)
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest('assets/svg/'))
    .pipe(hashFilename({format: HASH_FORMAT}))
    .pipe(gulp.dest('assets/svg/'))
);
```