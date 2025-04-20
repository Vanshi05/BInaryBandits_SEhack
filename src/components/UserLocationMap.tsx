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
  if (false) return <div className="text-center py-8">Enable location to view map</div>;

  return (
    <></>
  );
};

export default UserLocationMap;