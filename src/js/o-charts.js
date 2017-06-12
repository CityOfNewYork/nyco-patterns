

var ctrl = {
  'chart': {},
  'svg': svg,
  'define': define,
  'domains': domains,
  'plots': plots,
  'axis': axis,
  'respond': respond,
  'translate': translate,
  'slug': slug,
};

function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}

function slug(Text, space) {
  return Text.toLowerCase().replace(/[^\w ]+/g,' ').replace(/ +/g, space);
}

function init(settings, data) {

  ctrl.data = data;
  ctrl.settings = settings;
  ctrl.chart.element = d3.select(ctrl.settings.selector);
  ctrl.timeParse = d3.timeParse(ctrl.settings.formats.time);

  render({
    'settings': ctrl.settings,
    'chart': ctrl.chart,
    'data': ctrl.data,
    'namespace': 'create'
  })

  // Watch Window
  window.addEventListener('resize', ctrl.respond);

}

function respond() {

  render({
    'settings': ctrl.settings,
    'chart': ctrl.chart,
    'data': ctrl.data,
    'namespace': 'update'
  });

}

function render(args) {

  var s = args.settings;
  var c = args.chart;
  var d = args.data;
  var n = args.namespace;

  c = ctrl.svg(s, c)[n]();
  s = ctrl.define(s, d);
  s = ctrl.domains(s, d);
  c = ctrl.plots(s, c, d)[n]();
  c = ctrl.axis(s, c)[n]();

}

// Create SVG
function svg(settings, chart) {

  var th = this;

  th.create = create;
  th.update = update;
  th.selections = selections;
  th.classes = classes;

  function classes(KEY) {

    var c = {
      'background': [
        'o-chart__bg',
        'fill-' + settings.colors.background,
      ]
    };

    return c[KEY].join(' ');

  }

  function create() {

    chart.svg = chart.element.append('svg').attrs({
      'xmlns': CONSTANTS.NAMESPACE
    });

    chart.bg = chart.svg.append('rect').attrs({
      'class': th.classes('background')
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
      'class': CONSTANTS.CLASS.join(' '),
      'style': CONSTANTS.STYLE.join(';'),
      'width': settings.width,
      'height': settings.height
    });

    chart.bg.attrs({
      'width': settings.width,
      'height': settings.height
    });

    chart.g.attrs({
      'transform': ctrl.translate(settings.margin[3], settings.margin[0])
    });

    return chart;

  }

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

function define(settings, data) {

  // this used tp be a promise chain, I'm not sure of it's importance to be so anymore
  // - devowhippit
  settings = defineLayout(settings);
  settings = defineScales(settings);
  settings = defineAxis(settings);
  settings = definePlots(settings);

  return settings;

}

function defineLayout(settings) {

  settings.innerWidth = settings.width  - (settings.margin[1] + settings.margin[3]);
  settings.innerHeight = settings.height - (settings.margin[0] + settings.margin[2]);
  settings.top = settings.padding[0];
  settings.right = settings.innerWidth - (settings.padding[1] + settings.padding[3]);
  settings.bottom = settings.innerHeight - (settings.padding[0] + settings.padding[2]);
  settings.left = settings.padding[3];

  return settings;

}

function defineScales(settings) {

  settings.scales = {};
  settings.scales.x = d3.scaleTime()
    .range([settings.left, settings.right]);
  settings.scales.y = d3.scaleLinear()
    .range([settings.bottom, settings.top])
    .clamp(true);

  return settings;

}

function defineAxis(settings) {

  settings.axis = {};
  settings.axis.x = d3.axisBottom()
    .scale(settings.scales.x);
  settings.axis.y = d3.axisLeft()
    .scale(settings.scales.y)

  return settings;

}

function definePlots(settings) {

  settings.plots = {};
  settings.plots.line = d3.line()
    .x(function(d) {
      return settings.scales.x( ctrl.timeParse(d[0]) );
    })
    .y(function(d) {
      return settings.scales.y(d[1]);
    });

  return settings;

}

function domains(settings, data) {

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

  var x0 = ctrl.timeParse(min(data, 0));
  var x1 = ctrl.timeParse(max(data, 0));

  var y0 = min(data, 1);
  var y1 = max(data, 1);

  settings.scales.x.domain([x0, x1]);
  settings.scales.y.domain([y0, y1]);

  return settings;

}

function plots(settings, chart, data) {

  var th = this;

  th.create = create;
  th.update = update;
  th.classes = classes;

  function classes(KEY, name, id) {

    var c = {
      'plot': [
        'o-chart__plot',
        'o-chart__plot--' + ctrl.slug(name, '-'),
        'o-chart__plot--' + ctrl.slug(id, '-')
      ],
      'line': [
        'o-chart__line',
        'stroke-' + ctrl.slug(id, '-')
      ],
      'dots': [
        'o-chart__dot',
        'fill-' + ctrl.slug(id, '-'),
        'stroke-' + settings.colors.background
      ]
    };

    return c[KEY].join(' ');

  }

  function create() {

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

    chart.plots.selectAll('.o-chart__dot')
      .data(function(d) {
        return d.data;
      })
      .enter().append('circle')
      .attrs({
        'cx': settings.plots.line.x(),
        'cy': settings.plots.line.y(),
        'r': CONSTANTS.DOTS_RADIUS
      }).attr('class', function(d) {
          var d = d3.select(this.parentNode).data()[0];
          return th.classes('dots', '', d.color);
      });

    return chart;

  }

  function update() {

    return th.create();

  }

  return th;

}

// Axis
function axis(settings, chart) {

  var th = this;

  th.create = create;
  th.update = update;
  th.labels = labels;
  th.text = text;
  th.modify = modify;
  th.classes = classes;

  function classes(KEY, name, id) {

    var c = {
      'axis_top': [
        'o-chart__axis',
        'o-chart__axis--x',
        'o-chart__axis--top'
      ],
      'axis_bottom': [
        'o-chart__axis',
        'o-chart__axis--x',
        'o-chart__axis--bottom'
      ],
      'axis_left': [
        'o-chart__axis',
        'o-chart__axis--y',
        'o-chart__axis--left'
      ],
      'axis_right': [
        'o-chart__axis',
        'o-chart__axis--y',
        'o-chart__axis--right'
      ],
      'label_top': [
        'fill-' + settings.colors.labels,
        'o-chart__label',
        'o-chart__label--x',
        'o-chart__label--top'
      ],
      'label_bottom': [
        'fill-' + settings.colors.labels,
        'o-chart__label',
        'o-chart__label--x',
        'o-chart__label--bottom'
      ],
      'label_left': [
        'fill-' + settings.colors.labels,
        'o-chart__label',
        'o-chart__label--y',
        'o-chart__label--left'
      ],
      'label_right': [
        'fill-' + settings.colors.labels,
        'o-chart__label',
        'o-chart__label--y',
        'o-chart__label--right'
      ],
      'ticks': [
        'tick',
        'fill-' + settings.colors.axis
      ],
      'line_x': [
        'o-chart__axis-gap--x',
        'stroke-' + settings.colors.axis
      ],
      'line_y': [
        'o-chart__axis-gap--y',
        'stroke-' + settings.colors.axis
      ]
    }

    return c[KEY].join(' ');

  }

  function create() {

    chart.axis = {};

    chart.axis.x = chart.g.append('g')
      .attr('class', th.classes('axis_bottom'))

    chart.axis.y = chart.g.append('g')
      .attr('class', th.classes('axis_left'))

    th.update();

    th.modify();

    return th.labels();

  }

  function update() {

    chart.axis.x.call(settings.axis.x)
      .attr('transform', ctrl.translate(0, settings.innerHeight))

    chart.axis.y.call(settings.axis.y);

    chart.axis.x.select('.o-chart__axis-gap--x').attrs({
      'x1': 0, 'y1': 0,  'y2': 0,
      'x2': settings.innerWidth,
    });

    chart.axis.y.select('.o-chart__axis-gap--y').attrs({
      'x1': 0, 'y1': 0, 'x2': 0,
      'y2': settings.innerHeight
    });

    chart.g.selectAll('.tick').attr('class', th.classes('ticks'));

    // position the x axis label
    chart.g.select('.o-chart__label--x').attr('transform', function() {
      var xt = d3.select(this).select('text');
      var x = settings.left + (settings.innerWidth / 2);
      var y = settings.height - xt.node().getBBox().height
      return ctrl.translate(x, y);
    })

    // position the y axis label
    chart.g.select('.o-chart__label--y').attr('transform', function() {
      var x = 0 - settings.margin[3] + (d3.select(this).node().getBBox().height);
      var y = settings.innerHeight / 2;
      return [ctrl.translate(x, y), 'rotate('+ -90 +')'].join(' ');
    });

    return chart;

  }

  function labels() {

    // create labels
    chart.axis.x.label = chart.g.append('g')
      .attr('class', th.classes('label_bottom'));

    chart.axis.x.label.append('text').attrs({
      'text-anchor': 'middle'
    });

    chart.axis.y.label = chart.g.append('g')
      .attr('class', th.classes('label_left'));

    chart.axis.y.label.append('text').attrs({
      'text-anchor': 'middle'
    });

    th.text();

    return chart;

  }

  function text() {

    // Add text to the label containers
    chart.g.select('.o-chart__label--x').select('text')
      .text(settings.labels.axis.x);

    chart.g.select('.o-chart__label--y').select('text')
      .text(settings.labels.axis.y);

    th.update();

  }

  // This function changes the native axis styling of D3
  function modify() {

    // Add lines that visually connect the x axis to the corner
    chart.axis.x.append('line').attrs({
      'x1': 0, 'y1': 0, 'y2': 0,
      'x2': settings.innerWidth,
      'class': th.classes('line_x')
    });

    // hide the original x axis domain
    chart.axis.x.select('.domain').attr('display', 'none');

    // Add lines that visually connect the y axis to the corner
    chart.axis.y.append('line').attrs({
      'x1': 0, 'y1': 0, 'x2': 0,
      'y2': settings.innerHeight,
      'class': th.classes('line_y')
    });

    // hide the original y axis domain
    chart.axis.y.select('.domain').attr('display', 'none');

  }

  return th;

}

// Legend