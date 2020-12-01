/**
 * Config
 */

const colors = {
  'primary': [
    'navy',
    'blue',
    'red'
  ],
  'secondary': [
    'grey',
    'white',
    'orange',
    'pink'
  ],
  'colors': {
    'navy': '#24325b',
    'navy-70t': '#4157aa',
    'navy-50t': '#8195dc',
    'navy-30t': '#cdd8ef',
    'blue': '#284cca',
    'blue-70t': '#568adf',
    'blue-50t': '#96beff',
    'blue-30t': '#d2e8ff',
    'red': '#fc5d52',
    'red-70t': '#ff8787',
    'red-50t': '#ffafaf',
    'red-30t': '#ffdbdb',
    'grey': '#7c7f83',
    'grey-70t': '#999ca4',
    'grey-50t': '#c1c6cb',
    'grey-30t': '#e6e8ec',
    'white': '#F3F3F3',
    'white-70t': '#F6F6F6',
    'white-50t': '#F9F9FA',
    'white-30t': '#FBFCFC',
    'orange': '#faa302',
    'orange-70t': '#fbb95a',
    'orange-50t': '#fbd8a1',
    'orange-30t': '#ffeecd',
    'pink': '#f9a5da',
    'pink-70t': '#ffc0f6',
    'pink-50t': '#fbd9ff',
    'pink-30t': '#fff0fe',
    'base-black': '#000000',
    'base-white': '#FFFFFF'
  },
  'colorCombinations': {
    'light-background': {
      'color': 'base-black',
      'headings': 'base-black',
      'hyperlinks': 'blue',
      'visited': 'blue',
      'hover': 'navy',
      'background-color': 'base-white',
      'border': 'grey',
      'input-background': 'base-white',
      'placeholder': 'grey',
      'focus': 'navy',
      'checkbox-check': '"icon-ui-check-white.svg"',
      'select-arrow': '"icon-ui-chevron-down-navy.svg"',
      'error': 'red'
    },
    'mid-background': {
      'color': 'base-black',
      'headings': 'base-black',
      'hyperlinks': 'blue',
      'visited': 'blue',
      'hover': 'navy',
      'background-color': 'white',
      'border': 'grey',
      'input-background': 'base-white',
      'placeholder': 'grey',
      'focus': 'navy',
      'checkbox-check': '"icon-ui-check-white.svg"',
      'radio-check': '"icon-ui-check-white.svg"',
      'select-arrow': '"icon-ui-chevron-down-navy.svg"',
      'error': 'red'
    },
    'dark-background': {
      'color': 'base-white',
      'font-smooth': true,
      'headings': 'base-white',
      'hyperlinks': 'base-white',
      'visited': 'base-white',
      'hover': 'base-white',
      'background-color': 'navy',
      'border': 'base-white',
      'input-background': 'navy',
      'placeholder': 'base-white',
      'focus': 'base-white',
      'checkbox-check': '"icon-ui-check-navy.svg"',
      'select-arrow': '"icon-ui-chevron-down-white.svg"',
      'error': 'red'
    },
    'primary-button': {
      'font-weight': 'bold',
      'color': 'base-white',
      'font-smooth': true,
      'background-color': 'blue'
    },
    'secondary-button': {
      'font-weight': 'bold',
      'color': 'base-white',
      'font-smooth': true,
      'background-color': 'red'
    }
  },
};

/**
 * TEMP Backwards Compatible Color Utils. Deprecate for next major release.
 * Adds the primary and secondary namespaces of the colors so they compile in
 * the site utilities.
 * @since v2.2.2
 */
Object.keys(colors.colors).forEach((key) => {
  if (colors.primary.includes(key.split('-')[0])) {
    colors.colors[`primary-${key}`] = colors.colors[key];
  }

  if (colors.secondary.includes(key.split('-')[0])) {
    colors.colors[`secondary-${key}`] = colors.colors[key];
  }
});

/**
 * Map Color Utils
 */

colors.mapColorCombinations = [
  [
    colors.colors['primary-navy'],
    colors.colors['primary-navy-70t']
  ],
  [
    colors.colors['base-black'],
    colors.colors['secondary-orange']
  ],
  [
    colors.colors['primary-navy'],
    colors.colors['secondary-grey']
  ],
  [
    colors.colors['primary-blue'],
    colors.colors['secondary-orange']
  ],
];

/**
 * Export our modules
 */

module.exports = colors;
