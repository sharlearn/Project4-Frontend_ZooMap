import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;
  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={50}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[centerLat, centerLng]}>
        <Popup>hello</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
