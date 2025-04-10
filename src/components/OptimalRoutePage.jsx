import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const depotIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/167/167707.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const deliveryPointIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/167/167729.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const FitBounds = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route.length > 1) {
      const bounds = route.map(([lat, lng]) => [lat, lng]);
      map.fitBounds(bounds);
    }
  }, [route, map]);

  return null;
};

const OptimalRoutePage = ({ depot, deliveryPoints }) => {
  // Combine depot and delivery points into a single route
  const route = depot
    ? [[depot.lat, depot.lng], ...deliveryPoints.map((point) => [point.lat, point.lng])]
    : [];

  console.log("Route data:", route); // Debugging

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-[90vw] h-[85vh]">
      <MapContainer
        center={depot || [51.505, -0.09]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Depot Marker */}
        {depot && <Marker position={depot} icon={depotIcon} />}
        {/* Delivery Points Markers */}
        {deliveryPoints.map((point, index) => (
          <Marker key={index} position={point} icon={deliveryPointIcon} />
        ))}
        {/* Route as a Red Polyline */}
        {route.length > 1 && (
          <>
            <Polyline positions={route} color="red" weight={4} />
            <FitBounds route={route} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default OptimalRoutePage;