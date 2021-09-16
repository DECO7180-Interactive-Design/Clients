let map = L.map('map').setView([-27.495432, 153.012024], 15);

// FIXME the arcgis' map has some problems.

// L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', {
//     apikey: "AAPKb74ce1d9657b4e7a937e5d491f507f80I6a303ICiJJ0cg5QgZhry93CHhjFPZOFp6LzeYpZ9JGcBgN1mdLirFVut47IjMZ-"
// }).addTo(map);

// Using the basic map to replace the api map.
L.esri.basemapLayer('Topographic').addTo(map);

const routes = L.esri.featureLayer({
    url: 'https://services2.arcgis.com/dEKgZETqwmDAh1rP/ArcGIS/rest/services/Bicycle_network_overlay/FeatureServer/0',
    // where: "DESCRIPTION = 'Primary cycle route'"
});

// console.log(routes);

// Set the style (colour) of different route type.
let primaryStyle = {
    "color": "#EB92BE"
};

let secondaryStyle = {
    "color": "#C2F784"
}

// Add a bounds aroud uq.
let southWest = L.latLng(-27.5014174, 152.9891076);
let northEast = L.latLng(-27.4776612, 153.0417289);
let bounds = L.latLngBounds(southWest, northEast);
map.fitBounds(bounds);

// Query for primary clcle routes
routes.query()
    .within(bounds)
    .where("DESCRIPTION = 'Primary cycle route'")
    .run(function (error, primaryRoutes) {
        // console.log(primaryRoutes);

        L.geoJSON(primaryRoutes, {
            style: primaryStyle
        }).addTo(map);
    });


// Query for local cycle routes.
routes.query()
    .within(bounds)
    .where("DESCRIPTION = 'Local cycle route'")
    .run(function (error, secondaryRoutes) {
        // console.log(secondaryRoutes);

        L.geoJSON(secondaryRoutes, {
            style: secondaryStyle
        }).addTo(map);
    });

// Add routes to basic map.
// routes.addTo(map);
// routes.setWhere("DESCRIPTION = 'Secondary cycle route'");


function submitFilter() {
    let exerciseLevel = document.getElementById("filter").elements.namedItem("exerciseLevel").value;
    let ridingTime = document.getElementById("filter").elements.namedItem("ridingTime").value;
    console.log(exerciseLevel, ridingTime);
}
