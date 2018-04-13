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
  feed: 'Required. This may either be one RSS feed or an array of feeds. Arrays of feeds will be combined and posts will be ordered by date. Currently, this only works with Medium RSS feeds.',
  selector: 'The DOM element selector for your feed. The inner html of this element will be replaced with the feed.',
  type: 'The feed type. Currently, only Medium feeds are supported so this shouldn\'t change.',
  title: 'The title of the feed that appears in the header. By default this uses the feed\'s title. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed title that was loaded.',
  profileImg: 'The url to the profile image. By default this uses the feed\'s profile image. However, if using displaying multiple fields this should be set.  Otherwise, it will use the last feed image that was loaded.',
  fontSize: 'Set this to a smaller percentage (say, 85%) to make the feed appear more compact in smaller columns',
  ratioProfile: 'Image source attribute width and height for the account avatar.',
  postBorderColor: 'Set the color of the borders in the feed. All of the colors in the feed will inherit the style of the page except for the borders between cards. This may be any standard CSS color variable.',
  postImgHeight: 'CSS height of the post image. The width of the image defaults to 100% the width of the post.',
  postExcerptLength: 'This is the length of the excerpt.',
  postExcerptTrail: 'This is the trailing ellipsis for excerpts.',
  postCtaText: 'This is the text for each post\'s call to action.',
  postDateLocal: 'The date formatting uses Date.toLocaleDateString(). The options in postDateLocal and postDateFormat are passed as Date.toLocaleDateString(postDateLocal, postDateFormat). Refer to the documentation on Date.toLocaleDateString() here: developer.mozilla.org.',
  postDateFormat: 'This is a parameter used by Date.toLocaleDateString(), Refer to the documentation above for configuration details.',
  postDateTitle: 'This is the title set to the published date element to provide context on mouseover.',
  classes: {
    wrapper: 'Adds classes to to the wrapper for the whole widget. There are two classes that are available to change the Feed items layout to 2 or 3 columns: "o-feed--2-column" or "o-feed--3-column".',
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
    opener: 'The opening template tag or wrapper of the entire feed.',
    header: 'The header template that sits at the top of the posts.',
    posts: 'The posts loop including the posts template.',
    closer: 'The closing template tag or wrapper of the entire feed.'
  },
  log: 'Logs data to the console. You will want this turned off every case unless you are creating a template and need to see the data being passed to it.'
};

export default FeedDocs;
