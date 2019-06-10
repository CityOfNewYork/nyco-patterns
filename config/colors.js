/**
 * Config
 */

const nycoColors = {
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
      'background-color': 'base-white',
      'border': 'secondary-grey',
      'placeholder': 'secondary-grey',
      'checkbox-background': 'primary-navy',
      'error': 'primary-red',
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