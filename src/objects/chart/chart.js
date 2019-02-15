'use strict';

import Vue from 'vue/dist/vue.esm.browser'; //
import ChartComponent from './chart.vue'; // Our component
import ChartData from './chart.data.js'; // Our sample data

class Chart {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('chart', ChartComponent);

    new Vue({
      el: '[data-js="app"]',
      delimiters: ['v{', '}'],
      data: {
        'chartData': Chart.data, // set to ChartData in chart.data.js but this can be included anyway you like
      },
      methods: {}
    });

    console.log('Hello World!');
  }

  /**
   * Logs constants to the debugger
   * @param  {object} param - our constants
   */
  _constants(param) {
    console.dir(param);
  }
}

Chart.data = ChartData;

export default Chart;