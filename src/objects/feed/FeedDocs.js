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
  avatarImageRatio: 'Image source attribute width and height for the account avatar.',
  postImageRatio: 'CSS width and max-height properties for the post image.',
  postExcerptLength: 'This is the length of the excerpt.',
  postExcerptTrail: 'This is the trailing ellipsis for excerpts.',
  postCtaText: 'This is the text for each post\'s call to action.',
  postDateLocal: 'The date formatting uses Date.toLocaleDateString(). The options in postDateLocal and postDateFormat are passed as Date.toLocaleDateString(postDateLocal, postDateFormat). Refer to the documentation on Date.toLocaleDateString() here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString',
  postDateFormat: 'This is a parameter used by Date.toLocaleDateString(), Refer to the documentation above for configuration details.',
  postDateTitle: 'This is the title set to the published date element to provide context on mouseover.',
  classes: {
    wrapper: 'Adds class to to the wrapper for the whole widget.',
    header: 'Adds class to the widget header above the post list.',
    url: 'Adds class to to the feeds\'s url.',
    feedItem: 'Adds class to to the feeds\'s posts.',
    title: 'Adds class to to the title of each card.',
    link: 'Adds class to to the link of each card.',
    thumbnail: 'Adds class to to the thumbnail image of each card.',
    excerpt: 'Adds class to to the excerpt of each card.',
    itemFooter: 'Adds class to to the footer of each card with the cta and date.',
    cta: 'Adds class to to the final call to action of each card.',
    date: 'Adds class to to the publication date of each card.'
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
