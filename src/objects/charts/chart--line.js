'use strict';

const chartType = 'line';

import Vue from 'vue/dist/vue.esm.browser';
import ChartComponent from './chart--line.vue'; // Our component
import ChartData from 'nyco-patterns/src/objects/charts/chart.data'; // Our sample data

class ChartLine {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component(`nyco-chart-${chartType}`, ChartComponent);

    new Vue({
      el: `[data-js="app-${chartType}"]`,
      delimiters: ['v{', '}'],
      data() {
        return {
          data: ChartData.data,
          options: ChartData.bar.options
        }
      }
    });
  }

  /**
   * Logs constants to the debugger
   * @param  {object} param - our constants
   */
  _constants(param) {
    console.dir(param);
  }
}

export default ChartLine;