let map = L.map("map").setView([-27.495432, 153.012024], 14);

// Use the ArcGIS's map.
L.esri.Vector.vectorBasemapLayer("ArcGIS:Topographic", {
  apikey: "AAPKb74ce1d9657b4e7a937e5d491f507f80I6a303ICiJJ0cg5QgZhry93CHhjFPZOFp6LzeYpZ9JGcBgN1mdLirFVut47IjMZ-",
}).addTo(map);

// User cannot continue to zoom out again when reachs the threshold.
map.options.minZoom = 11;

const routes = L.esri.featureLayer({
  url: "https://services2.arcgis.com/dEKgZETqwmDAh1rP/ArcGIS/rest/services/Bicycle_network_overlay/FeatureServer/0",
});

const river = L.esri.featureLayer({
  url: "https://services2.arcgis.com/dEKgZETqwmDAh1rP/arcgis/rest/services/Waterway_corridors_overlay_Brisbane_River_corridor_section_boundary/FeatureServer/0",
});

let routesBounds;
routes.query().run(function (error, interestPoint) {
  if (error) {
    return;
  }
  routesBounds = L.geoJSON(interestPoint).getBounds();
  L.rectangle(routesBounds, { color: "#50CB93", weight: 3, interactive: false, fill: false }).addTo(map);
});

// Set the style (colour) of different route type.
let primaryStyle = {
  color: "#50CB93",
  weight: 5,
};

let secondaryStyle = {
  color: "#7c83fd",
};

let riverRoutes = L.layerGroup();
let riverRoutesId = [];
function addRiverRoutes(feature) {
  routes
    .query()
    .within(L.geoJSON(feature))
    .run(function (error, riverView) {
      if (error) {
        return;
      }
      riverView.features.forEach(function (feature) {
        riverRoutesId.push(feature["id"]);
      });
      L.geoJSON(riverView, {
        style: secondaryStyle,
      }).addTo(riverRoutes);
    });
}

// Store all river view routes's id in an array.
river.query().run(function (error, riverBounds) {
  if (error) {
    return;
  }
  riverBounds.features.forEach(addRiverRoutes);
});

// Step 1
let routesLevel;
let marker;
let circle;
let query;
let queryLayer = L.layerGroup();
const radius = 3000; // radius is 3km

function choosePoint() {
  map.on("click", function (point) {
    if (!routesBounds.contains(point.latlng)) {
      alert("Please choose the point in the bounds");
    } else {
      if (marker || circle) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }
      marker = L.marker(point.latlng, { interactive: false }).addTo(map);
      circle = L.circle(point.latlng, radius, {
        color: "grey",
        opacity: 0.3,
        interactive: false,
      }).addTo(map);
      const bounds = circle.getBounds();
      map.fitBounds(bounds);
      query = routes.query().within(bounds);
      map.off("click");

      if (routesLevel && buttonId) {
        routesFilter(routesLevel, buttonId);
      }
    }
  });
}

function pickRoutes(routesCollection) {
  let dict = routesCollection._layers;
  let key = Object.keys(dict)[Math.floor(Math.random() * Object.keys(dict).length)];
  return dict[key];
}

function displayRoute(route, place) {
  keys = Object.keys(route._layers);
  key = parseInt(keys[0]);
  route = route._layers[key];
  let id = route.feature.properties["OBJECTID"];
  let length = route.feature.properties["Shape__Length"];
  length = Math.round(length) / 1000;
  let description = route.feature.properties["DESCRIPTION"];

  if ($(`.slides:nth-child(${place}) p`).length) {
    $(`.slides:nth-child(${place}) p`).remove();
    $(`.slides:nth-child(${place}) article`).append(`<p>${length} Km</p>`);
  } else {
    $(`.slides:nth-child(${place}) article`).append(`<p>${length} Km</p>`);
  }
}

let route1;
let route2;
let route3;
function recommend(routesCollection) {
  route1 = pickRoutes(routesCollection);
  route2 = pickRoutes(routesCollection);
  route3 = pickRoutes(routesCollection);
  displayRoute(route1, 1);
  displayRoute(route2, 2);
  displayRoute(route3, 3);
}

let routeCoords = 0;
function storeCoords() {
  coordsList = [];
  if (routeCoords) {
    routeCoords.forEach(function (coord) {
      coordsList.push(coord["lat"]);
      coordsList.push(coord["lng"]);
    });
    sessionStorage.setItem("coordsArray", coordsList);
  }
}

// Step 2 & 3
function noDevelop() {
  alert("Under developing");
}

let buttonId;
function routesFilter(level, idName) {
  if ($(`#${idName}`).is(":checked")) {
    buttonId = idName;
    routesLevel = level;
    let queryCondition;
    if (level == "easy") {
      queryCondition = "Shape__Length < 2000 and Shape__Length > 500";
    } else if (level == "balanced") {
      queryCondition = "Shape__Length >= 2000 and Shape__Length < 5000";
    } else if (level == "hard") {
      queryCondition = "Shape__Length >= 5000";
    }
    if (query) {
      map.removeLayer(query);
      query.where(queryCondition).run(function (error, interestPoint) {
        if (error) {
          return;
        }
        let btnContent =
          '<div class=\'route-buttons\'> \
            <button class= onclick="noDevelop()"}>Photos</button> \
            <button onclick="noDevelop()"}>Comments</button> \
            <button onclick="window.location.href=\'touring.html\'; storeCoords();">Select</a></button></div>';
        queryLayer.clearLayers();
        interestPoint.features.forEach(function (feature) {
          if (level == "easy") {
            if (riverRoutesId.includes(feature["id"])) {
              L.geoJSON(feature, {
                weight: 7,
                onEachFeature: function (f, l) {
                  let routeDistance = Math.round(f.properties["Shape__Length"] / 10) / 100;
                  l.bindPopup(
                    "<p>" +
                      JSON.stringify(`Distance: ${routeDistance}km`).replace(/[\{\}"]/g, "") +
                      "</p>" +
                      "<br>" +
                      btnContent
                  );
                },
              })
                .addTo(queryLayer)
                .on("click", function (e) {
                  routeCoords = e.layer._latlngs;
                })
                .on("mouseover", function (e) {
                  e.layer.setStyle({ color: "#4E9F3D" });
                })
                .on("mouseout", function (e) {
                  e.layer.setStyle({ color: "#2F87FF" });
                })
            }
          } else {
            L.geoJSON(feature, {
              weight: 7,
              onEachFeature: function (f, l) {
                let routeDistance = Math.round(f.properties["Shape__Length"] / 10) / 100;
                l.bindPopup(
                  "<p>" +
                    JSON.stringify(`Distance: ${routeDistance}km`).replace(/[\{\}"]/g, "") +
                    "</p>" +
                    "<br>" +
                    btnContent
                );
              },
            })
              .addTo(queryLayer)
              .on("click", function (e) {
                routeCoords = e.layer._latlngs;
              })
              .on("mouseover", function (e) {
                e.layer.setStyle({ color: "#4E9F3D" });
              })
              .on("mouseout", function (e) {
                e.layer.setStyle({ color: "#2F87FF" });
              })
          }
        });
        // If the slected area no river view route, change the filter.
        if (level == "easy" && Object.keys(queryLayer._layers).length == 0) {
          queryLayer.clearLayers();
          interestPoint.features.forEach(function (feature) {
            L.geoJSON(feature, {
              weight: 7,
              onEachFeature: function (f, l) {
                let routeDistance = Math.round(f.properties["Shape__Length"] / 10) / 100;
                l.bindPopup(
                  "<p>" +
                    JSON.stringify(`Distance: ${routeDistance}km`).replace(/[\{\}"]/g, "") +
                    "</p>" +
                    "<br>" +
                    btnContent
                );
              },
            })
              .addTo(queryLayer)
              .on("click", function (e) {
                routeCoords = e.layer._latlngs;
              })
              .on("mouseover", function (e) {
                e.layer.setStyle({ color: "#4E9F3D" });
              })
              .on("mouseout", function (e) {
                e.layer.setStyle({ color: "#2F87FF" });
              })
          });
        }
        queryLayer.addTo(map);
        recommend(queryLayer);
      });
    }
  }
}

// For checkbox rules.
// only allow to choose one option each line.
$('input[type="checkbox"]').on("change", function () {
  $(this).siblings('input[type="checkbox"]').prop("checked", false);
  $(this).prop("checked", true); // if the checkbox is already checked, keep it.
});

// REFERENCES

// For out datasets
// Brisbane City Council. (2018). City Plan 2014 — Bicycle network overlay. Brisbane: Brisbane City Council.
// Brisbane City Council. (2018). City Plan 2014 — Waterway corridors overlay — Brisbane River corridor section boundary. Brisbane: Brisbane City Council.

// For map
// ArcGIS. (2021). Base map layer [Image].

// For API
// Agafonkin, V. (2020). Leaflet (Version 1.7.1).
