let map = L.map('map').setView([-27.495432, 153.012024], 15);

// FIXME the arcgis' map has some problems.

// L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', {
//     apikey: "AAPKb74ce1d9657b4e7a937e5d491f507f80I6a303ICiJJ0cg5QgZhry93CHhjFPZOFp6LzeYpZ9JGcBgN1mdLirFVut47IjMZ-"
// }).addTo(map);

// Using the basic map to replace the api map.
L.esri.basemapLayer('Topographic').addTo(map);

let routes = L.esri.featureLayer({
    url: 'https://services2.arcgis.com/dEKgZETqwmDAh1rP/ArcGIS/rest/services/Bicycle_network_overlay/FeatureServer/0',
    // where: "DESCRIPTION = 'Primary cycle route'"
});

console.log(routes);

// Add a bounds aroud uq.
let southWest = L.latLng(-27.5014174, 152.9891076);
let northEast = L.latLng(-27.4776612, 153.0417289);
let bounds = L.latLngBounds(southWest, northEast);
map.fitBounds(bounds);

// Query for the routes within the bounds.
routes.query()
    .within(bounds)
    .run(function (error, featureCollection) {
        console.log(featureCollection);

        L.geoJSON(featureCollection).addTo(map);
    });

// Add routes to basic map.
// routes.addTo(map);
// routes.setWhere("DESCRIPTION = 'Secondary cycle route'");
