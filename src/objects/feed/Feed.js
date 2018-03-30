'use strict';

/**
 * Dependencies
 */
import _template from 'lodash-es/template';
import _forEach from 'lodash-es/forEach';
import _merge from 'lodash-es/merge';
import _values from 'lodash-es/values';
import _orderBy from 'lodash-es/orderBy';
import _uniqBy from 'lodash-es/uniqBy';
// import Promise from 'promise-polyfill/src/';

/**
 *
 */
class Feed {
  constructor(config) {
    this.default = Feed.default;
    this.settings = _merge({}, Feed.default, config);
  }

  /**
   * Initializes the module
   */
  init() {
    let data = [];
    let feed = this.settings.feed;
    let config = {
      rssToJson: Feed.rssToJson,
      rssUrl: (Array.isArray(feed)) ? feed : [feed]
    };

    // Go through each feed
    _forEach(config.rssUrl, (url, index) => {
      // Make the request
      this._request(config, url).then((response) => {
          // Process the data
          data.push(this._process(JSON.parse(response), this.settings));
          // When all feeds have been requested, merge the data and compile
          if (data.length === config.rssUrl.length) {
            this._merge(data, this.settings);

            let compiled = this._render(
              this._merge(data, this.settings),
              this.settings
            );

            let el = document.querySelector(this.settings.selector);
            if (el) el.innerHTML = compiled;
          }
      });
    });

    return this;
  }

  /**
   * Create an XHR request for the feed data
   * @param  {object} config The request data
   * @param  {string} url    The request url
   * @return {Promise}       Resolves when the response is ready, rejects when
   *                         the operation times out or there is an error.
   */
  _request(config, url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(event) {
        let _xhr = event.target;
        if (_xhr.readyState === 4) {
          if (_xhr.status >= 200 && _xhr.status < 400) {
            resolve(_xhr.response);
          } else {
            reject(new Error(_xhr.status));
          }
        }
      };
      xhr.ontimeout = function() {
        reject(new Error('The Feed request timed out'));
      };
      xhr.open('GET', `${config.rssToJson}?rss_url=${url}`, true);
      xhr.send();
      xhr = null;
    });
  }

  /**
   * Pass data to the appropriate processing function based on type
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   * @return {object}          The processed data
   */
  _process(data, settings) {
    return Feed.process[settings.type](data, settings);
  }

  /**
   * Pass data to the appropriate merge function based on type
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   * @return {object}          The merged feed data
   */
  _merge(data, settings) {
    return Feed.merge[settings.type](data);
  }

  /**
   * Combine template components, pass data, and return compiled temlate
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   * @return {string}          The complied html string
   */
  _render(data, settings) {
    data.settings = settings;

    if (settings.log)
      console.dir(data);

    let template = _values(settings.templates).join('');
    let compiled = _template(
      template,
      {
        'imports': {
          '_each': _forEach
        }
      }
    );
    return compiled(data);
  }
}

/**
 * An open RSS to JSON api, see https://rss2json.com
 * @type {String}
 */
Feed.rssToJson = 'https://api.rss2json.com/v1/api.json';

/**
 * The template for the widget.
 * @type {String}
 */
Feed.templates = {
  medium: {
    opener:
      '<section class="o-feed <%- settings.classes.wrapper %>">',
    header:
      '<header class="o-feed__header <%- settings.classes.header %>">\
        <div class="o-feed__avatar <%- settings.classes.avatar %>">\
          <img src="<%- feed.image %>" \
               width="<%- settings.avatarImageRatio[0] %>" \
               height="<%- settings.avatarImageRatio[1] %>">\
        </div>\
        <a class="o-feed__url <%- settings.classes.avatar %>"\
           href="<%- feed.url %>" target="_blank" rel="noopener noreferrer nofollow">\
          <%- feed.title %>\
        </a>\
      </header>',
    posts:
      '<% _each(items, function(post) { %>\
        <div class="c-feed-item <%- settings.classes.card %>">\
          <h4 class="c-feed-item__title <%- settings.classes.title %>">\
            <a class="c-feed-item__link <%- settings.classes.link %>"\
               href="<%- post.guid %>"\
               target="_blank"\
               rel="noopener noreferrer nofollow">\
              <%- post.title %>\
            </a>\
          </h4>\
          <div class="c-feed-item__thumbnail <%- settings.classes.thumbnail %>">\
            <img style="width: <%- settings.postImageRatio[0] %>;max-height: <%- settings.postImageRatio[1] %>;" \
                 src="<%- post.thumbnail %>">\
          </div>\
          <p class="c-feed-item__excerpt <%- settings.classes.excerpt %>">\
            <%- post.excerpt %><%- settings.postExcerptTrail %>\
          </p>\
          <div class="c-feed-item__footer <%- settings.classes.cardFooter %>">\
            <a class="c-feed-item__cta <%- settings.classes.cta %>" \
               href="<%- post.guid %>" \
               target="_blank" \
               rel="noopener noreferrer nofollow">\
              <%- settings.postCtaText %>\
            </a>\
            <span class="c-feed-item__date <%- settings.classes.date %>" \
                  title="<%- settings.postDateTitle %>">\
              <%- post.date %>\
            </span>\
          </div>\
        </div>\
      <% }); %>',
    closer:
      '</section>'
  }
};

/**
 * Functions for processing the data based on the feed type.
 * @type {Object}
 */
Feed.process = {
  medium: function(data, settings) {
    let length = settings.postExcerptLength;

    _forEach(data.items, function(post, index) {
      let excerpt = '';
      let date = '';

      // Remove figures first
      excerpt = post.description
        .replace(/<figure.*>.*?<\/figure>/g, '');

      // Remove all tags
      excerpt = excerpt.replace(/<(.|\n)*?>/g, '');

      // Trim the excerpt
      excerpt = excerpt.substr(0, length);
      excerpt = excerpt.substr(0,
        Math.min(excerpt.length, excerpt.lastIndexOf(' '))
      );

      post.excerpt = excerpt;

      // Format the date
      date = new Date(post.pubDate)
        .toLocaleDateString(settings.postDateLocal, settings.postDateFormat);

      post.date = date;

      return post;
    });

    return data;
  }
}

/**
 * Functions for merging the data feeds together, based on the feed type.
 * @type {Object}
 */
Feed.merge = {
  medium: function(data) {
    let merged = {};
    let items = [];

    // Combine the post items
    data.forEach((feed) => {
      items = items.concat(feed.items);
    });

    // Merge the data, this will override values, it probably won't be
    // particularly useful for feeds that are the same, but potentially
    // different feed types could use this and combine unique data
    data.forEach((feed) => {
      merged = _merge(merged, feed);
    });

    // Get unique posts
    // items = _uniqBy(items, (item) => item.guid);

    merged.items = _orderBy(items, 'pubDate', 'desc');

    return merged;
  }
}

/**
 * See https://rss2json.com/docs for details on default parameters
 * @type {Object}
 */
Feed.default = {
  type: 'medium', // The feed type. Currently, only Medium feeds are supported
  avatarImageRatio: ['50', '50'], // Image source attribute width and height for the account avatar
  postImageRatio: ['auto', '200px'], // CSS width and max-height properties for the post image
  postExcerptLength: 120, // This is the length of the excerpt
  postExcerptTrail: '…', // This is the trailing ellipsis for excerpts
  postCtaText: 'Click here to read the full article', // This is the text for each post's call to action
  // The date formatting uses Date.toLocaleDateString(). See the @url below for for documentation on formating the date. The options below are passed as Date.toLocaleDateString(postDateLocal, postDateFormat).
  // @url https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
  postDateLocal: 'en-US', // This is a parameter used by Date.toLocaleDateString(), see the link above for configuration details
  postDateFormat: { // This is a parameter used by Date.toLocaleDateString(), see the link above for configuration details
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  postDateTitle: 'Published Date', // This is the title set to the published date element to provide context on mouseover
  classes: { // These are CSS classes that can be added to each element
    wrapper: '', // The wrapper for the whole widget
    header: '', // The widget header
    url: '', // The widget url
    card: '', // The repeating class for the widget's cards
    title: '', // The title of each card
    link: '', // The link of each card
    thumbnail: '', // The thumbnail image of each card
    excerpt: '', // The excerpt of each card
    cardFooter: '', // The footer of each card with the cta and date
    cta: '', // The final call to action of each card
    date: '' // The publication date of each card
  },
  templates: { // The template of the feed, the script comes with a template for Medium feeds only.
    opener: Feed.templates.medium.opener, // The opening template tag or wrapper of the entire feed.
    header: Feed.templates.medium.header, // The header template that sits at the top of the posts.
    posts: Feed.templates.medium.posts, // The posts loop including the posts template.
    closer: Feed.templates.medium.closer // The closing template tag or wrapper of the entire feed.
  },
  log: false // Logs data to the console. You will want this turned off in most cases but it allows you to see what data is being passed to the template
};

export default Feed;
