import axios from "axios";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setPositions, setPosition, setLocationInfo }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      setPositions({ longitude: lng, latitude: lat });
      // Call reverse geocoding
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (res.data) {
        setLocationInfo(res.data.display_name); // full address
      }
    },
  });

  return null;
};

const MapSelector = ({ setPositions }) => {
  const [position, setPosition] = useState(null);
  const [locationInfo, setLocationInfo] = useState("");

  return (
    <div>
      <MapContainer
        center={[10.015, 76.361]}
        zoom={13}
        style={{ height: "150px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <LocationMarker
          setPosition={setPosition}
          setLocationInfo={setLocationInfo}
          setPositions={setPositions}
        />
        {position && <Marker position={position} />}
      </MapContainer>

      {position && (
        <div style={{ marginTop: "10px" }}>
          <span>
            <strong>Selected Location: </strong>
            {locationInfo}
          </span>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
