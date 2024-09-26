import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import LeafletGeocoder from "./LeafletGeocoder";
const Map = () => {
  const position = [36.8065, 10.1815];

  return (
    <div>
      GestionUser
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletGeocoder />
      </MapContainer>
    </div>
  );
};

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  iconSize: [25, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default Map;
