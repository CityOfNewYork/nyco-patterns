<template>
  <div>
    <p>Hello, I'm a map!</p>
    <div id='nyco-map' style='height: 400px; width: 500px'></div>
  </div>
</template>

<script>
  export default {
    props: [
      'data'
    ],
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      this.initializeMap();
    },
    beforeDestroy() {
      //destroy map
    },
    watch: {
      'data.boroughs': function () {
        this.createBoroughLayer(this.map, this.data.boroughs);
      },
      'data.neighborhoods': function () {
        this.createNeighborhoodLayer(this.map, this.data.neighborhoods);
      },
    },
    methods: {
      createBoroughLayer(map, layerData) {
        if (!map || !layerData) {
          throw Error(`Required ${map ? 'layerData' : 'map'} param is empty`);
        }

        const layerRef = 'boroughs';

        map.on('load', function(e) {
          map.addSource(`${layerRef}`, {
            'type': 'geojson',
            'data': layerData
          });

          map.addLayer({
            'id': `${layerRef}`,
            'type': 'fill',
            'source': `${layerRef}`,
            'paint': {
              'fill-color': '#ffa133',
              'fill-opacity': 0.6
            }
          });
        });
      },
      createNeighborhoodLayer(map, layerData) {
        if (!map || !layerData) {
          throw Error(`Required ${map ? 'layerData' : 'map'} param is empty`);
        }

        const layerRef = 'neighborhoods';

        map.on('load', function(e) {
          map.addSource(`${layerRef}`, {
            'type': 'geojson',
            'data': layerData
          });

          map.addLayer({
            'id': `${layerRef}`,
            'type': 'fill',
            'source': `${layerRef}`,
            'paint': {
              'fill-color': '#f2695d',
              'fill-opacity': 0.5
            }
          });
        });
      },
      initializeMap() {
        mapboxgl.accessToken = this.data.api_key;

        this.map = new mapboxgl.Map({
          container: 'nyco-map',
          // [longitude, latitude]
          center: [-73.986710, 40.693391],
          // the initial zoom level of the map
          zoom: 9,
          style: 'mapbox://styles/mapbox/streets-v11'
        });

        this.map.addControl(new mapboxgl.NavigationControl());
      },
    }
  };
</script>