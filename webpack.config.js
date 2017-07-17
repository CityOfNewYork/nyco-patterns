const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = [
  /**
   * Bundle
   */
  {
    entry: {
      'o-charts.demo': './src/js/o-charts.demo.js',
    },
    resolve: {
       modules: [
        path.resolve(__dirname, 'src/js'),
        'node_modules'
      ],
      alias: {
        'd3': 'd3/index.js'
      }
    },
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './bundle/scripts/')
    }
  }
];

