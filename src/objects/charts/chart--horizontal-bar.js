'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import ChartComponent from './chart--horizontal-bar.vue'; // Our component
import ChartData from 'nyco-patterns/src/objects/charts/chart.data'; // Our sample data

const chartType = 'horizontal-bar';

class ChartHorizontalBar {
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
          options: ChartData.horizontalBar.options
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

export default ChartHorizontalBar;