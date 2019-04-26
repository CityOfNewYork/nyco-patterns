<template>
  <div>
    <p>Hello, I'm a map!</p>
    <div id='nyco-map' style='height: 400px; width: 500px'></div>
    <div id='nyco-map-menu' class='pt-2'></div>
    <div id="nyco-map-details">
      <h3>Layer details</h3>
      <p><strong>map layers:</strong> {{mapLayers}}</p>
      <p><strong>active layer:</strong> {{activeLayer}}</p>
      <div>
        <strong>selected zipcode:</strong>
        <span v-if='selectedZipcode'>{{selectedZipcode}}</span>
        <span v-else>none</span>
      </div>

      <div>
        <strong>selected neighborhood:</strong>
        <span v-if='selectedNeighborhood'>{{selectedNeighborhood}}</span>
        <span v-else>none</span>
      </div>

      <div>
        <strong>selected borough:</strong>
        <span v-if='selectedBorough'>{{selectedBorough}}</span>
        <span v-else>none</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      'layers': {
        type: Array
      },
      'config': {
        type: Object
      }
    },
    data() {
      return {
        map: null,
        mapLoaded: false,
        mapLayers: [],
        selectedZipcode: null,
        selectedNeighborhood: null,
        selectedBorough: null,
        activeLayer: undefined,
      };
    },
    mounted() {
      this.initializeMap();
    },
    beforeDestroy() {
      //destroy map
    },
    watch: {
      layers: function () {
        const layers = this.layers;

        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          this.createLayer(layer);

          if (layer.default)
            this.activeLayer = layer.name;

          if (this.mapLoaded) {
            this.addSource(layer.name, layer.data, ['in', layer.filterBy, ''], '#6c88c1');
          }
        }
      },
      'mapLayers': function () {
        this.toggleLayers(this.map, this.mapLayers);
      },
      'mapLoaded': function () {
        if (this.mapLoaded) {
          const layers = this.layers;

          for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];

            this.addSource(layer.name, layer.data, ['in', layer.filterBy, ''], '#6c88c1');
          }
        }
      }
    },
    methods: {
      createLayer(layer) {
        this.trackMapLayers(layer.name);
        this.registerOnClick(layer.name, layer.filterBy);
      },
      trackMapLayers(layerRef) {
        if (!this.mapLayers.includes(layerRef)) {
          this.mapLayers.push(layerRef);
        }
      },
      addSource(layerRef, layerData, filter, fill) {
        // add source if it doesn't already exist and layerData isn't empty
        if (this.map.getLayer(layerRef) === undefined && Object.entries(layerData).length !== 0) {
          const visibility = layerRef === this.activeLayer ? 'visible' : 'none';

          this.map.addSource(layerRef, {
            'type': 'geojson',
            'data': layerData
          });

          this.map.addLayer({
            'id': layerRef,
            'type': 'fill',
            'source': layerRef,
            'paint': {
              'fill-outline-color': '#484896',
              'fill-color': fill,
              'fill-opacity': 0.6
            },
            'layout': {
              'visibility': visibility
            }
          });

          this.map.addLayer({
            'id': `${layerRef}-highlighted`,
            'type': 'fill',
            'source': layerRef,
            'paint': {
              'fill-outline-color': '#484896',
              'fill-color': fill,
              'fill-opacity': 0.6
            },
            'filter': filter ? filter : [],
            'layout': {
              'visibility': visibility
            }
          });
        }
      },
      registerOnClick(layerRef, property) {
        this.map.on('click', layerRef, (e) => {
          // set bbox as reactangle area around clicked point
          let bbox = [[e.point.x, e.point.y], [e.point.x, e.point.y]];
          let features = this.map.queryRenderedFeatures(bbox, { layers: [layerRef] });

          const filter = features.reduce(function(memo, feature) {
            memo.push(feature.properties[property]);
            return memo;
          }, ['in', `${property}`]);

         // filter format: ['in', property, our_output]
          if (layerRef === 'zipcodes')
            this.selectedZipcode = filter[2];
          else if (layerRef === 'neighborhoods')
            this.selectedNeighborhood = filter[2];
          else if (layerRef === 'boroughs')
            this.selectedBorough = filter[2]

          // apply filter to highlighted area
          this.map.setFilter(`${layerRef}-highlighted`, filter);
        });
      },
      toggleLayers(map, layersToToggle) {
        const toggleableLayerIds = layersToToggle;
        const layers = document.getElementById('nyco-map-menu');
        const activeLayer = this.activeLayer;
        const appRef = this;

        // clear all child nodes before adding new ones
        while (layers.firstChild) {
          layers.removeChild(layers.firstChild);
        }

        for (let i = 0; i < toggleableLayerIds.length; i++) {
          const id = toggleableLayerIds[i];
          const link = document.createElement('a');

          link.href = '#';
          link.textContent = id;
          link.classList.add('inline-block', 'pr-1');

          if (id === activeLayer)
            link.classList.add('active');

          // update layer visibility on map and link active state on link click
          link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            const clickedLayer = this.textContent;
            let allLinks = layers.getElementsByTagName('a');

            for (let i = 0; i < allLinks.length; i++) {
              const layer = allLinks[i].textContent;
              const layerVisibility = map.getLayoutProperty(layer, 'visibility');

              // if our current layer is also our clicked layer
              if (clickedLayer === layer) {
                // if the layer is already visible, leave it alone
                if (layerVisibility === 'visible')
                  return;

                // if it's not visible, make it visible and set it as our active layer
                this.classList.add('active');
                // update active layer
                appRef.activeLayer = layer;

                map.setLayoutProperty(layer, 'visibility', 'visible');
                map.setLayoutProperty(`${layer}-highlighted`, 'visibility', 'visible');
              } else {
                // if our current layer is not our clicked layer
                // remove the active class and set visibility to none
                this.classList.remove('active');
                map.setLayoutProperty(layer, 'visibility', 'none');
                map.setLayoutProperty(`${layer}-highlighted`, 'visibility', 'none');
                map.setFilter(`${layer}-highlighted`, null);
              }
            }
          };

          layers.appendChild(link);
        }
      },
      initializeMap() {
        const mapConfig = this.config;

        mapboxgl.accessToken = mapConfig.APIKey;
        this.map = new mapboxgl.Map({
          container: mapConfig.containerId,
          center: mapConfig.center,
          zoom: mapConfig.zoom,
          style: mapConfig.style
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.on('load', () => this.mapLoaded = true);
      },
    }
  };
</script>