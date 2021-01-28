## Icon Usage

### The SVG Sprite

To use the inline SVGS, include the main icon sprite <code>{{ this.package.cdn.svg }}</code> in your page markup. {{ this.package.nice }} uses an AJAX method to cache the sprite file while not including it in the page cache to decrease the size of each page. To import the icon through the global {{ this.package.nice }} script use the following code:

```javascript
var nyco = new NYCO();

nyco.icons();
```

The script expects the icon sprite path to be located at the path **svg/icons.svg** (relative to the displayed page). To overwrite this, pass a path to the method:

```javascript
nyco.icons('path/to/icons.svg');
```

The ES6 and IFFE modules all require instantiation in your main script:

```javascript
import Icons from '{{ this.package.name }}/src/elements/icons/icons';

new Icons();

// or

new Icons('{{ this.package.cdn.svg }}');

// or

new Icons('{{ this.package.cdn.url }}@v{{ this.package.version }}{{ this.package.cdn.svg }}');
```

### Markup

There are a few options for using icons after the sprite has been loaded on the page:

#### Inline SVG’s

The first option allows you to inline an SVG with the `use` tag. This is the preferred method for {{ this.package.nice }}. Note that you can change the color of inline SVG icon shapes that have their fill set as currentColor by using a text color utility. Also, note the role="img" attribute, title tag, and title tag id for accessibility support.

```html
<svg class="icon-logo-nyco icon-xlarge text-color-blue-dark" role="img">
  <title id="icon-logo-nyco-title">The NYC Opportunity Logo</title>
  <use xlink:href="#icon-logo-nyco"></use>
</svg>
```

### Icon sizes

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

**Accessibility Note**: If the SVG graphic doesn't serve a function, it may not be useful to screen readers. Therefore, it may be hidden using the `aria-hidden="true"` attribute.

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