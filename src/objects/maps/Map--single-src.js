'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './map--single-src.vue'; // Our component
import MapData from './map.data'; // Our sample data

class MapSingleSrc {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-map-ssrc', MapComponent);

    new Vue({
      el: '[data-js="map-ssrc"]',
      delimiters: ['v{', '}'],
      data() {
        return {
          layer: {
            name: '',
            data: {},
            filterBy: '',
            legendColumn: ''
          },
          config: MapData.single.config,
        }
      },
      created() {
        this.getData();
      },
      methods: {
        getData() {
          fetch('https://cdn.jsdelivr.net/gh/kimpenguin/geoJSON@master/nyco-nyc_zipcodes.geojson')
            .then((response) => {
              if (response.ok)
                return response.text();
              else
                // eslint-disable-next-line no-console
                if (Utility.debug()) console.dir(response);
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              if (Utility.debug()) console.dir(error);
            })
            .then((data) => {
              this.layer = {
                name: 'nyco-nyc_zipcodes',
                data: JSON.parse(data),
                filterBy: 'ZCTA5CE10',
                legendColumn: 'BORO'
              };
            });
        },
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

export default MapSingleSrc;