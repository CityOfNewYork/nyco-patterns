'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './maps.vue'; // Our component
import MapData from './map.data'; // Our sample data

class Map {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-map', MapComponent);

    new Vue({
      el: '[data-js="map"]',
      delimiters: ['v{', '}'],
      data() {
        return {
          data: MapData.data,
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

export default Map;