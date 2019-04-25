'use strict';

const MapData = {
  data: {
    boroughs: {},
    neighborhoods: {},
    zipcodes: {},
  },
  config: {
    APIKey: 'XXX',
    containerId: 'nyco-map',
    center: [-73.986710, 40.693391],
    zoom: 9,
    style: 'mapbox://styles/mapbox/streets-v11'
  }
}

export default MapData;