<template></template>

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
        mapPopup: null,
        mapFilter: null,
        activeLayer: null,
        mapLoaded: false,
        menuItems: [],
        selectedItems: [],
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

        if (this.config.mapType === 'multi') {
          for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            this.trackLayer(layer.name);

            if (layer.default || this.layers.length === 1)
              this.activeLayer = layer.name;

            if (this.mapLoaded)
              this.initializeLayer(layer);
          }
        } else if (this.config.mapType === 'single') {
          const layer = this.layers[0];

          this.activeLayer = layer.name;
          this.generateLegend(layer.data);

          if (this.mapLoaded)
            this.initializeLayer(layer);
        } else {
          throw new Error('mapType must be defined');
        }
      },
      'mapLoaded': function () {
        if (this.mapLoaded && this.layers.length) {
          const layers = this.layers;

          for (let i = 0; i < layers.length; i++) {
            this.initializeLayer(layers[i]);
          }
        }
      },
      'menuItems': function () {
        if (this.menuItems.length > 1)
          this.initializeToggle(this.menuItems);
      },
      'selectedItems': function () {
        const layer = this.layers[0];
        const filter = ['in', layer.legendColumn];

        for (let i = 0; i < this.selectedItems.length; i++) {
          filter.push(this.selectedItems[i])
        }

        if (this.selectedItems.length > 0) {
          let relatedFeatures = this.map.querySourceFeatures(layer.name, {
            sourceLayer: layer.name,
            filter: filter
          });

          // set filter when legend item selected
          this.map.setFilter(`${layer.name}-highlighted`, filter);
          this.map.setLayoutProperty(`${layer.name}-highlighted`, 'visibility', 'visible');
        }

        if (!this.selectedItems.length && !this.mapPopup) {
          this.map.setFilter(`${layer.name}-highlighted`, null);
          this.map.setLayoutProperty(`${layer.name}-highlighted`, 'visibility', 'none');
        }
      },
    },
    methods: {
      initializeMap() {
        const mapConfig = this.config;

        let options = {
          container: mapConfig.containerId,
        };

        if (mapConfig.center)
          options.center = mapConfig.center;

        if (mapConfig.style)
          options.style = mapConfig.style;

        if (mapConfig.zoom)
          options.zoom = mapConfig.zoom;

        mapboxgl.accessToken = mapConfig.APIKey;
        this.map = new mapboxgl.Map(options);
        this.map.addControl(new mapboxgl.NavigationControl());

        // disable map zoom when using scroll
        if (mapConfig.disableScroll)
          this.map.scrollZoom.disable();

        this.map.on('load', () => this.mapLoaded = true);
      },
      initializeLayer(layer) {
        if (this.map.getLayer(layer.name) === undefined && Object.entries(layer.data).length !== 0) {
          const visibility = layer.name === this.activeLayer ? 'visible' : 'none';
          const filter = layer.filterBy ? ['in', layer.filterBy, ''] : [];
          const fill = this.config.colors ? this.generateFillColor(this.config.colors) : layer.fill;

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
              'fill-opacity': 1
            },
            'filter': filter,
            'layout': {
              'visibility': visibility
            }
          });

          this.initializeFilter(layer);
          this.updateCursorOnHover(layer.name);
        }
      },
      initializePopup(event, layer) {
        this.config.mapType === 'multi' ? this.popupMultiLayer(event, layer) : this.popupSingleLayer(event, layer);
      },
      initializeToggle(toggleList) {
        this.config.mapType === 'multi' ? this.toggleMultiLayer(toggleList) : this.toggleSingleLayer(toggleList);
      },
      initializeFilter(layer) {
        this.config.mapType === 'multi' ? this.filterMultiLayer(layer) : this.filterSingleLayer(layer);
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
      generateFillColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
      },
      // multi layer
      trackLayer(reference) {
        if (!this.menuItems.includes(reference))
          this.menuItems.push(reference);
      },
      popupMultiLayer(event, layer) {
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
      filterMultiLayer(layer) {
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
      toggleMultiLayer(layersToToggle) {
        const $this = this;
        const map = $this.map;
        const activeLayer = $this.activeLayer;
        const linkContainer = document.getElementById(this.config.legendId);

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
      // single layer
      generateLegend(layerData) {
        layerData.features.forEach((feature) => {
          const item = feature.properties[this.layers[0].legendColumn];

          if (!this.menuItems.includes(item) && item)
            this.menuItems.push(item);
        });
      },
      popupSingleLayer(event, layer) {
        const $this = this;
        const map = $this.map;
        const layerName = `${layer.name}-highlighted`;

        // check whether shape falls under current legend selection
        let inCurrentSelection = true;
        let columnFilter = event.features[0].properties[layer.legendColumn];

        if (!$this.selectedItems.includes(columnFilter))
          inCurrentSelection = false;

        const popup = new mapboxgl.Popup()
                        .setLngLat(event.lngLat)
                        .setHTML(event.features[0].properties[layer.filterBy])
                        .addTo(map);

        if (popup.isOpen()) {
          $this.mapPopup = popup;

          // if there are no legend items selected, highlight selected map shape
          if (!$this.selectedItems.length) {
            map.setLayoutProperty(layerName, 'visibility', 'visible');
            map.setFilter(layerName, $this.mapFilter);
          }

          // if there are legend items selected and selected map shape isn't
          // within any of the selected legend items, highlight selected
          // map shape and clear legend
          if ($this.selectedItems.length > 0 && !inCurrentSelection) {
            map.setLayoutProperty(layerName, 'visibility', 'visible');
            map.setFilter(layerName, $this.mapFilter);

            // reset all checked legend items
            $this.selectedItems = [];
            const filterGroupInputs = document.getElementById(this.config.legendId).querySelectorAll('input:checked');

            for (let i = 0; i < filterGroupInputs.length; i++) {
              filterGroupInputs[i].checked = false;
            }
          }
        }

        popup.on('close', function () {
          // reset associated states when popup dismissed while active
          if ($this.mapPopup === popup) {
            $this.mapPopup = null;
            $this.mapFilter = null;

            // if there are no legend items selected, reset all filters
            if (!$this.selectedItems.length) {
              map.setFilter(layerName, null);
              map.setLayoutProperty(layerName, 'visibility', 'none');
            }
          }
        });
      },
      filterSingleLayer(layer) {
        const $this = this;
        const map = $this.map;

        map.on('click', layer.name, (e) => {
          // set bbox as reactangle area around clicked point
          let bbox = [[e.point.x, e.point.y], [e.point.x, e.point.y]];
          let features = map.queryRenderedFeatures(bbox, { layers: [layer.name] });
          let legendColumnValue = null;

          const filter = features.reduce(function(memo, feature) {
            legendColumnValue = feature.properties[layer.legendColumn];
            memo.push(feature.properties[layer.filterBy]);
            return memo;
          }, ['in', `${layer.filterBy}`]);

          $this.mapFilter = filter;
          $this.initializePopup(e, layer);
        });
      },
      toggleSingleLayer(filtersToToggle) {
        const $this = this;
        const map = $this.map;
        const filterGroup = document.getElementById(this.config.legendId);

        const layer = $this.layers[0];
        const legendColumn = layer.legendColumn;

        // clear all links before appending new ones to prevent duplicates
        while (filterGroup.firstChild) {
          filterGroup.removeChild(filterGroup.firstChild);
        }

        // initilize an input element for each filter type
        for (let i = 0; i < filtersToToggle.length; i++) {
          const layerRef = filtersToToggle[i];

          // checkbox
          const input = document.createElement('input');
          input.type = 'checkbox';
          input.id = layerRef;
          input.value = layerRef;
          filterGroup.appendChild(input);

          // checkbox label
          const label = document.createElement('label');
          label.setAttribute('for', layerRef);
          label.setAttribute('title', layerRef);
          label.textContent = layerRef;
          filterGroup.appendChild(label);

          // when the checkbox changes state, update the selected items array.
          input.addEventListener('change', function(e) {
            const item = e.target.value;

            // reset the checkboxes checked state
            e.target.checked ? 'visible' : 'none';

            // remove popup if one exists
            if ($this.mapPopup)
              $this.mapPopup.remove();

            if (e.target.checked && !$this.selectedItems.includes(item))
              $this.selectedItems.push(item);

            if (!e.target.checked && $this.selectedItems.includes(item)) {
              $this.selectedItems = $this.selectedItems.filter((val) => {
                return val !== item;
              });
            }
          });
        }
      }
    }
  };
</script>