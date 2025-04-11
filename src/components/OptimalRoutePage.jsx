import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const depotIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

const deliveryPointIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000",
  iconSize: [35, 41],
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
    <div className="bg-gray-100 w-full h-[90vh] flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-row gap-6 p-6">
        {/* Map Section */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-0">
          <MapContainer
            center={depot || [51.505, -0.09]}
            zoom={13}
            className="h-full w-full rounded-lg"
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

        {/* Summary Section */}
        <div className="w-full lg:w-[30%] bg-white shadow-lg rounded-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Route Summary</h2>
          {/* Depot Info */}
          {depot ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Depot</h3>
              <p className="text-gray-600">
                <span className="font-bold">Latitude:</span> {depot.lat}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Longitude:</span> {depot.lng}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No depot selected.</p>
          )}

          {/* Delivery Points Info */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800">Delivery Points</h3>
            {deliveryPoints.length > 0 ? (
              <ul className="space-y-2 mt-2">
                {deliveryPoints.map((point, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-50 rounded-md shadow-sm border border-gray-200"
                  >
                    <p className="text-gray-600">
                      <span className="font-bold">Latitude:</span> {point.lat}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-bold">Longitude:</span> {point.lng}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No delivery points added.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalRoutePage;