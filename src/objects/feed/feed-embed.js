import Feed from './feed';
import FeedDocs from './feed-docs';
import LZW from '@nycopportunity/pttrn-scripts/src/lzw/lzw';

class FeedEmbed {
  constructor() {
    var production = {
      module: 'https://cdn.jsdelivr.net/gh/cityofnewyork/nyco-patterns@v' + VERSION + '/dist/objects/feed/feed.js',
      styles: 'https://cdn.jsdelivr.net/gh/cityofnewyork/nyco-patterns@v' + VERSION + '/dist/objects/feed/feed.css'
    };

    var demonstration = {
      module: 'objects/feed/feed.js',
      styles: 'objects/feed/feed.css'
    };

    var configPrefix = '#NYCO';

    // Get saved configuration if it is available
    var hash = decodeConfig(document.location.hash);

    // Configuration for the page feed
    var config = (hash) ? hash : {
      title: 'News from NYC Opportunity',
      profileImg: 'https://cdn-images-1.medium.com/fit/c/100/100/1*CqAMY6M5PeJ5nBOc8MKcvA.png',
      selector: '[data-js="feed"]',
      feed: [
        'https://medium.com/feed/nyc-opportunity/',
        'https://civicservicedesign.com/feed/'
      ]
    };

    /**
     * A self-selecting function for event listenters
     */
    function selectSelf() {
      this.select();
    }

    /**
     * Creates a self executing embeddable script using a custom configration
     * and source. Mirrors the self executing function below.
     * @param  {object}  config The configuration that will be passed to the function script
     * @param  {object}  source A dictionary of scripts to load, requires the cdn source of this script
     * @param  {boolean} focus  Wether or not to focus on the text field
     */
    function createEmbed(config, source, focus) {
      focus = (typeof focus === 'undefined') ? false : focus;

      var clipboard = [
        "<script type='text/javascript'>",
          "(function(Module,config,source){",
            "var ss=source;var c=0;",
            "for(var k in ss){",
              "var s=ss[k];",
              "if (k==='styles'){",
                "ss[k]=document.createElement('link');",
                "ss[k].setAttribute('rel','stylesheet');",
                "ss[k].setAttribute('type','text/css');",
                "ss[k].setAttribute('media','screen');",
                "ss[k].setAttribute('href',s);",
              "}else{",
                "ss[k]=document.createElement('script');",
                "ss[k].setAttribute('type','text/javascript');",
                "ss[k].setAttribute('src',s);",
              "}",
              "document.head.appendChild(ss[k]);",
              "ss[k].onload=function(){",
                "c++;if(c===Object.keys(ss).length)init();",
              "}",
            "}",
            "function init(){",
              "new Module(config);",
            "}",
          "})({{ Module }},{{ config }},{{ source }});",
        "<\/script>"
      ];

      if (config.selector.indexOf('#') >= 0)
        clipboard.unshift(
          "<div id='" + config.selector.replace('#','') + "'></div>"
        );

      var embed = document.getElementById('js-embed');

      if (embed) {
        embed.addEventListener('focus', selectSelf);
        embed.addEventListener('click', selectSelf);
        embed.value = clipboard.join('')
          .replace('{{ Module }}', 'Feed')
          .replace('{{ config }}', JSON.stringify(config))
          .replace('{{ source }}', JSON.stringify(source));

        if (focus) {
          window.location.hash = 'your-feed';
          embed.focus();
        }
      }
    } createEmbed(config, production);

    /**
     * Creates a shareable url for saving the configuration
     * @param  {object}  config The configuration that will be encoded to share
     * @param  {boolean} focus  Wether or not to focus on the text field
     */
    function createShare(config, focus) {
      focus = (typeof focus === 'undefined') ? false : focus;

      var lzw = encodeURI(LZW.encode(btoa(JSON.stringify(config))));
      var share = document.getElementById('js-share');
      var hash = configPrefix + lzw;

      window.location.hash = hash;

      if (share) {
        share.addEventListener('focus', selectSelf);
        share.addEventListener('click', selectSelf);
        share.value = share.dataset.jsShareBase +
          window.location.pathname.replace('/nyco-patterns', '') + hash;

        if (focus) {
          window.location.hash = 'your-feed';
          share.focus();
        }
      }
    } createShare(config);

    /**
     * [decodeConfig description]
     * @param  {string]} hash The window.location.hash
     * @return {object}       JSON Object if successfully decoded, false if not
     */
    function decodeConfig(hash) {
      try {
        if (hash && hash.indexOf(configPrefix) > -1) {
          hash = hash.replace(configPrefix, '');
          return JSON.parse(atob(LZW.decode(decodeURI(hash))));
        }

        return false;
      } catch(error) {
        // eslint-disable-next-line no-console
        console.warn(error);

        return false;
      }
    }

    /**
     * This is the initialization for the documentation functionality
     * @param  {object} feed Our demonstration feed.
     */
    function init(feed) {
      var docs = new FeedDocs();

      // Documentation app
      if (document.getElementById('js-configuration'))
        new Vue({
          el: '#js-configuration',
          data: {
            config: feed.default,
            docs: docs.default
          },
        });

      if (document.getElementById('js-templates'))
        new Vue({
          el: '#js-templates',
          data: {
            templates: feed.templates
          },
        });

      // Custom Feed app
      if (document.getElementById('js-controls'))
        new Vue({
          el: '#js-controls',
          data: {
            config: config,
            configDefault: feed.default,
            docs: docs.default
          },
          methods: {
            setObjValue: function(name, key) {
              if (this.config[name])
                return this.config[name][key];
            },
            setObj: function(name, key, value) {
              if (!this.config[name])
                this.config[name] = {}

              this.config[name][key] = value;
            },
            render: function(event) {
              event.preventDefault();
              // this.config.feed = this.config.feed.split(',');
              new Feed(this.config);

              createEmbed(this.config, production, true);
              createShare(this.config, false);
            }
          }
        });
    }

    // Self initiating function for the Feed script. This should mostly mirror
    // the clipboard string in the createEmbed function above.
    (function(Module, config, source, callback) {
      var ss = source; var c = 0;
      for (var k in ss) {
        var s = ss[k];
        if (k === 'styles') {
          ss[k] = document.createElement('link');
          ss[k].setAttribute('rel', 'stylesheet');
          ss[k].setAttribute('type', 'text/css');
          ss[k].setAttribute('media', 'screen');
          ss[k].setAttribute('href', s);
        } else {
          ss[k] = document.createElement('script');
          ss[k].setAttribute('type', 'text/javascript');
          ss[k].setAttribute('src', s);
        }
        document.head.appendChild(ss[k]);
        ss[k].onload = function() {
          c++; if (c === Object.keys(ss).length) init();
        }
      };
      function init() {
        var f = new Module(config);
        if (callback) callback(f);
      };
    })(Feed, config, demonstration, init);
  }
}

export default FeedEmbed;