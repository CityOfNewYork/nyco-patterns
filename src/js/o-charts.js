

// Create SVG
// Define Settings
// Define Domains
// Gridlines
// Plots
// Axis
// Legend

var data = [
  {
    'label': 'Federal',
    'color': 'primary-red',
    'data': [
      ['2005', 20.3], ['2006', 20.0], ['2007', 19.8], ['2008', 19.0], ['2009', 19.4], ['2010', 20.6], ['2011', 20.8], ['2012', 20.7], ['2013', 20.7], ['2014', 20.6], ['2015', 19.9]
    ]
  },
  {
    'label': 'NYC',
    'color': 'primary-blue',
    'data': [
      ['2005', 18.3], ['2006', 17.9], ['2007', 16.7], ['2008', 16.8], ['2009', 17.4], ['2010', 18.8], ['2011', 19.2], ['2012', 20.0], ['2013', 19.9], ['2014', 19.1], ['2015', 18.4]
    ]
  }
];

var util = {
  'translate': translate,
  'slug': slug,
  'timeParse': d3.timeParse('%Y')
};

function translate(x, y) {

  return 'translate(' + x + ',' + y + ')';

}

function slug(Text, space) {

  return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g, space);

}

var settings = {
  'margin': [12, 12, 12, 12],
  'padding': [3, 0, 3, 3],
  'height': 404,
  'labels': {
    'axis':{
      'x': 'Maturities',
      'y': 'Yield (%)'
    }
  }
};

var CONS = {
  'NS': 'http://www.w3.org/2000/svg',
  'CLASS': ['chart'],
  'STYLE': [
    'font-size: 10px',
    'font-family: \'Open Sans Embedded\', sans-serif',
    'font-weight: 400'
  ],
  'HEIGHT_RATIO': 0.4,
  'DOTS_RENDER_DELAY': 0,
  'DOTS_RADIUS_RATIO': 0.5,
  'FOCUS_RADIUS': 4,
  'ZERO_LINE_TEXT': 'zero line',
  'ZERO_LINE_X': 54,
  'ZERO_LINE_Y': -13,
  'SERIES_API': '/api/v1/get_series_data_for_chart/',
  'AREA_OPACITY': '0.5',
  'DOMAIN_MARGIN_POS': 1.1,
  'DOMAIN_MARGIN_NEG': 0.9,
  'VALUE_DECIMALS': 2,
  'TOOLTIP_OFFSET': 24,
  'BAR_GAP': 0.5,
  'YAXIS_TICK_AMOUNT': 10,
  'NO_DATA_TEXT': 'No Data',
  'MIN_FREQ_INDEX': -1,
  'DEFAULT_DATE_RANGE': 10,
  'RESPOND_ANIM_RESET_DELAY': 1000,
  'PADDING': 12,
  'TITLE_MARGIN_BOTTOM': 6,
  'LEGEND_MARGIN_TOP': 56,
  'LEGEND_MARGIN_BOTTOM': 10,
  'FONT_SIZE_LABEL': '13px',
  'FONT_SIZE_TITLE': '19px',
  'FONT_SIZE_SUBTITLE': '13px',
  'STROKE_WIDTH_AXIS': '1',
  'FORMAT_DATES': '%b %d, %Y'
};

var chart = {
  'element': d3.select('#chart')
};

var ctrl = {
  'svg': svg,
  'define': define,
  'defineDomains': defineDomains,
  'plots': plots
};

init(settings, chart, data);

function init(settings, chart, data) {

  chart = ctrl.svg(settings, chart)['create']();
  settings = ctrl.define(settings, data);
  settings = ctrl.defineDomains(settings, data);
  chart = ctrl.plots(settings, chart, data)['create']();

}

// Create SVG
function svg(settings, chart) {

  var th = this;

  th.create = create;
  th.update = update;
  th.destroy = destroy;
  th.selections = selections;

  function create() {

    chart.svg = chart.element.append('svg').attrs({
      'xmlns': CONS.NS
    });

    chart.bg = chart.svg.append('rect').attrs({
      'class': 'chart__bg fill-base-white'
    });

    chart.defs = chart.svg.append('defs');
    chart.g = chart.svg.append('g');

    return th.update();

  }

  function update() {

    chart.svg = th.selections().svg;
    chart.g = th.selections().g;

    settings.width = chart.element.property('clientWidth');

    chart.svg.attrs({
      'class': CONS.CLASS.join(' '),
      'style': CONS.STYLE.join(';'),
      'width': settings.width,
      'height': settings.height
    });

    chart.bg.attrs({
      'width': settings.width,
      'height': settings.height
    });

    chart.g.attrs({
      'transform': util.translate(settings.margin[3], settings.margin[0])
    });

    return chart;

  }

  function destroy() {}

  function selections() {

    chart.svg = chart.element.select('svg');

    return {
      'element': chart.element,
      'svg': chart.svg,
      'g': chart.svg.select('g')
    }

  }

  return th;

}

// Define Settings
function define(settings, data) {

  settings = defineLayout(settings);
  settings = defineScales(settings);
  settings = defineAxis(settings);
  settings = definePlots(settings);

  return settings;

}

// defineLayout
function defineLayout(settings) {

  settings.innerWidth = settings.width  - (settings.margin[1] + settings.margin[3]);
  settings.innerHeight = settings.height - (settings.margin[0] + settings.margin[2]);
  settings.top = settings.padding[0];
  settings.right = settings.innerWidth - (settings.padding[1] + settings.padding[3]);
  settings.bottom = settings.innerHeight - (settings.padding[0] + settings.padding[2]);
  settings.left = settings.padding[3];

  return settings;

}

// defineScales
function defineScales(settings) {

  settings.scales = {};
  settings.scales.x = d3.scaleTime()
    .range([settings.left, settings.right]);
  settings.scales.y = d3.scaleLinear()
    .range([settings.bottom, settings.top])
    // .clamp(true);

  return settings;

}

// defineAxis
function defineAxis(settings) {

  settings.axis = {};
  settings.axis.x = d3.axisBottom()
    .scale(settings.scales.x);
    // .tickSize(10, 6);
  settings.axis.y = d3.axisLeft()
    .scale(settings.scales.y)

  return settings;

}

// definePlots
function definePlots(settings) {

  settings.plots = {};
  settings.plots.line = d3.line()
    .x(function(d) {
      return settings.scales.x( util.timeParse(d[0]) );
    })
    .y(function(d) {
      return settings.scales.y(d[1]);
    });

  return settings;

}

// Define Domains
function defineDomains(settings, data) {

  var min = function(data, index) {
    return d3.min(data, function(d) {
      return d3.min(d.data, function(e) {
        return e[index];
      });
    });
  };

  var max = function(data, index) {
    return d3.max(data, function(d) {
      return d3.max(d.data, function(e) {
        return e[index];
      });
    })
  }

  var x0 = util.timeParse( min(data, 0) );
  var x1 = util.timeParse( max(data, 0) );

  var y0 = min(data, 1);
  var y1 = max(data, 1);

  settings.scales.x.domain([x0, x1]);
  settings.scales.y.domain([y0, y1]);

  return settings;

}

// Gridlines (optional)

// Plots
function plots(settings, chart, data) {

  var th = this;

  th.create = create;
  th.update = update;
  th.classes = classes;
  th.focus = focus;

  function classes(KEY, name, id) {

    var c = {
      'plot': [
        'o-chart__plot',
        'o-chart__plot--' + util.slug(name, '-'),
        'o-chart__plot--' + util.slug(id, '-')
      ],
      'line': [
        'o-chart__line',
        'slj-round',
        'sw-2x',
        'stroke-' + id
      ],
      'dots': [
        'o-chart__dot',
        'fill-' + id,
        'stroke-base-white'
      ]
    };

    return c[KEY].join(' ');

  }

  function create() {

    // var focus;

    // create containers
    chart.g.selectAll('.o-chart__plot').remove();

    chart.plots = chart.g.selectAll('.o-chart__plot')
        .data(data)
      .enter().append('g')
      .attr('class', function() {
        var d = d3.select(this).data()[0];
        return th.classes('plot', d.label, d.label);
      });

    chart.plots.append('path')
      .attr('class', function(d) {
        return th.classes('line', '', d.color);
      })
      .attr('d', function(d) {
        return settings.plots.line(d.data)
      });

    // plot.selectAll('.o-chart__dot')
    chart.plots.append('circle')
          // .data(d.maturities)
      // .enter().append('circle')
      .attr('cx', function(d) {
        return settings.plots.line.x(d.data)
      })
      .attr('cy', function(d) {
        return settings.plots.line.y(d.data)
      })
      .attr('r', 3)
      .attr('class', function(d){
          // var c = this.parentElement.parentElement.__data__.selected;
          // var i = _.findIndex(data, {'selected': c});
          return th.classes('dots', '',  d.color);
      });

    // });
// // END - This bit is not objective

    return chart;

  }

  function update() {

    return th.create();

  }

  function focus(d) {

    chart.focus = chart.g.append('g')
        .attr('class', 'chart__plot chart__plot--focus');

    chart.focus.append('rect')
        .attr('width', settings.right)
        .attr('height', settings.bottom)
        .attr('class', 'fill-white')
        .attr('style', 'opacity: 0.75')
        .attr('transform', util.translate(settings.padding[3], settings.padding[0]));

    chart.focus.append('path')
        .datum(d.maturities)
        .attr('class', th.classes('line', '', 'bluelight'))
        .attr('d', settings.plots.line);

    chart.focus.selectAll('.o-chart__dot')
            .data(d.maturities)
        .enter().append('circle')
        .attr({
            'cx': settings.plots.line.x(),
            'cy': settings.plots.line.y(),
            'r': 3
        })
        .attr('class', th.classes('dots', '', 'blue'));

  }

  return th;

}

// Axis
// Legend