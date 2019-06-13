'use strict';

import { mapColorCombinations } from '../../../config/colors';

const MapData = {
  single: {
    layers: [],
    config: {
      APIKey: 'pk.eyJ1Ijoibnljby1wcm9kdWN0cyIsImEiOiJjanZjZ3Y4b2IxNXYwM3l0ZDN6bWN4ajA5In0.XSt-hoz5p3j2siyli0g0og',
      containerId: 'nyco-map-sl',
      legendId: 'nyco-map-legend',
      center: [-73.986710, 40.693391],
      zoom: 9,
      disableScroll: true,
      style: 'mapbox://styles/nyco-products/cjv6wjq8812ys1gp39mnvuk2w',
      mapType: 'single'
    }
  },
  multi: {
    layers: [],
    config: {
      APIKey: 'pk.eyJ1Ijoibnljby1wcm9kdWN0cyIsImEiOiJjanZjZ3Y4b2IxNXYwM3l0ZDN6bWN4ajA5In0.XSt-hoz5p3j2siyli0g0og',
      containerId: 'nyco-map-ml',
      legendId: 'nyco-map-menu',
      center: [-73.986710, 40.693391],
      zoom: 9,
      disableScroll: true,
      style: 'mapbox://styles/nyco-products/cjv6wjq8812ys1gp39mnvuk2w',
      mapType: 'multi',
      colors: mapColorCombinations
    }
  }
}

export default MapData;