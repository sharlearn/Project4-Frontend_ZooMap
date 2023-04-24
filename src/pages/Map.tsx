import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { PopupInfo } from "../components/Popup";
import { Feature, FeatureCollection } from "geojson";
import Map, {
  Source,
  Layer,
  FillLayer,
  GeolocateControl,
  NavigationControl,
  LineLayer,
} from "react-map-gl";

import geoJson from "../data/geoJson.json";

const mapboxAccesstoken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN as string;

const MapDisplay = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;

  const [show, setShow] = useState<boolean>(false);
  const [locationId, setLocationId] = useState<number | null>(null);

  const handleClick = useCallback((event: any) => {
    if (event.features[0]) {
      setShow(true);
      const { features } = event;

      const clickFeature = features[0].properties.locationId;

      setLocationId(clickFeature);
    } else return;
  }, []);

  const closeModal = () => {
    setShow(false);
    setLocationId(null);
  };

  const zoneLayer: FillLayer = {
    id: "park-zones",
    type: "fill",
    paint: {
      "fill-color": [
        "match",
        ["get", "type"],
        "zone",
        "#000fff",
        "enclosure",
        "yellow",
        "green",
      ],
      "fill-opacity": 0.5,
    },
    filter: ["!=", ["get", "name"], "Zoo-Boundary"],
  };

  const zooOutlineLayer: LineLayer = {
    id: "park-outline",
    type: "line",
    paint: {
      "line-color": "black",
    },
    filter: ["==", ["get", "name"], "Zoo-Boundary"],
  };

  const zooOuterBoundaryLayer: FillLayer = {
    id: "outer-fill",
    type: "fill",
    paint: {
      "fill-color": "grey",
      "fill-opacity": 0.6,
    },
    filter: ["==", ["get", "name"], "Zoo-Boundary"],
  };

  // const markerLayer: SymbolLayer = {};

  return (
    <>
      <Map
        initialViewState={{
          latitude: centerLat,
          longitude: centerLng,
          zoom: 17,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/sharlearn/clgkze4hw008r01qqfxaih136"
        mapboxAccessToken={mapboxAccesstoken}
        interactiveLayerIds={["park-zones"]}
        onClick={handleClick}
        reuseMaps
      >
        <NavigationControl />
        <GeolocateControl
          position="top-right"
          // ref={geolocateControlRef}
          showUserHeading={true}
          showUserLocation={true}
          showAccuracyCircle={false}
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 17 }}
        />
        <Source
          id="park-zones"
          type="geojson"
          data={geoJson as FeatureCollection}
        >
          <Layer {...zoneLayer} />
          <Layer {...zooOutlineLayer} />
          <Layer {...zooOuterBoundaryLayer} />
        </Source>
      </Map>
      {locationId && (
        <PopupInfo
          show={show}
          handleClose={closeModal}
          locationId={locationId}
        />
      )}
    </>
  );
};

export default MapDisplay;
