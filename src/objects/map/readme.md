### Setup

The map is a Vue component powered by [Mapbox](https://www.mapbox.com/) and requires a Mapbox `access token` to initialize in a project. Follow the Mapbox documentation at this [link](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#creating-and-managing-access-tokens) to create an `access token`.

Note: If a `403 (Forbidden)` error from Mapbox is encountered, make sure the project is using a valid Mapbox `access token`.

Both map types expect the layer source to be GeoJSON. All GeoJSON source layers used to render a map object should be valid Feature Collection's and contain only one geometry field per feature. [Learn more about GeoJSON](https://geojson.org/).

Note: If the map loads but the layer doesn't display, make sure the GeoJSON is valid and the layer object is properly configured.

### Installation

Install the `nyco-patterns` npm package by running `npm install nyco-patterns` in the project root directory.

Example of Component Usage in a Vue App:

    // demo.vue

    <template>
      <div class='o-map'>
        <nyco-map id='nyco-map-ml' :layers='layers' :config='config' style='height: 400px; width: 500px'></nyco-map>
        <div id='map-menu' class='map-menu'></div>
      </div>
    </template>

    <script>
      import NycoMap from '../node_modules/nyco-patterns/src/objects/map/map.vue';

      export default {
        name: 'Map',
        data() {
          config: {
            APIKey: 'pk.eydcdxckbhbjhbjhbhj',
            containerId: 'nyco-map-ml',
            legendId: 'map-menu',
            center: [-73.986710, 40.693391],
            zoom: 9,
            style: 'mapbox://styles/nyco-products/cjv6wjq8812ys1gp39mnvuk2w',
            mapType: 'multi',
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
          ]
        },
        components: {
          NycoMap
        },
      }
    </script>

### Dependencies

This component depends on [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/).

### Map Configuration

The `config` attributes `APIKey`, `containerId`, `center`, `zoom`, and `style` are all Mapbox attributes. You can read more about these in their [API Reference docs](https://docs.mapbox.com/mapbox-gl-js/api/).

Option          | Type        | Importance | Description
----------------|:-----------:|:----------:|------------|
`APIKey`        | *string*         | required   | The Mapbox Access Token ([setup](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)).
`containerId`   | *string* | required   | The `id` of the container where the map is to be created.
`legendId`      | *string* | required   | The `id` of the container where the legend/toggle menu is to be created.
`center`        | *array*      | optional   | The initial geographical centerpoint of the map. Default is [0, 0]
`zoom`          | *number*       | optional   | The initial zoom level of the map. Default is 0.
`style`         | *object/string*       | required   | The map's Mapbox style. This must be an a JSON object conforming to the schema described in the [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/), or a URL to such JSON.
`disableScroll` | *boolean*       | optional   | Set to `true` to disable map zoom when using scroll.
`mapType`       | *string*       | required   | The type of map to be rendered. It can be `single` or `multi`.
`colors`       | *array*       | optional*  | The `fill-outline` and `fill` color applied to a layer. The `colors` array is a list of hex value (*string*) color combinations: `['#000000', '#F2695D']`. The first value is applied as the `fill-outline` and the second as the `fill`. A color combination is applied to a layer at random, so multiple layers may share the same color combination. This attribute overrides the `layer.fill` attribute.

### Layer Configuration

The `layers` array requires at least one layer object to render. The object options are below:

Option          | Type        | Importance | Description
----------------|:-----------:|:----------:|------------|
`name`         | *string*  | required   | The layer name, also set as the Mapbox layer `id` and `source`. For the `multi` map, this value is used to generate the map menu (toggle links).
`data`         | *object* | required   | The GeoJSON layer/source data.
`filterBy`     | *string*  | required   | The column (feature property) to be filtered when interacting with a polygon shape on the map. This is the value that is displayed in the popup and determines the map shape selection (highlight) on click.
`fill`         | *array*  | required*   | The `fill-outline` and `fill` color applied to the layer. The array must contain two hex values (*string*): `['#000000', '#F2695D']`. The first value is applied as the `fill-outline` and the second as the `fill`. This attribute is overwritten by the `config.colors` attribute.
`default`      | *string*  | required   | This ensures a specific layer is displayed on map load for a `multi` map type, with multiple layers. Set to `true` to display layer on map load, set to `false` or omit otherwise.
`legendColumn` | *string*  | required   | The column (feature property) to be filtered when interacting with the legend/menu for a `single` map type. The unique values of this feature property make up the legend items. All features with matching properties will be highlighted when selected through the legend.
