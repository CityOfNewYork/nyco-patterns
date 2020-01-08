## Usage

### The SVG Sprite

To use the inline SVGS, include the main icon sprite (`dist/icons.svg`) in your page markup. NYCO Patterns uses an AJAX method to cache the sprite file while not including it in the page cache to decrease the size of each page. To import the icon through the global NYCO Patterns Patterns script use the following code:

    var nyco = new NycoPatterns();
    nyco.icons();

The script expects the icon sprite path to be `./icons.svg` (relative to the displayed page). To overwrite this, pass a path to the method:

    nyco.icons('path/to/icons.svg');

The ES6 and IFFE modules all require instantiation in your main script:

    import Icons from 'src/elements/icons/icons';
    new Icons();
    // or 
    new Icons('path/to/icons.svg');

This uses the `fetch` method which will require a polyfill for IE11 (and other older browser) support. The script does not ship with a polyfill by default. See [Polyfill.io](https://polyfill.io) for a suitable polyfill.

### Markup

There are a few options for using icons after the sprite has been loaded on the page:

#### Inline SVG’s

The first option allows you to inline an SVG with the `use` tag. This is the preferred method for ACCESS NYC. Note that you can change the color of inline SVG icon shapes that have their fill set as currentColor by using a text color utility. Also, note the role="img" attribute, title tag, and title tag id for accessibility support.

    <svg class="icon-logo-nyco icon-xlarge text-color-blue-dark" role="img">
      <title id="icon-logo-nyco-title">The NYC Opportunity Logo</title>
      <use xlink:href="#icon-logo-nyco"></use>
    </svg>

#### Background Images

The second option does not require the icon sprite to be added to the page through the JavaScript module. It uses background images that reference the icons on the CDN. This option uses a utility class that sets the background image of the icon `.bg-{{ Icon ID Here }}`. Icons with background images require less markup but their shape fill color will default to black or whatever fill color the shape is set to. Note the `role="img"` and alt text attributes for accessibility.

    <div class="icon-logo-nyco" role="img" alt="The NYC Opportunity Logo"></div>

#### img tag

The third option is to use the individual SVG path as a source attribute in an image tag. Note the alt text attribute for accessibility.

    <img src="svgs/icon-logo-nyco.svg" alt="The NYC Opportunity Logo">

### Icon sizes

To manage the size of the icons, use the icon size utilities. The dimensions are based on the 8px grid and include the following sizes;

Class       | Dimensions
------------|-
icon-1      | 8px 8px
icon-2      | 16px 16px
icon-3      | 24px 24px
icon-4      | 32px 32px
icon-5      | 40px 40px
icon-6      | 48px 48px
icon-7      | 56px 56px
icon-8      | 64px 64px
icon-9      | 72px 72px
icon-10     | 80px 80px
icon-11     | 88px 88px
icon-12     | 96px 96px
icon-large  | 136px 136px
icon-xlarge | 256px 256px

**Accessibility Note**: If the SVG graphic doesn't serve a function, it may not be useful to screen readers. Therefore, it may be hidden using the `aria-hidden="true"` attribute.