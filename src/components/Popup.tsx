import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";
import { LocationModal } from "./LocationModal";
import { AnimalModal } from "./AnimalModal";
import { BaseModal } from "./BaseModal";

interface ModalProp {
  show: boolean;
  handleClose: any;
  locationId: any;
}

interface Location {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface AnimalDescription {
  title: string;
  content: string;
}

interface Animal {
  id: number;
  name: string;
  bannerUrl: string;
  iconUrl: string;
  description: AnimalDescription[];
}

export const PopupInfo = (props: ModalProp): JSX.Element => {
  const [animalsData, setAnimalsData] = useState<Animal[]>();
  const [locationData, setLocationData] = useState<Location>();
  const [loading, setLoading] = useState(true);
  const [dataType, setDataType] = useState<"location" | "animal">("location");
  const [animalData, setAnimalData] = useState<Animal | null | undefined>();

  const getData = async () => {
    try {
      const location = await axios.get(
        `${backendUrl}/location/${props.locationId}`
      );
      setLocationData(location.data);

      const animal = await axios.get<Animal[]>(
        `${backendUrl}/animal/location/${props.locationId}`
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
    console.log("this is firing");
    console.log(animalData);
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

  return (
    <BaseModal
      show={props.show}
      handleClose={props.handleClose}
      title={
        dataType === "animal" && animalData
          ? animalData.name
          : locationData.name
      }
    >
      {dataType === "location" && (
        <LocationModal
          locationData={locationData}
          animalsData={animalsData}
          switchModals={switchModals}
        />
      )}
      {dataType === "animal" && animalData && (
        <AnimalModal animalData={animalData} switchModals={switchModals} />
      )}
    </BaseModal>
  );
};
