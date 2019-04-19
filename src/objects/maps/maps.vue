<template>
  <div>
    <p>Hello, I'm a map!</p>
    <div id='nyco-map' style='height: 400px; width: 500px'></div>
    <div id='nyco-map-menu' class='pt-2'></div>
    <div id="nyco-map-details">
      Information from selected shape:
      <span v-if='selectedZipcode'>{{selectedZipcode}}</span>
      <span v-else>none</span>
    </div>
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
        mapLayers: [],
        selectedZipcode: null,
      };
    },
    mounted() {
      this.initializeMap();
    },
    beforeDestroy() {
      //destroy map
    },
    watch: {
      'data.zipcodes': function () {
        this.createZipcodeLayer(this.map, this.data.zipcodes);
      },
      // 'data.boroughs': function () {
      //   this.createBoroughLayer(this.map, this.data.boroughs);
      // },
      // 'data.neighborhoods': function () {
      //   this.createNeighborhoodLayer(this.map, this.data.neighborhoods);
      // },
      'mapLayers': function () {
        this.toggleLayers(this.map, this.mapLayers);
      },
    },
    methods: {
      trackMapLayers(layerRef) {
        if (!this.mapLayers.includes(layerRef)) {
          this.mapLayers.push(layerRef);
        } else {
          throw new Error("Map layer already exists");
        }
      },
      createZipcodeLayer(map, layerData) {
        if (!map || !layerData) {
          throw Error(`Required ${map ? 'layerData' : 'map'} param is empty`);
        }

        const layerRef = 'zipcodes';
        this.trackMapLayers(layerRef);

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
              'fill-outline-color': '#484896',
              'fill-color': '#6c88c1',
              'fill-opacity': 0.6
            }
          });

          map.addLayer({
            'id': `${layerRef}-highlighted`,
            'type': 'fill',
            'source': `${layerRef}`,
            'paint': {
              'fill-outline-color': '#000',
              'fill-color': '#6c88c1',
              'fill-opacity': 0.6
            },
            'filter': ['in', 'GEOID10', '']
          });
        });

        map.on('click', (e) => {
          // set bbox as reactangle area around clicked point
          let bbox = [[e.point.x, e.point.y], [e.point.x, e.point.y]];
          let features = map.queryRenderedFeatures(bbox, { layers: [`${layerRef}`] });

          // run through the selected features and set a filter
          // to match features with unique GEOID10 codes to activate
          // the `zipcodes-highlighted` layer.
          const filter = features.reduce(function(memo, feature) {
            memo.push(feature.properties.GEOID10);
            return memo;
          }, ['in', 'GEOID10']);

          // filter format: ['in', 'GEOID10', 'zip']
          this.selectedZipcode = filter[2];;
          map.setFilter(`${layerRef}-highlighted`, filter);
        });
      },
      createBoroughLayer(map, layerData) {
        if (!map || !layerData) {
          throw Error(`Required ${map ? 'layerData' : 'map'} param is empty`);
        }

        const layerRef = 'boroughs';
        this.trackMapLayers(layerRef);

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
        this.trackMapLayers(layerRef);

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
      toggleLayers(map, layersToToggle) {
        const toggleableLayerIds = layersToToggle;
        const layers = document.getElementById('nyco-map-menu');

        // clear all child nodes before adding new ones
        while (layers.firstChild) {
          layers.removeChild(layers.firstChild);
        }

        for (let i = 0; i < toggleableLayerIds.length; i++) {
          const id = toggleableLayerIds[i];
          const link = document.createElement('a');

          link.href = '#';
          link.classList.add('active', 'inline-block', 'pr-1');
          link.textContent = id;

          link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            const clickedLayer = this.textContent;
            const visibility = map.getLayoutProperty(clickedLayer, 'visibility');

            if (visibility === 'visible') {
              map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              this.classList.remove('active');
            } else {
              this.classList.add('active');
              map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
          };

          layers.appendChild(link);
        }
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