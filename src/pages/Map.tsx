import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState, useRef } from "react";
import { PopupInfo } from "../components/Popup";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import Map from "react-map-gl";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { geoJson } from "../data/geoJsons";

const mapboxAccesstoken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN as string;

// mapboxgl.accessToken = mapboxAccesstoken;

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

const MapDisplay = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;

  const [show, setShow] = useState<boolean>(false);
  // const [data, setData] = useState<Coordinates[]>();
  const [locationId, setLocationId] = useState<number>();

  // const mapContainer = useRef<any>(null);

  // useEffect(() => {
  //   // if (map.current) return; // initialize map only once
  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [centerLng, centerLat],
  //     zoom: 17,
  //   });

  //   map.on("load", () => {
  //     map.addSource("zones", {
  //       type: "geojson",
  //       data: geoJson as FeatureCollection,
  //     });

  //     map.addLayer({
  //       id: "zone-fills",
  //       type: "fill",
  //       source: "zones",
  //       paint: {
  //         "fill-color": "rgba(200, 100, 240, 0.4)",
  //         "fill-outline-color": "rgba(200, 100, 240, 1)",
  //       },
  //     });
  //   });

  //   // Add navigation control (the +/- zoom buttons)
  //   map.addControl(new mapboxgl.NavigationControl(), "top-right");

  //   return () => map.remove();
  // }, []);

  const closeModal = () => setShow(false);

  return (
    // <div>
    //   <div ref={mapContainer} className="map-container" />
    // </div>
    <>
      <Map
        initialViewState={{
          latitude: centerLat,
          longitude: centerLng,
          zoom: 17,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "100dvw", height: "100dvh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={mapboxAccesstoken}
      />
    </>
  );
};

export default MapDisplay;
