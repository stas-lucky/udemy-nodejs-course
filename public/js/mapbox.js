/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3Rhc2x1Y2t5IiwiYSI6ImNreHQ1MTV2NzFzaW8yb29lOXhxdGplMmkifQ.Iz4L8CYciewTg4roi1a2Cg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/staslucky/ckxtinmci85db16ryy4uqeros",
    scrollZoom: false,
    // center: [-118.130208, 33.95564],
    // zoom: 8,
  });

  const bounds = new mapboxgl.LngLatBounds();

  console.log("LOC: ", locations);
  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.ccordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
