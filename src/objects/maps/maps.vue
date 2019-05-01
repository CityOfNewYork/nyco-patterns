<template>
  <div>
    <div id='nyco-map' style='height: 400px; width: 500px'></div>
    <div id='nyco-map-menu' class='pt-2'></div>
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
        mapLayers: [],
        mapLoaded: false,
        mapPopup: null,
        mapFilter: null,
        activeLayer: undefined,
      };
    },
    mounted() {
      this.initializeMap();
    },
    destroyed() {
      this.map.remove();
    },
    watch: {
      'layers': function () {
        const layers = this.layers;

        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          this.trackLayer(layer.name);

          if (layer.default)
            this.activeLayer = layer.name;

          if (this.mapLoaded)
            this.initializeLayer(layer);
        }
      },
      'mapLayers': function () {
        if (this.mapLayers.length > 1)
          this.enableLayerToggling(this.mapLayers);
      },
      'mapLoaded': function () {
        if (this.mapLoaded) {
          const layers = this.layers;

          for (let i = 0; i < layers.length; i++) {
            this.initializeLayer(layers[i]);
          }
        }
      }
    },
    methods: {
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
      initializeLayer(layer) {
        if (this.map.getLayer(layer.name) === undefined && Object.entries(layer.data).length !== 0) {
          const visibility = layer.name === this.activeLayer ? 'visible' : 'none';
          const filter = layer.filterBy ? ['in', layer.filterBy, ''] : [];
          const fill = this.generateFillColor();

          this.map.addSource(layer.name, {
            'type': 'geojson',
            'data': layer.data
          });

          this.map.addLayer({
            'id': layer.name,
            'type': 'fill',
            'source': layer.name,
            'paint': {
              'fill-outline-color': fill[0],
              'fill-color': fill[1],
              'fill-opacity': 0.7
            },
            'layout': {
              'visibility': visibility
            }
          });

          this.map.addLayer({
            'id': `${layer.name}-highlighted`,
            'type': 'fill',
            'source': layer.name,
            'paint': {
              'fill-outline-color': fill[0],
              'fill-color': fill[1],
              'fill-opacity': 0.7
            },
            'filter': filter,
            'layout': {
              'visibility': visibility
            }
          });

          this.filterOnClick(layer);
          this.updateCursorOnHover(layer.name);
        }
      },
      initializePopup(event, layer) {
        const $this = this;
        const map = $this.map;
        const layerName = `${layer.name}-highlighted`;
        const popup = new mapboxgl.Popup()
                        .setLngLat(event.lngLat)
                        .setHTML(event.features[0].properties[layer.filterBy])
                        .addTo(map);

        if (popup.isOpen()) {
          $this.mapPopup = popup;
          map.setLayoutProperty(layerName, 'visibility', 'visible');
          map.setFilter(layerName, $this.mapFilter);
        }

        popup.on('close', function () {
          // reset associated states when popup dismissed while active
          if ($this.mapPopup === popup) {
            $this.mapPopup = null;
            $this.mapFilter = null;
            map.setFilter(layerName, null);
            map.setLayoutProperty(layerName, 'visibility', 'none');
          }
        });
      },
      trackLayer(reference) {
        if (!this.mapLayers.includes(reference))
          this.mapLayers.push(reference);
      },
      filterOnClick(layer) {
        const $this = this;
        const map = $this.map;

        map.on('click', layer.name, (e) => {
          // set bbox as reactangle area around clicked point
          let bbox = [[e.point.x, e.point.y], [e.point.x, e.point.y]];
          let features = map.queryRenderedFeatures(bbox, { layers: [layer.name] });

          const filter = features.reduce(function(memo, feature) {
            memo.push(feature.properties[layer.filterBy]);
            return memo;
          }, ['in', `${layer.filterBy}`]);

          $this.mapFilter = filter;
          $this.initializePopup(e, layer);
        });
      },
      updateCursorOnHover(layerId) {
        const map = this.map;

        // change the cursor to a pointer when the mouse is over the layer.
        map.on('mouseenter', layerId, function () {
          map.getCanvas().style.cursor = 'pointer';
        });

        // change the cursor back to the default when it leaves the layer.
        map.on('mouseleave', layerId, function () {
          map.getCanvas().style.cursor = '';
        });
      },
      generateFillColor() {
        // NYCO colors, ['fill-outline', 'fill']
        const colors = [
          // dark blue
          ['#2F334F', '#6E7085'],
          // blue
          ['#3155A6', '#6C88C1'],
          // red
          ['#2F334F', '#F2695D'],
          // gray
          ['#2F334F', '#ACAEB9'],
          // orange
          ['#3155A6', '#F9A137']
        ];

        return colors[Math.floor(Math.random() * colors.length)];
      },
      enableLayerToggling(layersToToggle) {
        const $this = this;
        const map = $this.map;
        const activeLayer = $this.activeLayer;
        const linkContainer = document.getElementById('nyco-map-menu');

        // clear all links before appending new ones to prevent duplicates
        while (linkContainer.firstChild) {
          linkContainer.removeChild(linkContainer.firstChild);
        }

        for (let i = 0; i < layersToToggle.length; i++) {
          const layerRef = layersToToggle[i];
          const link = document.createElement('a');

          link.href = '#';
          link.textContent = layerRef;

          if (layerRef === activeLayer)
            link.classList.add('active');

          // on click update link state, active layer reference, and layer visibility
          link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            const selectedLayer = this.textContent;
            const links = linkContainer.getElementsByTagName('a');

            // remove active popup
            if ($this.mapPopup)
              $this.mapPopup.remove();

            for (let i = 0; i < links.length; i++) {
              const currentLink = links[i];
              const currentLayer = currentLink.textContent;
              const currentLayerHighlight = `${currentLayer}-highlighted`;
              const layerVisibility = map.getLayoutProperty(currentLayer, 'visibility');

              if (currentLayer === selectedLayer) {
                // return if layer is already selected
                if (layerVisibility === 'visible' && currentLink.classList.contains('active'))
                  return;

                // set our current layer as the global active layer,
                // add active class to link, set layer as visible
                $this.activeLayer = currentLayer;
                currentLink.classList.add('active');
                map.setLayoutProperty(currentLayer, 'visibility', 'visible');
              } else {
                // remove links active class, set layer visibility to none and remove filters
                currentLink.classList.remove('active');
                map.setLayoutProperty(currentLayer, 'visibility', 'none');
                map.setLayoutProperty(currentLayerHighlight, 'visibility', 'none');
                map.setFilter(currentLayerHighlight, null);
              }
            }
          };

          linkContainer.appendChild(link);
        }
      },
    }
  };
</script>