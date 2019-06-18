'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from '../objects/map/map.vue'; // Our component
import MapData from '../objects/map/map.data'; // Our sample data
import GeoJSON from 'geojson';
import rewind from 'geojson-rewind';
import { mapColorCombinations } from '../../config/colors'

class MapMultiLayer {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-map-ml', MapComponent);

    new Vue({
      el: '[data-js="nyco-map-ml"]',
      delimiters: ['v{', '}'],
      data() {
        return {
          layers: MapData.multi.layers,
          config: MapData.multi.config,
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
              MapData.multi.layers.push({
                name: 'zipcodes',
                data: JSON.parse(data),
                default: true,
                filterBy: 'GEOID10'
              });
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

              MapData.multi.layers.push({
                name: 'boroughs',
                data: this.convertToGeoJSON(data),
                default: false,
                filterBy: 'boro_name'
              });
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

              MapData.multi.layers.push({
                name: 'neighborhoods',
                data: this.convertToGeoJSON(data),
                default: false,
                filterBy: 'ntaname'
              });
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

class MapSingleLayer {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-map-sl', MapComponent);

    new Vue({
      el: '[data-js="nyco-map-sl"]',
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
              MapData.single.layers.push({
                name: 'nyco-nyc_zipcodes',
                data: JSON.parse(data),
                filterBy: 'ZCTA5CE10',
                legendColumn: 'BORO',
                fill: mapColorCombinations[3]
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

export {
  MapMultiLayer,
  MapSingleLayer
}