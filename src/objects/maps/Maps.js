'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './maps.vue'; // Our component
import MapData from './map.data'; // Our sample data
import https from 'https'; // TODO: replace with fetch
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
          https.get('https://cdn.jsdelivr.net/gh/kimpenguin/geoJSON@master/tiger-zcta.geojson', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              data = JSON.parse(data);
              MapData.data.zipcodes = data;
            });
          }).on('error', (err) => {
            MapData.data.zipcodes = {
              error: true,
              message: err.message
            };
          });
        },
        getBoroughData() {
          https.get('https://data.cityofnewyork.us/resource/7t3b-ywvw.json', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              data = JSON.parse(data);

              MapData.data.boroughs = this.convertToGeoJSON(data);
            });
          }).on('error', (err) => {
            MapData.data.boroughs = {
              error: true,
              message: err.message
            };
          });
        },
        getNeighborhoodData() {
          https.get('https://data.cityofnewyork.us/resource/q2z5-ai38.json', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
              data += chunk;
            });

            resp.on('end', () => {
              data = JSON.parse(data);

              MapData.data.neighborhoods = this.convertToGeoJSON(data);
            });
          }).on('error', (err) => {
            MapData.data.neighborhoods = {
              error: true,
              message: err.message
            };
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