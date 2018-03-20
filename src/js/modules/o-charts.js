'use strict';

import * as d3 from 'd3';
import 'd3-selection-multi';
import {CONSTANTS as CONSTANTS} from './o-charts.constants';

class oCharts {

  constructor(settings, data) {

    this.chart = {};
    this.data = data;
    this.settings = settings;
    this.chart.element = d3.select(this.settings.selector);
    this.timeParse = d3.timeParse(this.settings.formats.time);

  }

  translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  slug(Text, space) {
    return Text.toLowerCase().replace(/[^\w ]+/g,' ').replace(/ +/g, space);
  }

  init() {

    this.render({
      'settings': this.settings,
      'chart': this.chart,
      'data': this.data,
      'namespace': 'create'
    })

    window.addEventListener('resize', () => {
        this.render({
        'settings': this.settings,
        'chart': this.chart,
        'data': this.data,
        'namespace': 'update'
      });
    });

  }

  render(args) {

    let s = args.settings;
    let c = args.chart;
    let d = args.data;
    let n = args.namespace;

    c = this.svg(s, c)[n]();
    s = this.define(s, d);
    s = this.domains(s, d);
    c = this.plots(s, c, d)[n]();
    c = this.axis(s, c)[n]();

  }

  // Create SVG
  svg(settings, chart) {

    let _this = this;

    _this.svg.create = create;
    _this.svg.update = update;
    _this.svg.selections = selections;
    _this.svg.classes = classes;

    return _this.svg;

    function classes(KEY) {

      let c = {
        'background': [
          'o-chart__bg',
          'fill-' + settings.colors.background,
        ]
      };

      return c[KEY].join(' ');

    }

    function create() {

      chart.svg = chart.element.append('svg').attrs({
        'xmlns': CONSTANTS.NAMESPACE,
        'width': 0
      });

      chart.bg = chart.svg.append('rect').attrs({
        'class': _this.svg.classes('background')
      });

      chart.defs = chart.svg.append('defs');
      chart.g = chart.svg.append('g');

      return _this.svg.update();

    }

    function update() {

      chart.svg = _this.svg.selections().svg;
      chart.g = _this.svg.selections().g;

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
        'transform': _this.translate(settings.margin[3], settings.margin[0])
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

  }

  define(settings, data) {

    // this used tp be a promise chain, I'm not sure of it's importance to be so anymore
    // - devowhippit
    settings = this.defineLayout(settings);
    settings = this.defineScales(settings);
    settings = this.defineAxis(settings);
    settings = this.definePlots(settings);

    return settings;

  }

  defineLayout(settings) {

    settings.innerWidth = settings.width  - (settings.margin[1] + settings.margin[3]);
    settings.innerHeight = settings.height - (settings.margin[0] + settings.margin[2]);
    settings.top = settings.padding[0];
    settings.right = settings.innerWidth - (settings.padding[1] + settings.padding[3]);
    settings.bottom = settings.innerHeight - (settings.padding[0] + settings.padding[2]);
    settings.left = settings.padding[3];

    return settings;

  }

  defineScales(settings) {

    settings.scales = {};
    settings.scales.x = d3.scaleTime()
      .range([settings.left, settings.right]);
    settings.scales.y = d3.scaleLinear()
      .range([settings.bottom, settings.top])
      .clamp(true);

    return settings;

  }

  defineAxis(settings) {

    settings.axis = {};
    settings.axis.x = d3.axisBottom()
      .scale(settings.scales.x);
    settings.axis.y = d3.axisLeft()
      .scale(settings.scales.y)

    return settings;

  }

  definePlots(settings) {

    let _this = this;

    settings.plots = {};
    settings.plots.line = d3.line()
      .x(function(d) {
        return settings.scales.x(_this.timeParse(d[0]));
      })
      .y(function(d) {
        return settings.scales.y(d[1]);
      });

    return settings;

  }

  domains(settings, data) {

    let _this = this;

    let min = function(data, index) {
      return d3.min(data, function(d) {
        return d3.min(d.data, function(e) {
          return e[index];
        });
      });
    };

    let max = function(data, index) {
      return d3.max(data, function(d) {
        return d3.max(d.data, function(e) {
          return e[index];
        });
      })
    }

    let bars = data.filter(x => x.type === 'bar').length;

    let x0 = _this.timeParse(min(data, 0));
    let x1 = _this.timeParse(max(data, 0));

    // if there are bars it's nice to give each side extra space
    if (bars > 0) {
      x0 = d3.timeMonth.offset(x0, -1);
      x1 = d3.timeMonth.offset(x1, 1);
    }

    let y0 = min(data, 1);
    let y1 = max(data, 1);

    settings.scales.x.domain([x0, x1]).nice();
    settings.scales.y.domain([y0, y1]).nice();

    return settings;

  }

  plots(settings, chart, data) {

    let _this = this;

    _this.plots.create = create;
    _this.plots.line = line;
    _this.plots.bar = bar;
    _this.plots.update = update;
    _this.plots.classes = classes;

    return _this.plots;

    function classes(KEY, name, id) {

      let c = {
        'plot': [
          'o-chart__plot',
          'o-chart__plot--' + _this.slug(name, '-'),
          'o-chart__plot--' + _this.slug(id, '-')
        ],
        'line': [
          'o-chart__line',
          'stroke-' + _this.slug(id, '-')
        ],
        'dots': [
          'o-chart__dot',
          'fill-' + _this.slug(id, '-'),
          'stroke-' + settings.colors.background
        ],
        'bar': [
          'o-chart__bar',
          'fill-' + _this.slug(id, '-'),
        ]
      };

      return c[KEY].join(' ');

    }

    function create() {

      // remove old containers
      chart.g.selectAll('.o-chart__plot').remove();

      // add plot containers
      chart.plots = chart.g.selectAll('.o-chart__plot')
          .data(data)
        .enter().append('g')
        .attr('class', function() {
          let d = d3.select(this).data()[0];
          return _this.plots.classes('plot', d.label, d.label);
        });

      // run each plot through it's own rendering function based on type
      chart.plots.each(function(d) {
        _this.plots[d.type](d3.select(this));
      });

      return chart;

    }

    function line(plot) {

      plot.append('path')
        .attr('class', (d) => _this.plots.classes('line', '', d.color))
        .attr('d', (d) => settings.plots.line(d.data));

      plot.selectAll('.o-chart__dot')
          .data((d) => d.data)
        .enter().append('circle')
        .attrs({
          'cx': settings.plots.line.x(),
          'cy': settings.plots.line.y(),
          'r': CONSTANTS.DOTS_RADIUS
        }).attr('class', function(d) {
            var d = d3.select(this.parentNode).data()[0];
            return _this.plots.classes('dots', '', d.color);
        });

    }

    function bar(plot) {

      let bars = data.filter(x => x.type === 'bar'); // get just the bar plots
      let p = plot.data()[0]; // get the plot's data/configuration
      let max = Math.max(0, p.data.length); // I think the max be the max length of the largest plot?
      let width = ((settings.right / max) * CONSTANTS.BAR_GAP ) / bars.length; // calculate the width
      let classes = _this.plots.classes('bar', '', p.color); // set the color
      let order = (bars.map((d) => d.label).indexOf(p.label)) + 1; // get order of this plot
      let offset = (width * order) - ((width * bars.length) / 2); // calculate the offset

      plot.selectAll('.o-chart__bar')
          .data((d) => p.data)
        .enter().append('rect')
        .attrs({
          'class': classes,
          'width': width,
          'x': (d) => settings.scales.x(_this.timeParse(d[0])) - offset,
          'y': (d) => settings.scales.y(Math.max(0, d[1])),
          'height': (d) => Math.abs(
            Math.min(settings.scales.y(0), settings.bottom) - settings.scales.y(d[1])
          ),
        });

    }

    function update() {

      return _this.plots.create();

    }

  }

    // Axis
  axis(settings, chart) {

    let _this = this;

    _this.axis.create = create;
    _this.axis.update = update;
    _this.axis.labels = labels;
    _this.axis.text = text;
    _this.axis.modify = modify;
    _this.axis.classes = classes;

    return _this.axis;

    function classes(KEY) {

      let c = {
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
        .attr('class', _this.axis.classes('axis_bottom'))

      chart.axis.y = chart.g.append('g')
        .attr('class', _this.axis.classes('axis_left'))

      _this.axis.update();

      _this.axis.modify();

      return _this.axis.labels();

    }

    function update() {

      chart.axis.x.call(settings.axis.x)
        .attr('transform', _this.translate(0, settings.innerHeight))

      chart.axis.y.call(settings.axis.y);

      chart.axis.x.select('.o-chart__axis-gap--x').attrs({
        'x1': 0, 'y1': 0,  'y2': 0,
        'x2': settings.innerWidth,
      });

      chart.axis.y.select('.o-chart__axis-gap--y').attrs({
        'x1': 0, 'y1': 0, 'x2': 0,
        'y2': settings.innerHeight
      });

      chart.g.selectAll('.tick').attr('class', _this.axis.classes('ticks'));

      // position the x axis label
      chart.g.select('.o-chart__label--x').attr('transform', function() {
        var xt = d3.select(this).select('text');
        var x = settings.left + (settings.innerWidth / 2);
        var y = settings.height - xt.node().getBBox().height
        return _this.translate(x, y);
      })

      // position the y axis label
      chart.g.select('.o-chart__label--y').attr('transform', function() {
        var x = 0 - settings.margin[3] + (d3.select(this).node().getBBox().height);
        var y = settings.innerHeight / 2;
        return [_this.translate(x, y), 'rotate('+ -90 +')'].join(' ');
      });

      return chart;

    }

    function labels() {

      // create labels
      chart.axis.x.label = chart.g.append('g')
        .attr('class', _this.axis.classes('label_bottom'));

      chart.axis.x.label.append('text').attrs({
        'text-anchor': 'middle'
      });

      chart.axis.y.label = chart.g.append('g')
        .attr('class', _this.axis.classes('label_left'));

      chart.axis.y.label.append('text').attrs({
        'text-anchor': 'middle'
      });

      _this.axis.text();

      return chart;

    }

    function text() {

      // Add text to the label containers
      chart.g.select('.o-chart__label--x').select('text')
        .text(settings.labels.axis.x);

      chart.g.select('.o-chart__label--y').select('text')
        .text(settings.labels.axis.y);

      _this.axis.update();

    }

    // This function changes the native axis styling of D3
    function modify() {

      // Add lines that visually connect the x axis to the corner
      chart.axis.x.append('line').attrs({
        'x1': 0, 'y1': 0, 'y2': 0,
        'x2': settings.innerWidth,
        'class': _this.axis.classes('line_x')
      });

      // hide the original x axis domain
      chart.axis.x.select('.domain').attr('display', 'none');

      // Add lines that visually connect the y axis to the corner
      chart.axis.y.append('line').attrs({
        'x1': 0, 'y1': 0, 'x2': 0,
        'y2': settings.innerHeight,
        'class': _this.axis.classes('line_y')
      });

      // hide the original y axis domain
      chart.axis.y.select('.domain').attr('display', 'none');

    }

  }

  // Legend

}

export default oCharts;