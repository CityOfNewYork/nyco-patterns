'use strict';

import Vue from 'vue/dist/vue.esm.browser';
import MapComponent from './map--multi-src.vue'; // Our component
import MapData from 'nyco-patterns/src/objects/maps/map.data'; // Our sample data
import GeoJSON from 'geojson';
import rewind from 'geojson-rewind';

class MapMultiSrc {
  constructor(settings = {}, data = {}) {
    this.data = data;
    this.settings = settings;
    this.init();
  }

  /**
   * Initializes the module
   */
  init() {
    Vue.component('nyco-map-msrc', MapComponent);

    new Vue({
      el: '[data-js="map-msrc"]',
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

export default MapMultiSrc;