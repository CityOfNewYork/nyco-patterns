<template>
  <div class='o-map'>
    <nyco-map id='nyco-map-ml' :layers='layers' :config='config' style='height: 400px; width: 500px'></nyco-map>
    <div id='map-menu' class='map-menu'></div>
  </div>
</template>

<script>
import NycoMap from '/node_modules/nyco-patterns/src/objects/map/map.vue';

export default {
  name: 'xyz',
  data() {
    config: {
      APIKey: 'pk.eydcdxc...', //Mapbox Access Token
      containerId: 'nyco-map-ml',
      legendId: 'map-menu',
      center: [-73.986710, 40.693391],
      zoom: 9,
      style: 'mapbox://styles/nyco-products/cjv6wjq8812ys1gp39mnvuk2w',
      mapType: 'multi' //or 'single',
      colors: [
        ['#000000', '#F2695D'],
        ['#000000', '#FFA133'],
        ['#2F334F', '#ACAEB9']
      ]
    },
    layers: [
      { name: 'zipcodes',
        data: GeoJSONData,
        default: true,
        filterBy: 'GEOID10',
        fill: ['#000000', '#F2695D']
      },
      {
        name: 'boroughs',
        data: GeoJSONData,
        default: false,
        filterBy: 'boro_name'
      },
      ...
    ]
  },
  components: {
    NycoMap,
    OtherCmpt,
  },
}
</script>