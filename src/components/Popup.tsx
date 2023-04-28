import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";
import Modal from "react-bootstrap/Modal";
import { LocationModal } from "./LocationModal";
import { AnimalModal } from "./AnimalModal";
import { Animal } from "../list";
import { ShawAmphitheaterModal } from "./ShowModal";

interface LocationProperties {
  name: string;
  locationId: number;
  type: string;
  iconUrl: string | null;
}

interface ModalProp {
  show: boolean;
  handleClose: any;
  locationProperties: LocationProperties;
}

interface Location {
  id: number;
  name: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
}

export const PopupInfo = (props: ModalProp): JSX.Element => {
  const [animalsData, setAnimalsData] = useState<Animal[]>();
  const [locationData, setLocationData] = useState<Location>();
  const [loading, setLoading] = useState(true);
  const [dataType, setDataType] = useState<"location" | "animal" | "null">(
    "location"
  );
  const [animalData, setAnimalData] = useState<Animal | null | undefined>();

  const getData = async () => {
    try {
      const location = await axios.get(
        `${backendUrl}/location/${props.locationProperties.locationId}`
      );
      setLocationData(location.data);

      const animal = await axios.get<Animal[]>(
        `${backendUrl}/animal/location/${props.locationProperties.locationId}`
      );
      setAnimalsData(animal.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData().then(() => setLoading(false));
  }, []);

  const switchModals = (animalData: any) => {
    if (dataType === "location") {
      setDataType("animal");
      setAnimalData(animalData);
    } else {
      setDataType("location");
      setAnimalData(null);
    }
  };

  if (!locationData || !animalsData || loading) {
    return <div>Loading...</div>;
  }

  if (props.locationProperties.type === "show") {
    return (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="base-modal"
      >
        <ShawAmphitheaterModal />
      </Modal>
    );
  }

  //If location is not a zone, to not show location modal
  if (props.locationProperties.type === "enclosure") {
    return (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="base-modal"
      >
        <AnimalModal
          locationType={props.locationProperties.type}
          animalData={animalsData[0]}
          switchModals={switchModals}
        />
      </Modal>
    );
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      {dataType === "location" && (
        <LocationModal
          locationData={locationData}
          animalsData={animalsData}
          switchModals={switchModals}
          banner={props.locationProperties.iconUrl}
        />
      )}
      {dataType === "animal" && animalData && (
        <AnimalModal
          locationType={props.locationProperties.type}
          animalData={animalData}
          switchModals={switchModals}
        />
      )}
    </Modal>
  );
};
