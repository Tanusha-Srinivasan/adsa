import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icons
const depotIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000", // Red pin icon URL
  iconSize: [30, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
});

const deliveryPointIcon = L.icon({
  iconUrl: "https://img.icons8.com/?size=100&id=7880&format=png&color=000000", // Black pin icon URL
  iconSize: [35, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
});

const MapComponent = ({ depot, deliveryPoints, onMapClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick(e.latlng); // Pass clicked location to parent
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {depot && <Marker position={depot} icon={depotIcon} />}
      {deliveryPoints.map((point, index) => (
        <Marker key={index} position={point} icon={deliveryPointIcon} />
      ))}
    </MapContainer>
  );
};

export default MapComponent;