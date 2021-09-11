var map = L.map('map').setView([-27.495432, 153.012024], 12);

L.esri.Vector.vectorBasemapLayer('ArcGIS:Topographic', {
    apikey: "AAPKb74ce1d9657b4e7a937e5d491f507f80I6a303ICiJJ0cg5QgZhry93CHhjFPZOFp6LzeYpZ9JGcBgN1mdLirFVut47IjMZ-" // Replace with your API key - https://developers.arcgis.com
}).addTo(map);

L.esri.featureLayer({
    url: 'https://services2.arcgis.com/dEKgZETqwmDAh1rP/ArcGIS/rest/services/Bicycle_network_overlay/FeatureServer/0'
}).addTo(map);