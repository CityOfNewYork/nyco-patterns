The <code>multi</code> map type accepts one or more GeoJSON layers. When a single layer is set for this object, the menu (<code>nyco-map-menu</code>) is omitted.

In this example, zipcodes, neighborhoods, and boroughs are each individual GeoJSON Feature Collection objects. Click events on the polygon shapes in the map will display information based on the <code>filterBy</code> attribute set for the layer.

To utilize this map, set <code>mapType: 'multi'</code> in your <code>config</code> object.
