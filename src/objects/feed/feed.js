'use strict';

/**
 * Dependencies
 */
import 'core-js/features/promise';

import _template from 'lodash-es/template';
import _forEach from 'lodash-es/forEach';
import _merge from 'lodash-es/merge';
import _values from 'lodash-es/values';
import _orderBy from 'lodash-es/orderBy';
import _uniqBy from 'lodash-es/uniqBy';

import Spinner from '@nycopportunity/pttrn-scripts/src/spinner/spinner';

/**
 * Pattern Class
 */
class Feed {
  constructor(config) {
    this.default = Feed.default;

    this._settings = _merge({}, Feed.default, config);

    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    // Create a loading animation
    let el = document.querySelector(this._settings.selector);
    let spinner = new Spinner();
    let loading = document.createElement('div');

    loading.setAttribute('class', 'o-feed__spinner');
    loading.appendChild(spinner);
    el.appendChild(loading);

    let data = [];
    let feed = this._settings.feed;
    let config = {
      rssToJson: this._settings.rssToJson,
      rssUrl: (Array.isArray(feed)) ? feed : [feed]
    };

    // Go through each feed
    _forEach(config.rssUrl, (url, index) => {
      // Make the request
      this._request(config, url).then((response) => {
          let json = JSON.parse(response);

          /**
           * If using the free Rss2Json converter
           * @source https://rss2json.com
           * else if using the NYCO self hosted Rss2Json converter
           * @source https://github.com/CityOfNewYork/nyco-rss-2-json
           */
          if (config.rssToJson === Feed.rssToJson)
            json = json; // do nothing
          else if (config.rssToJson.includes('convertRssIntoJson?rssFeed='))
            json = Feed.nycoRssToJson(json);
          else
            // eslint-disable-next-line no-console
            console.warn('NYCO Feed Object: This RSS to JSON converter is not recognized.');

          // Process the data
          data.push(this._process(json, this._settings));

          // When all feeds have been requested, merge the data and compile
          if (data.length === config.rssUrl.length) {
            let compiled = this._render(
              this._merge(data, this._settings),
              this._settings
            );

            if (el)
              el.innerHTML = compiled;
            else
              // eslint-disable-next-line no-console
              console.warn(`NYCO Feed Object: Couldn't find the element "${this._settings.selector}"`);
          }
      });
    });

    return this;
  }

  /**
   * Create an XHR request for the feed data
   *
   * @param  {object} config The request data
   * @param  {string} url    The request url
   *
   * @return {Promise}       Resolves when the response is ready, rejects when
   *                         the operation times out or there is an error.
   */
  _request(config, url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function(event) {
        let _xhr = event.target;
        if (_xhr.readyState === 4)
          if (_xhr.status >= 200 && _xhr.status < 400)
            resolve(_xhr.response);
          else
            reject(new Error(_xhr.status));
      };

      xhr.ontimeout = function() {
        reject(new Error('The Feed request timed out'));
      };

      xhr.open('GET', `${config.rssToJson}${url}`, true);
      xhr.send();
      xhr = null;
    });
  }

  /**
   * Pass data to the appropriate processing function based on type
   *
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   *
   * @return {object}          The processed data
   */
  _process(data, settings) {
    return Feed.process[settings.type](data, settings);
  }

  /**
   * Pass data to the appropriate merge function based on type
   *
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   *
   * @return {object}          The merged feed data
   */
  _merge(data, settings) {
    return Feed.merge[settings.type](data, settings);
  }

  /**
   * Combine template components, pass data, and return compiled temlate
   *
   * @param  {object} data     The requested feed data to pass
   * @param  {object} settings The application settings
   *
   * @return {string}          The complied html string
   */
  _render(data, settings) {
    data.settings = settings;

    // eslint-disable-next-line no-console
    if (settings.log) console.dir(data);

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
Feed.rssToJson = 'https://api.rss2json.com/v1/api.json?rss_url=';

/**
 * The template for the widget.
 * @type {String}
 */
Feed.templates = {
  medium: {
    opener: [
      '<section class="o-feed <%- settings.classes.wrapper %>" style="',
        '<% if (settings.fontSize) { %>font-size: <%- settings.fontSize %>;<% } %>',
        '<% if (settings.postBorderColor) { %>border-color: <%- settings.postBorderColor %>;<% } %>',
      '">'
    ],
    header: [
      '<header class="o-feed__header <%- settings.classes.header %>">',
        '<div class="o-feed__avatar <%- settings.classes.avatar %>">',
          '<img src="',
                '<% if (settings.profileImg !== "") { %>',
                  '<%- settings.profileImg %>',
                '<% } else { %>',
                  '<%- feed.profileImg %>',
                '<% } %>" ',
               'width="<%- settings.ratioProfile[0] %>" ',
               'height="<%- settings.ratioProfile[1] %>">',
        '</div>',
        '<a class="o-feed__url <%- settings.classes.avatar %>" ',
          'href="<% if (settings.titleUrl !== "") { %>',
            '<%- settings.titleUrl %>',
          '<% } else { %>',
            '<%- feed.url %>',
          '<% } %>" ',
           'target="_blank" rel="noopener noreferrer nofollow">',
          '<% if (settings.title !== "") { %>',
            '<%- settings.title %>',
          '<% } else { %>',
            '<%- feed.title %>',
          '<% } %>',
        '</a>',
      '</header>'
    ],
    posts: [
      '<div class="o-feed__items" style="',
        'border-color: <%- settings.postBorderColor %>;',
      '">',
        '<% _each(items, function(post) { %>',
          '<div class="c-feed-item <%- settings.classes.feedItem %>">',
            '<h4 class="c-feed-item__title <%- settings.classes.title %>">',
              '<a class="c-feed-item__link <%- settings.classes.link %>"',
                 'href="<%- post.guid %>"',
                 'target="_blank"',
                 'rel="noopener noreferrer nofollow">',
                '<%- post.title %>',
              '</a>',
            '</h4>',
            '<p class="c-feed-item__date <%- settings.classes.date %>" ',
                  'title="<%- settings.postDateTitle %>">',
              '<small><em><%- post.date %></em></small>',
            '</p>',
            '<div class="c-feed-item__thumbnail <%- settings.classes.thumbnail %>"',
                 'style="',
                    'background-image: url(<%- post.thumbnail %>);',
                    'height: <%- settings.postImgHeight %>;"',
                 'aria-hidden="true">',
              '<img style="display: none;" src="<%- post.thumbnail %>" alt="<%- post.title %>">',
            '</div>',
            '<p class="c-feed-item__excerpt <%- settings.classes.excerpt %>">',
              '<%- post.excerpt %><%- settings.postExcerptTrail %>',
            '</p>',
            '<div class="c-feed-item__footer <%- settings.classes.itemFooter %>">',
              '<a class="c-feed-item__cta <%- settings.classes.cta %>" ',
                 'href="<%- post.guid %>" ',
                 'target="_blank" ',
                 'rel="noopener noreferrer nofollow">',
                '<%- settings.postCtaText %>',
              '</a>',
            '</div>',
          '</div>',
        '<% }); %>',
      '</div>'
    ],
    closer: [
      '</section>'
    ]
  }
};

/**
 * Data map for the NYCO RSS to JSON coverter.
 *
 * @param   {Object}  json  A json object containing the feed
 *
 * @return  {Object}        A json object that matches the template format
 */
Feed.nycoRssToJson = function(json) {
  let feed = json[0];

  return {
    'status': 'ok',
    'feed': {
      'url': feed['atom:link'][0]['$']['href'],
      'title': feed['title'],
      'link': feed['link'],
      'author': '',
      'description': feed['description'],
      'image': feed['image'][0]['url']
    },
    'items': feed['item'].map(i => {
      // Get and parse the date
      let date = new Date(Date.parse(i['pubDate']))
        .toISOString().replace('.000Z', '');

      // Get the GUID, they are inconsistently nested
      let guid = (Array.isArray(i['guid']))
        ? i['guid'][0]['_'] : i['guid']['_'];

      // Get the first image of the content for the thumbnail. It
      // seems the medium feed doesn't return this by default
      // but rss2json.com provides it (but why!?)
      let regex =  /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
      let thumbnail = regex.exec(i['content:encoded'])[1];

      return {
        'title': i['title'],
        'pubDate': date,
        'link': i['link'],
        'guid': guid,
        'author': i['dc:creator'],
        'thumbnail': thumbnail,
        'description': i['content:encoded'],
        'content': i['content:encoded'],
        'enclosure': {},
        'categories': i['category']
      };
    })
  };
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

      // Replace break tags with spaces
      excerpt = excerpt.replace('<br>', ' ');

      // Remove all tags
      excerpt = excerpt.replace(/<(.|\n)*?>/g, '');

      // Trim the excerpt
      excerpt = excerpt.substr(0, length);
      excerpt = excerpt.substr(0,
        Math.min(excerpt.length, excerpt.lastIndexOf(' '))
      );

      post.excerpt = excerpt;

      // Format the date
      date = new Date(Date.parse(post.pubDate.replace(' ', 'T')))
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
  medium: function(data, settings) {
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
    if (settings.unique)
      items = _uniqBy(items, (item) => item.guid);

    merged.items = _orderBy(items, 'pubDate', 'desc');

    return merged;
  }
}

/**
 * See https://rss2json.com/docs for details on default parameters
 * @type {Object}
 */
Feed.default = {
  feed: '',
  rssToJson: Feed.rssToJson,
  selector: '[data-js="feed"]',
  type: 'medium',
  title: '',
  titleUrl: '',
  profileImg: '',
  fontSize: '',
  ratioProfile: ['50', '50'],
  postBorderColor: 'lightsteelblue',
  postImgHeight: '168px',
  postExcerptLength: 120,
  postExcerptTrail: '…',
  postCtaText: 'Read the full post',
  postDateLocal: 'en-US',
  postDateFormat: {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  postDateTitle: 'Published Date',
  classes: {
    wrapper: '',
    header: '',
    url: '',
    feedItem: '',
    title: '',
    link: '',
    thumbnail: '',
    excerpt: '',
    itemFooter: '',
    cta: '',
    date: ''
  },
  templates: {
    opener: Feed.templates.medium.opener.join(''),
    header: Feed.templates.medium.header.join(''),
    posts: Feed.templates.medium.posts.join(''),
    closer: Feed.templates.medium.closer.join('')
  },
  log: false,
  unique: true
};

export default Feed;
