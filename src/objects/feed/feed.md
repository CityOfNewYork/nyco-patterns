The **Feed Object** embeds a Medium feed onto any web page. Multiple urls can be combined to display as many posts from different user profiles, publications, or tagged pages in publications. Refer to the [Medium RSS Feed Documentation](https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds) on available feeds.

## Usage

### [Embed](customize-your-feed)

[Copy and paste the embeddable snippet](customize-your-feed) that automatically integrates the latest version of the **Feed Object**.

### Manual Integration

To use the feed source files, include the following scripts in your page. Replace `{{ version }}` with the semantic version in the top right of this page.

    <!-- The feed component uses Promises so this polyfill is needed for IE support -->
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=Promise&gated=gated" type="text/javascript"></script>
    <script src="https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v{{ version }}/dist/objects/feed/Feed.js" type="text/javascript"></script>

Optionally, but recommended, include the base styling for the feed. Replace `{{ version }}` with the semantic version in the top right of this page.

    <link src="https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v{{ version }}/dist/objects/feed/feed.css" rel="stylesheet" type="text/css">

Then, add a container with the feed's id and the execution script with configuration parameters.

    <div id="js-feed"></div>
    <script type="text/javascript">
      new Feed({
        selector: "#js-feed", // The DOM element selctor for the feed. Defaults to #js-feed'
        feed: "https://medium.com/feed/@nycopportunity/", // Required. The feed you want to display. May be an array of multiple feeds'
      });
    </script>

`new Feed({});` creates a feed, accepting a configuration object as a parameter. [The full configuration can be viewed here](customize-your-feed). The object should contain the configuration you would like for the feed. Note: the `selector` and `feed` parameters are required to display a feed. Below is a list of the rest of the default configuration options. See the [Medium RSS Feed Documentation](https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds) for more details on their feeds.

### Layouts

In the bundled styles for this component there are three layouts for the Feed items: 1 column (default), 2 column, and 3 column. In order to utilize the 2 or 3 column layouts, configure the `classes.wrapper` parameter to `o-feed--3-column` for 3 columns and `o-feed--2-column` for 2 columns.

### Templates

The feed comes shipped with ready-to-use LoDash template components for Medium feeds. Each component can be overwritten with the `template.component` configuration parameter. You can copy the templates below to get started creating your own template and refer to the [LoDash documentation for templates](https://lodash.com/docs/4.17.5#template).

Templates are passed the `config` object and whatever the response of the feed is. In Medium's case, they pass the `feed` parameter and posts within the `items` parameter in the response from their RSS feed. To see the data that gets passed to the template to use in your template, set the `log` configuration parameter to `true`. Open up the console to see the data for this particular feed demonstration.

### RSS to JSON

By default the **Feed Object** uses an API from [https://rss2json.com](https://rss2json.com) to convert desired RSS feed into a consumable JSON object. See the [RSS 2 JSON Online Converter](https://rss2json.com) documentation for details. It will also work with a self-hosted installation of [NYCO's RSS into JSON proxy](https://github.com/CityOfNewYork/nyco-rss-2-json).