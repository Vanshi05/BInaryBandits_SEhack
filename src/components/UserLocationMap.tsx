import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface UserLocationMapProps {
  userLocation: { lat: number; lng: number } | null;
  items: Array<{
    id: string;
    coordinates: { lat: number; lng: number };
    title: string;
    available: boolean;
  }>;
}

const UserLocationMap = ({ userLocation, items }: UserLocationMapProps) => {
  if (!userLocation) return <div className="text-center py-8">Enable location to view map</div>;

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "8px", marginBottom: "24px" }}>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Item Markers */}
        {items.map((item) => (
          <Marker 
            key={item.id} 
            position={[item.coordinates.lat, item.coordinates.lng]}
          >
            <Popup>
              <strong>{item.title}</strong>
              <br />
              {item.available ? "Available" : "Unavailable"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default UserLocationMap;