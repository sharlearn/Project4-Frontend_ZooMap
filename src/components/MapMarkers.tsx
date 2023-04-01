import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";
import { backendUrl } from "../constants";

interface Location {
  id: number;
  name: string;
  description?: string;
  type: string;
  latitude: number;
  longitude: number;
}

const MapMarkers = () => {
  const [locationDetails, setLocationDetails] = useState<Location[]>([]);

  const retrieveLocations = async () => {
    let data = await axios.get(`${backendUrl}/location`);
    setLocationDetails(data.data);
  };

  useEffect(() => {
    retrieveLocations();
  }, []);

  return (
    <React.Fragment>
      {locationDetails.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            {location.name}, {location.description}
          </Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
};

export default MapMarkers;
