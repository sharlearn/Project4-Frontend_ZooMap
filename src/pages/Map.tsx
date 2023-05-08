import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState, useCallback, useMemo } from "react";
import { PopupInfo } from "../components/Popup";
import { Feature, FeatureCollection } from "geojson";
import Map, {
  Source,
  Layer,
  FillLayer,
  GeolocateControl,
  NavigationControl,
  LineLayer,
  LngLatBoundsLike,
  Marker,
} from "react-map-gl";

const mapboxAccesstoken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN as string;

// that you defined interfaces, sparks joy!
interface LocationProperties {
  name: string;
  locationId: number;
  type: string;
  iconUrl: string | null;
}

interface MapMarkerData {
  name: string;
  iconUrl: string;
  coordinates: number[];
}

const MapDisplay = () => {
  //center coordinates for Singapore Zoo
  const centerLat = 1.40378;
  const centerLng = 103.793881;
  const mapBounds: LngLatBoundsLike = [
    [103.78009399848185, 1.39375947531542],
    [103.802887890264, 1.4117374325057739],
  ];

  const [geojsonData, setGeojsonData] = useState<FeatureCollection | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);
  const [locationProperties, setLocationProperties] =
    useState<LocationProperties | null>(null);
  const [mapMarkerData, setMapMarkerData] = useState<MapMarkerData[] | null>(
    null
  );
  const [enclosureCoordinates, setEnclosureCoordinates] =
    useState<FeatureCollection | null>(null);

  let getData = async () => {
    try {
      const data = await axios.get(`${backendUrl}/geojson`);
      //geoJson feature collection within data gotten
      // since this all depends on the geojson data, why not use a single state object?
      /*

      {
        geojson: data.data[0].data[0],
        mapMarker: data.data[1].data,
        enclosureCoords: data.data[2].data
      }

      */
      setGeojsonData(data.data[0].data[0]);
      setMapMarkerData(data.data[1].data);
      setEnclosureCoordinates(data.data[2].data);
      // please note that whenever you do something like data.data[0].data you are possibly introducing bugs.
      // What if data[0] is undefined? By right typescript should complain here.
      // You should specify a type for data / the response here, and you could write more resilient code by TS alerting you.
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = useCallback((event: any) => {
    // a function will always return in the end, so the else return is redundant I think
    if (event.features[0]) {
      setShow(true);
      const { features } = event;

      const clickFeature = features[0].properties;

      setLocationProperties(clickFeature);
    }
  }, []);

  const closeModal = () => {
    setShow(false);
    setLocationProperties(null);
  };

  // static info like such could be placed outside of the component
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
        "#fff000",
        "green",
      ],
      "fill-opacity": 0.4,
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

  return (
    <>
      <Map
        initialViewState={{
          latitude: centerLat,
          longitude: centerLng,
          zoom: 16,
          bearing: 90,
        }}
        maxBounds={mapBounds}
        minZoom={15}
        style={{ width: "100dvw", height: "100dvh" }}
        mapStyle="mapbox://styles/sharlearn/clgkze4hw008r01qqfxaih136"
        mapboxAccessToken={mapboxAccesstoken}
        interactiveLayerIds={["park-zones"]}
        onClick={handleClick}
        reuseMaps
      >
        <NavigationControl />
        <GeolocateControl
          position="top-right"
          showUserHeading={true}
          showUserLocation={true}
          showAccuracyCircle={false}
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 17 }}
        />
        <Source
          id="park-zones"
          type="geojson"
          data={geojsonData as FeatureCollection}
        >
          <Layer {...zoneLayer} />
          <Layer {...zooOutlineLayer} />
          <Layer {...zooOuterBoundaryLayer} />
        </Source>
        <Source
          id="enclosure-markers"
          type="geojson"
          data={enclosureCoordinates as FeatureCollection}
        >
          <Layer
            type="symbol"
            layout={{
              // "icon-image": ["get", "iconUrl"],
              // "icon-size": 1,
              "text-field": ["format", ["get", "name"], { "font-scale": 0.8 }],
            }}
          />
        </Source>
        {mapMarkerData &&
          mapMarkerData.map((data, index) => (
            <Marker
              key={index}
              longitude={data.coordinates[0]}
              latitude={data.coordinates[1]}
            >
              <img
                className="zone-markers"
                src={data.iconUrl}
                alt={data.name}
              />
            </Marker>
          ))}
      </Map>
      {locationProperties && (
        <PopupInfo
          show={show}
          handleClose={closeModal}
          locationProperties={locationProperties}
        />
      )}
    </>
  );
};

export default MapDisplay;
