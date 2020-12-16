/**
 * Dependencies
 */

const tokens = require('./tokens.js');

/**
 * Config
 */

module.exports = {
  // options: {
  //   prefix: '',
  //   important: false,
  //   separator: ':'
  // },
  important: true,
  theme: {
    borderWidth: tokens.borderWidth,
    borderRadius: tokens.borderRadius,
    boxShadow: tokens.boxShadow,
    colors: global.Object.assign({ default: '' }, tokens.colors),
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeight,
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    margin: tokens.margin,
    maxWidth: tokens.maxWidth,
    padding: tokens.padding,
    screens: {
      'desktop': `${tokens.screens['desktop']}px`,
      'tablet': `${tokens.screens['tablet']}px`,
      'mobile': `${tokens.screens['mobile']}px`,
      'small': `${tokens.screens['desktop']}px`
    },
    spacing: {
      '0': '0',
      '1': '8px',
      '2': '16px',
      '3': '24px',
      '4': '32px',
      '5': '40px',
      '6': '48px'
    },
    width: tokens.width,
    extend: {
      margin: {
        '-2': '-16px',
        '-1': '-8px',
        'auto': 'auto'
      }
    }
  },
  variants: {
    preflight: [],
    container: [],
    accessibility: ['responsive'],
    appearance: [],
    backgroundAttachment: [],
    backgroundColor: ['hover', 'focus'],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderColor: ['hover', 'focus'],
    borderRadius: [],
    borderStyle: [],
    borderWidth: ['responsive'],
    cursor: [],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    order: ['responsive'],
    float: [],
    fontFamily: [],
    fontWeight: [],
    height: [],
    lineHeight: [],
    listStylePosition: [],
    listStyleType: [],
    margin: ['responsive'],
    maxHeight: [],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: [],
    objectFit: [],
    objectPosition: [],
    opacity: [],
    outline: [],
    overflow: ['responsive'],
    padding: ['responsive'],
    placeholderColor: [],
    pointerEvents: [],
    position: [],
    inset: [],
    resize: [],
    boxShadow: ['responsive'],
    fill: [],
    stroke: [],
    tableLayout: [],
    textAlign: [],
    textColor: ['hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: [],
    gap: ['responsive'],
    gridColumn: ['responsive'],
    gridColumnStart: ['responsive'],
    gridColumnEnd: ['responsive'],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: ['responsive'],
    textTransform: [],
    textDecoration: [],
    fontSmoothing: [],
    letterSpacing: [],
    userSelect: [],
    verticalAlign: [],
    visibility: [],
    whitespace: [],
    wordBreak: [],
    width: ['responsive'],
    zIndex: []
  },
  /**
   * These are the plugins that will be enabled in the process utility stylesheet
   */
  corePlugins: [
    // 'preflight',
    // 'container',
    'accessibility',
    // 'appearance',
    // 'backgroundAttachment',
    'backgroundColor',
    // 'backgroundPosition',
    // 'backgroundRepeat',
    // 'backgroundSize',
    // 'borderCollapse',
    'borderColor',
    'borderRadius',
    'borderStyle',
    'borderWidth',
    'cursor',
    'display',
    'flexDirection',
    'flexWrap',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'alignContent',
    'flex',
    'flexGrow',
    'flexShrink',
    'order',
    // 'float',
    'fontFamily',
    'fontWeight',
    'gap',
    'gridColumn',
    'gridColumnStart',
    'gridColumnEnd',
    'gridTemplateColumns',
    'gridTemplateRows',
    'height',
    'lineHeight',
    // 'listStylePosition',
    'listStyleType',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    // 'objectFit',
    // 'objectPosition',
    // 'opacity',
    // 'outline',
    'overflow',
    'padding',
    // 'placeholderColor',
    'pointerEvents',
    'position',
    'inset',
    // 'resize',
    'boxShadow',
    'fill',
    'stroke',
    // 'tableLayout',
    'textAlign',
    'textColor',
    'fontSize',
    'fontStyle',
    'textTransform',
    'textDecoration',
    'fontSmoothing',
    // 'letterSpacing',
    'userSelect',
    'verticalAlign',
    'visibility',
    'whitespace',
    // 'wordBreak',
    'width',
    'zIndex'
  ]
};
