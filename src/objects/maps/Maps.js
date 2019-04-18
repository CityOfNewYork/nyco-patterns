'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './maps.vue'; // Our component
import MapData from './map.data'; // Our sample data
import GeoJSON from 'geojson';
import rewind from 'geojson-rewind';

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
      },
      created() {
        this.getZipcodeData();
        this.getBoroughData();
        this.getNeighborhoodData();
      },
      methods: {
        getZipcodeData() {
          fetch('https://cdn.jsdelivr.net/gh/kimpenguin/geoJSON@master/tiger-zcta.geojson')
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
              data = JSON.parse(data);
              MapData.data.zipcodes = data;
            });
        },
        getBoroughData() {
          fetch('https://data.cityofnewyork.us/resource/7t3b-ywvw.json')
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
              data = JSON.parse(data);
              MapData.data.boroughs = this.convertToGeoJSON(data);
            });
        },
        getNeighborhoodData() {
          fetch('https://data.cityofnewyork.us/resource/q2z5-ai38.json')
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
              data = JSON.parse(data);
              MapData.data.neighborhoods = this.convertToGeoJSON(data);
            });
        },
        convertToGeoJSON(jsonData) {
          // ensure geojson satisfies right-hand rule
          const data = rewind(GeoJSON.parse(jsonData, {GeoJSON: 'the_geom'}));

          return data;
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

export default Map;