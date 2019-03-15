'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import ChartComponent from './chart--bar.vue'; // Our component
import ChartData from 'nyco-patterns/src/objects/charts/chart.data'; // Our sample data

class ChartBar {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
}

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-chart-bar', ChartComponent);

    new Vue({
      el: '[data-js="app"]',
      delimiters: ['v{', '}'],
      data() {
        return {
          data: ChartData.data,
          options: ChartData.options
        }
      }
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

export default ChartBar;