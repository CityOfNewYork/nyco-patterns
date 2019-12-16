The <code>single</code> map type accepts a single GeoJSON layer and displays a legend based on the defined feature property (<code>legendColumn</code> attribute).

In this example, the layer can be filtered by selecting a borough from the legend or by clicking a polygon shape on the map. The information displayed in the popup is based on the <code>filterBy</code> attribute set for the layer.

To utilize this map, set <code>mapType: 'single'</code> in the <code>config</code> object.
