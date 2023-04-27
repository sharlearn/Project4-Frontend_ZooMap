import axios from "axios";
import { backendUrl } from "../constants";
import { useEffect, useState, useCallback } from "react";
import { PopupInfo } from "../components/Popup";
import { FeatureCollection } from "geojson";
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
import Example from "../components/OffCanvas";

const mapboxAccesstoken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN as string;

interface LocationProperties {
  name: string;
  locationId: number;
  type: string;
  iconUrl: string | null;
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
  const [locationURL, setLocationURL] = useState<string | null>(null);

  let getData = async () => {
    try {
      const data = await axios.get(`${backendUrl}/geojson`);
      //geoJson feature collection within data gotten
      setGeojsonData(data.data[0].data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(geojsonData);

  const handleClick = useCallback((event: any) => {
    if (event.features[0]) {
      setShow(true);
      const { features } = event;

      const clickFeature = features[0].properties;

      setLocationProperties(clickFeature);
    } else return;
  }, []);

  const closeModal = () => {
    setShow(false);
    setLocationProperties(null);
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

  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const closeOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = () => setShowOffCanvas(true);

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
        // onClick={handleShowOffCanvas}
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
        <Marker longitude={103.79448518041511} latitude={1.4057907763256026}>
          <img
            className="tram-icons"
            src="https://firebasestorage.googleapis.com/v0/b/project4-z.appspot.com/o/amenityicons%2Ftram.png?alt=media&token=bbbbc6d4-d5d3-4370-84ab-e8650261877a"
            alt="tram-stop"
          />
        </Marker>
      </Map>
      {locationProperties && (
        <PopupInfo
          show={show}
          handleClose={closeModal}
          locationProperties={locationProperties}
        />
      )}
      {/* <Example show={showOffCanvas} handleClose={closeOffCanvas} /> */}
    </>
  );
};

export default MapDisplay;
