/**
 * Dependencies
 */

const package = require('../package.json');
const { nycoColors } = require('./colors');

/**
 * Config
 */

const variables = {
  cdn: '"https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v' + package.version + '/dist"',
  fontFamily: {
    'system': [
      '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
      'Oxygen-Sans', 'Ubuntu', 'Cantarell', '"Helvetica Neue"', 'sans-serif'
    ],
    'code': [
      'monospace'
    ],
    'nycgov': [
      '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'
    ],
    'default-sans': [
      '"Noto Sans"', 'sans-serif'
    ],
    'default-serif': [
      '"Noto Serif"', 'serif'
    ]
  },
  fontWeight: {
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
    'code': 'normal',
    'small': 'normal',
    'blockquote': 'bold'
  },
  fontSize: {
    'jumbo': '3em',
    'h1': '2.488em',
    'h2': '2.074em',
    'h3': '1.728em',
    'h4': '1.44em',
    'h5': '1.2em',
    'h6': '1em',
    'html': '16px',
    'code': '1em',
    'small': '0.833em',
    'blockquote': '2.074em'
  },
  lineHeight: {
    'jumbo': '1.2',
    'h1': '1.2',
    'h2': '1.2',
    'h3': '1.2',
    'h4': '1.2',
    'h5': '1.2',
    'h6': '1.2',
    'html': '1.5',
    'code': '1.6',
    'small': 'normal',
    'blockquote': 'normal'
  },
  colors: nycoColors.colors,
  colorCombinations: nycoColors.colorCombinations,
  icons: {
    'icon-logo-nyc': '350px 117px',
    'icon-logo-nyco-secondary': '694px 76px',
    'icon-logo-nyco': '692px 358px',
    'icon-logo-primary': '693px 313px',
    'icon-logo-secondary': '692px 121px',
    'icon-github-mark': '33px 33px'
  },
  iconSizes: {
    '1': '8px 8px',
    '2': '16px 16px',
    '3': '24px 24px',
    '4': '32px 32px',
    '5': '40px 40px',
    '6': '48px 48px',
    '7': '56px 56px',
    '8': '64px 64px',
    '9': '72px 72px',
    '10': '80px 80px',
    '11': '88px 88px',
    '12': '96px 96px',
    'large': '136px 136px',
    'xlarge': '256px 256px'
  },
  animate: {
    'ease-in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    'ease-out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
    'animate-scss-speed': '0.75s',
    'animate-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'
  },
  borderWidth: {
    '0': '0',
    'default': '1px',
    '2': '2px',
    '4': '4px',
    '8': '8px'
  },
  grid: '8px',
  padding: {
    '0': '0',
    '1': '8px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '5': '40px',
    '6': '48px'
  },
  margin: {
    '-2': '-16px',
    '-1': '-8px',
    '0': '0',
    '1': '8px',
    '2': '16px',
    '3': '24px',
    '4': '32px',
    '5': '40px',
    '6': '48px',
    'auto': 'auto'
  },
  maxWidth: {
    '1/2': '50%',
    'full': '100%',
    '600': '600px',
    '900': '896px'
  },
  width: {
    '1/2': '50%',
    'full': '100%',
    '600': '600px',
    '900': '896px'
  },
  screens: {
    'screen-desktop': 960,
    'screen-mobile': 480,
    'screen-tablet': 768,
    'screen-sm-mobile': 400
  },
  buttons: {
    'radius': '500px'
  },
  inputs: {
    'checkbox-radius': '6px',
    'checkbox-size': '20px'
  },
  boxShadow: {
    'none': 'none',
    'up-transparent': '8px 8px 0px 0px rgba(47, 51, 79, 0)',
    'up': '8px 8px 0px 0px rgba(47, 51, 79, 100)',
    'up-2-transparent': '16px 16px 0px 0px rgba(47, 51, 79, 0)',
    'up-2': '16px 16px 0px 0px rgba(47, 51, 79, 100)'
  }
};

module.exports = variables;
