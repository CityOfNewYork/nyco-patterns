<template>
  <div>
    <p>Hello, I'm a map!</p>
    <div id='nyco-map' style='height: 300px; width: 300px'></div>
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
    methods: {
      initializeMap() {
        mapboxgl.accessToken = this.data.api_key;

        console.log("initializeMap => ", this.data);

        this.map = new mapboxgl.Map({
          container: 'nyco-map',
          // [longitude, latitude]
          center: [-73.986710, 40.693391],
          // the initial zoom level of the map
          zoom: 14,
          style: 'mapbox://styles/mapbox/streets-v11'
        });

        this.map.addControl(new mapboxgl.NavigationControl());
      }
    }
  };
</script>