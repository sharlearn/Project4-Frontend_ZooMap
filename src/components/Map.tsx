import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState } from "react";
import { PopupInfo } from "./Popup";

interface Coordinates {
  id: number;
  locationId: number;
  type: string;
  coordinates: any;
}

interface Features {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    coordinates: number[][];
    type: string;
  };
}

const Map = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;

  // const [locationDetails, setLocationDetails] = useState<Location[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [data, setData] = useState<Coordinates[]>();
  const [locationId, setLocationId] = useState<number>();

  let dataRetrieval: Features[] = [];

  let getData = async () => {
    try {
      const data = await axios.get<Coordinates[]>(`${backendUrl}/coordinates`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    for (const coordinate of data) {
      dataRetrieval.push({
        type: "Feature",
        properties: {
          name: coordinate.locationId.toString(),
        },
        geometry: {
          coordinates: [coordinate.coordinates],
          type: coordinate.type,
        },
      });
    }
  }

  const mapData = {
    type: "FeatureCollection" as const,
    features: dataRetrieval,
  };

  const closeModal = () => setShow(false);

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
      {data && (
        <GeoJSON
          data={mapData}
          eventHandlers={{
            click: (e) => {
              setShow(!show);
              setLocationId(e.layer.feature.properties.name);
            },
          }}
        />
      )}
      {show && (
        <PopupInfo
          show={show}
          handleClose={closeModal}
          locationId={locationId}
        />
      )}
    </MapContainer>
  );
};

export default Map;
