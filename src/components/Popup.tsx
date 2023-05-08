import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";
import Modal from "react-bootstrap/Modal";
import { LocationModal } from "./LocationModal";
import { AnimalModal } from "./AnimalModal";
import { Animal } from "../list";
import { ShawAmphitheaterModal } from "./ShowModal";

enum DataTypes {
  LOCATION = "location",
  ANIMAL = "animal",
}

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
  // could we create ENUMs for these static values of the Union Type?
  const [dataType, setDataType] = useState<DataTypes.LOCATION | DataTypes.ANIMAL | "null">(
    DataTypes.LOCATION
  );
  const [animalData, setAnimalData] = useState<Animal | null | undefined>();

  const getData = async () => {
    try {

      // since these 2 calls don't depend on each other, I would make the request at the same time, instead of awaiting the results.
      // Promise.all would work, I think there is also axios.all if I am not wrong!
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
    if (dataType === DataTypes.LOCATION) {
      setDataType(DataTypes.ANIMAL);
      setAnimalData(animalData);
    } else {
      setDataType(DataTypes.LOCATION);
      setAnimalData(null);
    }
  };

  if (!locationData || !animalsData || loading) {
    return <div>Loading...</div>;
  }

  // I think the conditional returns down here could be handled more dynamically.
// We could create an object that returns is the child component of the modal.
// We could also make the className conditional
/*

  <Modal
        show={props.show}
        onHide={props.handleClose}
        ...(dataType !== keyof DataTypes && { className: "base-modal "}) // or something along these lines
      >
        {getChildComponent[<insert type here>]} // get component returned
      </Modal>

*/

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
