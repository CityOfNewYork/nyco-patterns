/**
 * Dependencies
 */

const defaultConfig = require('tailwindcss/defaultConfig')();
const variables = require('./variables.js');

/**
 * Config
 */

const tailwind = {
  fonts: variables.fonts,
  fontWeights: variables.fonts,
  textSizes: variables.fonts,
  leading: variables.fonts,
  colors: variables.colors,
  textColors: variables.colors,
  backgroundColors: variables.colors,
  borderWidths: variables.borderWidths,
  borderColors: global.Object.assign({ default: '' }, variables.colors),
  margin: variables.margin,
  padding: variables.padding,
  maxWidth: {
    '1/2': '50%',
    'full': '100%'
  },
  screens: {
    'screen-desktop': `${variables.screens['screen-desktop']}px`,
    'screen-tablet': `${variables.screens['screen-tablet']}px`,
    'screen-mobile': `${variables.screens['screen-mobile']}px`,
    'screen-sm-mobile': `${variables.screens['screen-desktop']}px`
  },
  modules: {
    textColors: ['hover'],
    backgroundColors: ['hover', 'focus'],
    borderColors: ['hover', 'focus'],
    borderStyle: ['responsive', 'hover', 'focus'],
    borderWidths: ['responsive', 'focus'],
    display: ['responsive'],
    flexbox: ['responsive'],
    margin: ['responsive'],
    padding: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    overflow: [],
    whitespace: [],
    width: ['responsive']
  },
  options: {
    prefix: '',
    important: true,
    separator: ':'
  }
};

module.exports = tailwind;
