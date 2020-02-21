/**
 * Config
 */

const nycoColors = {
  colors: {
    'primary-navy': '#24325b',
    'primary-navy-70t': '#4157aa',
    'primary-navy-50t': '#8195dc',
    'primary-navy-30t': '#cdd8ef',
    'primary-blue': '#284cca',
    'primary-blue-70t': '#568adf',
    'primary-blue-50t': '#96beff',
    'primary-blue-30t': '#d2e8ff',
    'primary-red': '#fc5d52',
    'primary-red-70t': '#ff8787',
    'primary-red-50t': '#ffafaf',
    'primary-red-30t': '#ffdbdb',
    'secondary-grey': '#7c7f83',
    'secondary-grey-70t': '#999ca4',
    'secondary-grey-50t': '#c1c6cb',
    'secondary-grey-30t': '#e6e8ec',
    'secondary-white': '#F3F3F3',
    'secondary-white-70t': '#F6F6F6',
    'secondary-white-50t': '#F9F9FA',
    'secondary-white-30t': '#FBFCFC',
    'secondary-orange': '#faa302',
    'secondary-orange-70t': '#fbb95a',
    'secondary-orange-50t': '#fbd8a1',
    'secondary-orange-30t': '#ffeecd',
    'secondary-pink': '#f9a5da',
    'secondary-pink-70t': '#ffc0f6',
    'secondary-pink-50t': '#fbd9ff',
    'secondary-pink-30t': '#fff0fe',
    'base-black': '#000000',
    'base-white': '#FFFFFF'
  },
  colorCombinations: {
    'light-background': {
      'color': 'base-black',
      'headings': 'base-black',
      'hyperlinks': 'primary-blue',
      'visited': 'primary-blue',
      'hover': 'primary-navy',
      'background-color': 'base-white',
      'border': 'secondary-grey',
      'input-background': 'base-white',
      'placeholder': 'secondary-grey',
      'focus': 'primary-navy',
      'checkbox-check': '"../svg/icon-ui-check-white.svg"',
      'select-arrow': '"../svg/icon-ui-chevron-down-navy.svg"',
      'error': 'primary-red'
    },
    'mid-background': {
      'color': 'base-black',
      'headings': 'base-black',
      'hyperlinks': 'primary-blue',
      'visited': 'primary-blue',
      'hover': 'primary-navy',
      'background-color': 'secondary-white',
      'border': 'secondary-grey',
      'input-background': 'base-white',
      'placeholder': 'secondary-grey',
      'focus': 'primary-navy',
      'checkbox-check': '"../svg/icon-ui-check-white.svg"',
      'radio-check': '"../svg/icon-ui-check-white.svg"',
      'select-arrow': '"../svg/icon-ui-chevron-down-navy.svg"',
      'error': 'primary-red'
    },
    'dark-background': {
      'color': 'base-white',
      'font-smooth': true,
      'headings': 'base-white',
      'hyperlinks': 'base-white',
      'visited': 'base-white',
      'hover': 'base-white',
      'background-color': 'primary-navy',
      'border': 'base-white',
      'input-background': 'primary-navy',
      'placeholder': 'base-white',
      'focus': 'base-white',
      'checkbox-check': '"icon-ui-check-navy.svg"',
      'select-arrow': '"icon-ui-chevron-down-white.svg"',
      'error': 'primary-red'
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
};

const color = nycoColors.colors;
const mapColorCombinations = [
  [color['primary-navy'], color['primary-navy-70t']],
  [color['base-black'], color['secondary-orange']],
  [color['primary-navy'], color['secondary-grey']],
  [color['primary-blue'], color['secondary-orange']],
];

module.exports = {
  nycoColors,
  mapColorCombinations
};
