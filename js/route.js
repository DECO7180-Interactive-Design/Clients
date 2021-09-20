let map = L.map('map').setView([-27.495432, 153.012024], 12);

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

console.log(routes);

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
// map.fitBounds(bounds);

// Query for primary clcle routes
// routes.query()
//     // .within(bounds)
//     .where("DESCRIPTION = 'Primary cycle route'")
//     .run(function (error, primaryRoutes) {
//         // console.log(primaryRoutes);

//         L.geoJSON(primaryRoutes, {
//             style: primaryStyle
//         }).addTo(map);
//     });

// // Query for local cycle routes.
// routes.query()
//     // .within(bounds)
//     .where("DESCRIPTION = 'Local cycle route'")
//     .run(function (error, secondaryRoutes) {
//         // console.log(secondaryRoutes);

//         L.geoJSON(secondaryRoutes, {
//             style: secondaryStyle
//         }).addTo(map);
//     });


// Add routes to basic map.
// routes.addTo(map);
// routes.setWhere("DESCRIPTION = 'Secondary cycle route'");

// routes.query()
//     .run(function (error, routes) {
//         console.log(routes);
//         L.geoJSON(routes, {
//             style: primaryStyle
//         }).addTo(map);
//     });

let filterButton = document.getElementById("filterButton");

// Get the values from html's form.
// filterButton.addEventListener("click", function() {
//     let exerciseLevel = document.getElementById("filter").elements.namedItem("exerciseLevel").value;
//     let ridingTime = document.getElementById("filter").elements.namedItem("ridingTime").value;

//     if (exerciseLevel == "easy") {
//         console.log(exerciseLevel, ridingTime);
//         routes.setWhere('Shape__Length < 2000');
//     } else if (exerciseLevel == "balanced") {
//         console.log(exerciseLevel, ridingTime);
//         routes.setWhere('Shape__Length >= 2000 and Shape__Length < 5000');
//     } else if (exerciseLevel == "hard") {
//         console.log(exerciseLevel, ridingTime);
//         routes.setWhere('Shape__Length >=5000');
//     }
// });

// Step 1
let marker;
let circle;
let query;
let queryLayer = L.layerGroup();
const radius = 3000; // radius is 3km

// test for click route segments.
// circle = L.circle([-27.495432, 153.012024], radius).addTo(map);
// map.fitBounds(circle.getBounds());
// query = routes.query()
//     .within(circle.getBounds());
function choosePoint() {
    map.on('click', function (point) {
        if (marker || circle) {
            map.removeLayer(marker);
            map.removeLayer(circle);
        }
        console.log(point.latlng);
        marker = L.marker(point.latlng).addTo(map);
        circle = L.circle(point.latlng, radius).addTo(map);
        const bounds = circle.getBounds();
        // map.fitBounds(bounds, {padding: [30, 30]});
        map.fitBounds(bounds);

        query = routes.query()
            .within(bounds);
    });
}



// Step 2 & 3
function easyRoutes() {
    if (query) {
        map.removeLayer(query);
        query.where('Shape__Length < 2000')
            .run(function (error, interestPoint) {
                if (error) {
                    return;
                }
                queryLayer.clearLayers();
                let routesLayer = L.geoJSON(interestPoint);
                routesLayer.addTo(queryLayer);
                queryLayer.addTo(map);
                routesLayer.on('click', function (event) {
                    console.log(event.layer.feature.properties);
                });
            });
    }
}

function banlancedRoutes() {
    if (query) {
        map.removeLayer(query);
        query.where('Shape__Length >= 2000 and Shape__Length < 5000')
            .run(function (error, interestPoint) {
                if (error) {
                    return;
                }
                queryLayer.clearLayers();
                let routesLayer = L.geoJSON(interestPoint);
                routesLayer.addTo(queryLayer);
                queryLayer.addTo(map);
                routesLayer.on('click', function (event) {
                    console.log(event.layer.feature.properties);
                });
            });
    }
}

function hardRoutes() {
    if (query) {
        map.removeLayer(query);
        query.where('Shape__Length >= 5000')
            .run(function (error, interestPoint) {
                if (error) {
                    return;
                }
                queryLayer.clearLayers();
                let routesLayer = L.geoJSON(interestPoint);
                routesLayer.addTo(queryLayer);
                queryLayer.addTo(map);
                routesLayer.on('click', function (event) {
                    console.log(event.layer.feature.properties);
                });
            });
    }

}

// only allow to choose one option each line.
$('input[type="checkbox"]').on('change', function () {
    $(this).siblings('input[type="checkbox"]').prop('checked', false);
})

// Step 4
function showSlides() {
    $('#slideshow').css('visibility', 'visible');
}