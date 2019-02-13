/**
 * Config
 */

const package = require('../package.json');

/**
 * Config
 */

const variables = {
  cdn: '"https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist"',
  fonts: {
    'system': [
      '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
      'Oxygen-Sans', 'Ubuntu', 'Cantarell', '"Helvetica Neue"', 'sans-serif'
    ],
    'nycgov': [
      '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'
    ],
    'default-sans': [
      '"Noto Sans"', 'sans-serif'
    ],
    'default-serif': [
      '"Noto Serif"', 'serif'
    ],

  },
  fontWeights: {
    'normal': 'normal',
    'bold': 'bold',
    'jumbo': 'normal',
    'h1': 'bold',
    'h2': 'normal',
    'h3': 'normal',
    'h4': 'bold',
    'h5': 'bold',
    'h6': 'bold',
    'html': 'normal',
    'small': 'normal',
    'blockquote': 'normal'
  },
  textSizes: {
    'jumbo': '3em',
    'h1': '2.488em',
    'h2': '2.074em',
    'h3': '1.728em',
    'h4': '1.44em',
    'h5': '1.2em',
    'h6': '1em',
    'html': '1em',
    'small': '0.833em',
    'blockquote': '2.074em'
  },
  leading: {
    'jumbo': '1.2',
    'h1': '1.2',
    'h2': '1.2',
    'h3': '1.2',
    'h4': '1.2',
    'h5': '1.2',
    'h6': '1.2',
    'html': '1.5',
    'small': 'normal',
    'blockquote': 'normal'
  },
  colors: {
    'primary-navy': '#2F334F',
    'primary-navy-70t': '#6E7085',
    'primary-navy-50t': '#9698A7',
    'primary-navy-30t': '#C0C2CA',
    'primary-blue': '#3155A6',
    'primary-blue-70t': '#6C88C1',
    'primary-blue-50t': '#96ABD2',
    'primary-blue-30t': '#C0CCE3',
    'primary-red': '#F2695D',
    'primary-red-70t': '#F6958D',
    'primary-red-50t': '#F8B2AD',
    'primary-red-30t': '#FBD1CE',
    'secondary-grey': '#ACAEB9',
    'secondary-grey-70t': '#C4C6CD',
    'secondary-grey-50t': '#D5D6DC',
    'secondary-grey-30t': '#E8E7E9',
    'secondary-white': '#F3F3F3',
    'secondary-white-70t': '#F6F6F6',
    'secondary-white-50t': '#F9F9FA',
    'secondary-white-30t': '#FBFCFC',
    'secondary-orange': '#F9A137',
    'secondary-orange-70t': '#FFA133',
    'secondary-orange-50t': '#FED09A',
    'secondary-orange-30t': '#FFE3C2',
    'secondary-pink': '#EBBCD8',
    'secondary-pink-70t': '#F2D0E3',
    'secondary-pink-50t': '#F7DDEB',
    'secondary-pink-30t': '#FDEBF3',
    'base-black': '#000000',
    'base-white': '#FFFFFF'
  },
  colorCombinations: {
    'light-background': {
      'color': 'base-black',
      'headings': 'primary-navy',
      'hyperlinks': 'primary-blue',
      'visited': 'primary-blue',
      'hover': 'primary-navy',
      'background-color': 'base-white'
    },
    'mid-background': {
      'color': 'base-black',
      'headings': 'primary-navy',
      'hyperlinks': 'primary-blue',
      'visited': 'primary-blue',
      'hover': 'primary-navy',
      'background-color': 'secondary-white'
    },
    'dark-background': {
      'color': 'base-white',
      'font-smooth': true,
      'headings': 'base-white',
      'hyperlinks': 'base-white',
      'visited': 'base-white',
      'hover': 'base-white',
      'background-color': 'primary-navy'
    },
    'primary-button': {
      'font-weight': 'bold',
      'color': 'base-white',
      'font-smooth': true,
      'background-color': 'primary-blue'
    },
    'secondary-button': {
      'font-weight': 'bold',
      'color': 'base-white',
      'font-smooth': true,
      'background-color': 'primary-red'
    }
  },
  icons: {
    'icon-logo': '136px 136px',
    'icon-logo-nyc': '48px 16px'
  },
  animate: {
    'ease-in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'ease-out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'animate-scss-speed': '0.75s',
    'animate-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'
  },
  borderWidths: {
    0: '0',
    'default': '1px',
    2: '2px',
    4: '4px',
    8: '8px'
  },
  grid: '8px',
  padding: {
    0: '0',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px'
  },
  margin: {
    '-2': '-16px',
    '-1': '-8px',
    0: '0',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    auto: 'auto'
  },
  screens: {
    'screen-desktop': 960,
    'screen-mobile': 480,
    'screen-tablet': 768,
    'screen-sm-mobile': 400
  },
  buttons: {
    'radius': '500px'
  }
};

module.exports = variables;