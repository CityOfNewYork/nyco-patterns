'use strict';

import Vue from 'vue/dist/vue.esm.browser'; //
import SelectComponent from './select.vue'; // Our component
import SelectData from './select.data.js'; // Our sample data

class Select {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-select', SelectComponent);

    new Vue({
      el: '[data-js="app"]',
      delimiters: ['v{', '}'],
      data() {
        return {
          options: Select.data,
          selected: 'all',
        }
      },
      methods: {},
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

Select.data = SelectData;

export default Select;