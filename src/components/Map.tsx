import { MapContainer, TileLayer } from "react-leaflet";
import MapMarkers from "./MapMarkers";

const Map = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={17}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        minZoom={17}
      />
      <MapMarkers />
    </MapContainer>
  );
};

export default Map;
