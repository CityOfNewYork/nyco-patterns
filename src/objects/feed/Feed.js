'use strict';

/**
 * Dependencies
 */
import _template from 'lodash-es/template';
import _forEach from 'lodash-es/forEach';
import _merge from 'lodash-es/merge';

/**
 *
 */
class Feed {
  constructor(config) {
    this.settings = _merge({}, Feed.default, config);
  }

  /**
   * Initializes the module
   */
  init() {
    const rssToJson = Feed.rssToJson;

    let data = {
      rss_url: this.settings.feed
    };

    this.request = new XMLHttpRequest();
    this.request.open('GET', `${rssToJson}?rss_url=${data.rss_url}`, true);

    this.request.onreadystatechange = (event) => {
      let data = this._get(event.target, this._process, this.settings);
      if (data) {
        let render = this._render(data, this.settings);
        document.querySelector(this.settings.selector).innerHTML = render;
      }
    };

    this.request.send();
    this.request = null;

    return this;
  }

  _get(request, process, config) {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        return process(JSON.parse(request.responseText), config);
        // return true;
      } else {
        // Error :(
        return false;
      }
    }
  }

  _process(data, config) {
    let length = config.postExcerptLength;

    _forEach(data.items, function(post, index) {
      let excerpt = '';
      let date = '';

      // Remove figures first
      excerpt = post.description
        .replace(/<figure.*>.*?<\/figure>/g, '');

      // Remove all tags
      excerpt = excerpt.replace(/<(.|\n)*?>/g, '');

      // Trim
      excerpt = excerpt.substr(0, length);
      excerpt = excerpt.substr(0,
        Math.min(excerpt.length, excerpt.lastIndexOf(' '))
      );

      post.excerpt = excerpt;

      // Format the date
      date = new Date(post.pubDate)
        .toLocaleDateString(config.postDateLocal, config.postDateFormat);

      post.date = date;

      return post;
    });

    data.config = config;

    if (config.log)
      console.log(data);

    return data;
  }

  _render(data, config) {
    let compiled = _template(
      config.template,
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
  medium: '\
    <section class="o-feed <%- config.classes.wrapper %>">\
      <header class="o-feed__header <%- config.classes.header %>">\
        <div class="o-feed__avatar <%- config.classes.avatar %>">\
          <img src="<%- feed.image %>" \
               width="<%- config.avatarImageRatio[0] %>" \
               height="<%- config.avatarImageRatio[1] %>">\
        </div>\
        <a class="o-feed__url <%- config.classes.avatar %>"\
           href="<%- feed.url %>" target="_blank" rel="noopener nofollow">\
          <%- feed.title %>\
        </a>\
      </header>\
      <% _each(items, function(post) { %>\
        <div class="c-feed-item <%- config.classes.card %>">\
          <h4 class="c-feed-item__title <%- config.classes.title %>">\
            <a class="c-feed-item__link <%- config.classes.link %>"\
               href="<%- post.guid %>"\
               target="_blank"\
               rel="noopener nofollow">\
              <%- post.title %>\
            </a>\
          </h4>\
          <div class="c-feed-item__thumbnail <%- config.classes.thumbnail %>">\
            <img style="width: <%- config.postImageRatio[0] %>;max-height: <%- config.postImageRatio[1] %>;" \
                 src="<%- post.thumbnail %>">\
          </div>\
          <p class="c-feed-item__excerpt <%- config.classes.excerpt %>">\
            <%- post.excerpt %><%- config.postExcerptTrail %>\
          </p>\
          <div class="c-feed-item__footer <%- config.classes.cardFooter %>">\
            <a class="c-feed-item__cta <%- config.classes.cta %>" \
               href="<%- post.guid %>" \
               target="_blank" \
               rel="noopener nofollow">\
              <%- config.postCtaText %>\
            </a>\
            <span class="c-feed-item__date <%- config.classes.date %>" \
                  title="<%- config.postDateTitle %>">\
              <%- post.date %>\
            </span>\
          </div>\
        </div>\
      <% }); %>\
    </section>'
};

/**
 * See https://rss2json.com/docs for details on default parameters
 * @type {Object}
 */
Feed.default = {
  avatarImageRatio: ['50', '50'], // Image source attribute Width and Height
  postImageRatio: ['auto', '200px'], // CSS width and max-height properties
  postExcerptLength: 120, // This is the length of the excerpt
  postExcerptTrail: '…', // This is the trailing ellipsis for excerpts
  postCtaText: 'Click here to read the full article', // This is the text for each post's call to action
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
  template: Feed.templates.medium, // The template of the feed, the script comes with a template for Medium feeds only
  log: false // Logs data to the console. You will want this turned off in most cases.
};

export default Feed;
