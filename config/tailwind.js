/**
 * Dependencies
 */

// const defaultConfig = require('tailwindcss/defaultConfig')();
const variables = require('./variables.js');

/**
 * Config
 */

module.exports = {
  theme: {
    colors: variables.colors,
    fonts: variables.fonts,
    fontWeight: variables.fontWeight,
    fontSize: variables.fontSize,
    lineHeight: variables.lineHeight,
    textColor: variables.colors,
    backgroundColor: variables.colors,
    borderWidth: variables.borderWidth,
    borderColor: global.Object.assign({ default: '' }, variables.colors),
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
    }
  },
  variants: {
    textColor: ['hover'],
    backgroundColor: ['hover', 'focus'],
    borderColor: ['hover', 'focus'],
    borderStyle: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'focus'],
    display: ['responsive'],
    flexbox: ['responsive'],
    margin: ['responsive'],
    padding: ['responsive'],
    pointerEvents: [],
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
  },
  corePlugins: {
    container: false
  }
};
