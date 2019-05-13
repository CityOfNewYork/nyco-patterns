'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './map--single-src.vue'; // Our component
import MapData from 'nyco-patterns/src/objects/maps/map.data'; // Our sample data

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
          layers: MapData.single.layers,
          config: MapData.single.config,
        }
      },
      created() {
        this.getData();
      },
      methods: {
        getData() {
          fetch('https://cdn.jsdelivr.net/gh/kimpenguin/geoJSON@master/zcta-w-nta.geojson')
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
              MapData.single.layers.push({
                name: 'zcta-w-nta',
                data: JSON.parse(data),
                default: true,
                filterBy: 'GEOID10',
                legendColumn: 'boro_name'
              });
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