/**
 * Config
 */

const package = require('../package.json');

/**
 * Config
 */

const variables = {
  fonts: {
    'system': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      '"Helvetica Neue"',
      'sans-serif'
    ],
    'sans-serif': [
      '"Helvetica Neue"',
      'Helvetica',
      'Arial',
      'sans-serif'
    ]
  },
  fontWeights: {
    'normal': 'normal',
    'bold': 'bold'
  },
  textSizes: {
    'base': '16px'
  },
  leading: {
    'normal': '20px'
  },
  colors: {
    'base-black': '#000000',
    'base-white': '#FFFFFF',
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
    'secondary-pink-30t': '#FDEBF3'
  },
  icons: {
    'icon-logo': '136px 136px'
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
    0: '0',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px'
  },
  screens: {
    'screen-desktop': 960,
    'screen-tablet': 768,
    'screen-mobile': 480,
    'screen-sm-mobile': 400
  }
};

module.exports = variables;
