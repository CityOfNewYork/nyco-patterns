

var production = {
  polyfill: 'https://cdn.polyfill.io/v2/polyfill.js?features=Promise&flags=gated',
  module: 'https://cdn.rawgit.com/CityOfNewYork/nyco-patterns/v1.0.2/dist/objects/feed/Feed.js',
  styles: 'https://cdn.rawgit.com/CityOfNewYork/nyco-patterns/v1.0.2/dist/objects/feed/feed.css'
};

var demonstration = {
  polyfill: production.polyfill,
  module: 'objects/feed/Feed.js',
  styles: 'objects/feed/feed.css'
};

// Configuration for the page feed
var config = {
  title: 'News from NYC Opportunity',
  profileImg: 'https://cdn-images-1.medium.com/fit/c/100/100/1*CqAMY6M5PeJ5nBOc8MKcvA.png',
  selector: '#js-feed',
  feed: [
    'https://medium.com/feed/nyc-opportunity/',
    'https://civicservicedesign.com/feed/'
  ]
};

/**
 * A self-selecting function for event listenters
 */
function selectEmbed() {
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
      "(function(config,source,callback){",
        "var ss=source;var c=0;",
        "for(k in ss){",
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
          "var f=new Feed(config).init();",
          "if(callback)callback(f);",
        "}",
      "})({{ config }},{{ source }});",
    "<\/script>"
  ];
  if (config.selector.indexOf('#') >= 0) {
    clipboard.unshift(
      "<div id='" + config.selector.replace('#','') + "'></div>"
    );
  }
  var embed = document.getElementById('js-embed');
  if (embed) {
    embed.addEventListener('focus', selectEmbed);
    embed.addEventListener('click', selectEmbed);
    embed.value = clipboard.join('')
      .replace('{{ config }}', JSON.stringify(config))
      .replace('{{ source }}', JSON.stringify(source));
    if (focus) {
      window.location.hash = 'your-feed';
      embed.focus();
    }
  }
} createEmbed(config, production);

/**
 * This is the initialization for the documentation functionality
 * @param  {object} feed Our demonstration feed.
 */
function init(feed) {
  var docs = new FeedDocs();
  // Documentation app
  if (document.getElementById('js-configuration')) {
    new Vue({
      el: '#js-configuration',
      data: {
        config: feed.default,
        docs: docs.default
      },
    });
  }

  if (document.getElementById('js-templates')) {
    new Vue({
      el: '#js-templates',
      data: {
        templates: feed.templates
      },
    });
  }

  // Custom Feed app
  if (document.getElementById('js-controls')) {
    new Vue({
      el: '#js-controls',
      data: {
        config: Object.assign(feed.default, config),
        docs: docs.default
      },
      methods: {
        render: function(event) {
          event.preventDefault();
          new Feed(Object.assign(config, this.config)).init();
          createEmbed(this.config, production, true);
        }
      }
    });
  }
}

// Self initiating function for the Feed script. This should mostly mirror
// the clipboard string in the createEmbed function above.
(function(config, source, callback) {
  var ss = source; var c = 0;
  for (k in ss) {
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
    var f = new Feed(config).init();
    if (callback) callback(f);
  };
})(config, demonstration, init);
