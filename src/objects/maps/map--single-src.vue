<template>
  <div>
    <div id='nyco-map-ssrc' style='height: 400px; width: 500px'></div>
    <nav id='map-legend' class='map-legend'></nav>
  </div>
</template>

<script>
  export default {
    props: {
      'layer': {
        type: Object
      },
      'config': {
        type: Object
      }
    },
    data() {
      return {
        map: null,
        legendItems: [],
        selectedItems: [],
        mapLoaded: false,
        mapPopup: null,
        mapFilter: null,
      };
    },
    mounted() {
      this.initializeMap();
    },
    destroyed() {
      this.map.remove();
    },
    watch: {
      'layer': function () {
        const layer = this.layer;

        this.generateLegend(layer.data);

        if (this.mapLoaded)
          this.initializeLayer(layer);
      },
      'legendItems': function () {
        if (this.legendItems.length > 1)
          this.enableFilterToggling(this.legendItems);
      },
      'mapLoaded': function () {
        if (this.mapLoaded && this.layer)
          this.initializeLayer(this.layer);
      },
      'selectedItems': function () {
        const layer = this.layer;
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
              'visibility': 'visible'
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
              'visibility': 'visible'
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
            const filterGroupInputs = document.getElementById('map-legend').querySelectorAll('input:checked');

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
      generateLegend(layerData) {
        layerData.features.forEach((feature) => {
          const item = feature.properties[this.layer.legendColumn];

          if (!this.legendItems.includes(item) && item)
            this.legendItems.push(item);
        });
      },
      filterOnClick(layer) {
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
          // black, red
          ['#000000', '#F2695D'],
          // black, orange
          ['#000000', '#FFA133'],
          // dark blue, gray
          ['#2F334F', '#ACAEB9'],
          // blue, orange
          ['#3155A6', '#F9A137']
        ];

        return colors[Math.floor(Math.random() * colors.length)];
      },
      enableFilterToggling(filtersToToggle) {
        const $this = this;
        const map = $this.map;
        const filterGroup = document.getElementById('map-legend');

        const layer = $this.layer;
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
      },
    }
  };
</script>