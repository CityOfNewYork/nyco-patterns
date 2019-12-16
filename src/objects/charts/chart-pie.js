'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import ChartComponent from './chart-pie.vue'; // Our component
import ChartData from './chart.data'; // Our sample data

const chartType = 'pie';

class ChartPie {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component(`nyco-chart-${chartType}`, ChartComponent);

    new Vue({
      el: `[data-js="chart-${chartType}"]`,
      delimiters: ['v{', '}'],
      data() {
        return {
          data: ChartData.data,
          options: ChartData.pie.options
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

export default ChartPie;