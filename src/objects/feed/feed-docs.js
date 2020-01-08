'use strict';

/**
 * Dependencies
 */

class FeedDocs {
  constructor() {
    this.default = FeedDocs.default;
  }
}

FeedDocs.default = {
  feed: 'Required. string or array of strings. This may either be one RSS feed or an array of feeds. Arrays of feeds will be combined and posts will be ordered by date. Currently, this only works with Medium RSS feeds.',
  rssToJson: '"https://api.rss2json.com/v1/api.json?rss_url=" (default). By default it uses https://rss2json.com. It will also work with a self-hosted installation of NYCO\'s RSS into JSON proxy https://github.com/CityOfNewYork/nyco-rss-2-json',
  selector: '"[data-js="feed"]" (default) or other string. The DOM element selector for your feed. The inner html of this element will be replaced with the feed.',
  type: '"medium" (default) or other string. The feed type. Currently, only Medium feeds are supported so this shouldn\'t change.',
  title: 'The title of the feed that appears in the header. By default this uses the feed\'s title. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed title that was loaded.',
  titleUrl: 'The url that the title links to. By default this uses the feed\'s url. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed url that was loaded.',
  profileImg: 'The url to the profile image. By default this uses the feed\'s profile image. However, if using displaying multiple fields this should be set.  Otherwise, it will use the last feed image that was loaded.',
  fontSize: 'Any valid css font-size value and unit (em, px, %, etc.). Set this to a smaller percentage (say, 85%) to make the feed appear more compact in smaller columns.',
  ratioProfile: 'array of two strings. Pixel numbers without "px" unit. Image source attribute width and height for the account avatar.',
  postBorderColor: 'Any valid css border-color value. Set the color of the borders in the feed. All of the colors in the feed will inherit the style of the page except for the borders between cards. This may be any standard CSS color variable.',
  postImgHeight: 'Pixel value with "px" unit. CSS height of the post image. The width of the image defaults to 100% the width of the post.',
  postExcerptLength: 'This is the length of the excerpt.',
  postExcerptTrail: 'Setting this will override the trailing ellipsis for excerpts.',
  postCtaText: 'This is the text for each post\'s call to action.',
  postDateLocal: 'The date formatting uses Date.toLocaleDateString(). The options in postDateLocal and postDateFormat are passed as Date.toLocaleDateString(postDateLocal, postDateFormat). Refer to the documentation on Date.toLocaleDateString() here: developer.mozilla.org.',
  postDateFormat: 'This is a parameter used by Date.toLocaleDateString(), Refer to the documentation above for configuration details.',
  postDateTitle: 'This is the title set to the published date element to provide context on mouseover.',
  classes: {
    wrapper: '"o-feed-2column" or "o-feed-3column" are available in the feed stylesheet to change the Feed items layout to 2 or 3 columns. However, any additional string can be input here to add classes to to the widget wrapper. This and other classes are available for the Medium template only. If you create your own template these will not be exposed to them automatically. See the Medium template example to see how they are added.',
    header: 'Adds classes to the widget header above the post list.',
    url: 'Adds classes to to the feeds\'s url.',
    feedItem: 'Adds classes to to the feeds\'s posts.',
    title: 'Adds classes to to the title of each card.',
    link: 'Adds classes to to the link of each card.',
    thumbnail: 'Adds classes to to the thumbnail image of each card.',
    excerpt: 'Adds classes to to the excerpt of each card.',
    itemFooter: 'Adds classes to to the footer of each card with the cta and date.',
    cta: 'Adds classes to to the final call to action of each card.',
    date: 'Adds classes to to the publication date of each card.'
  },
  templates: {
    opener: 'The opening template tag or wrapper of the entire feed. Add blank string to remove these component. This is where you would insert a custom LoDash template for the feed to parse.',
    header: 'The header template that sits at the top of the posts.',
    posts: 'The posts loop including the posts template.',
    closer: 'The closing template tag or wrapper of the entire feed.'
  },
  log: 'false (default) or true. Enables logging data to the console. You will want this turned off in every case unless you are creating a template and need to see the data being passed to it.',
  unique: 'true (default) or true. When using multiple feeds some Medium articles can be duplicated between publications. If you want unique posts by title switch this to true. There is no prioritization of which post will show up.'
};

export default FeedDocs;
