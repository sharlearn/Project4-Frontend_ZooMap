import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Animal } from "../list";
import { AnimalQuickFacts } from "./AnimalQuickFactsTab";
import { AnimalIUCNTab } from "./AnimalIUCNTab";
import { AnimalDescriptionTab } from "./AnimalDescriptionTab";

export const AnimalDataTabs = ({ data }: { data: Animal }) => {
  return (
    <Tabs
      defaultActiveKey="Quick-Facts"
      id="AnimalTabs"
      className="mb-3"
      justify
    >
      <Tab eventKey="Quick-Facts" title="Quick Facts">
        <AnimalQuickFacts
          animalDiet={data.diet}
          animalHabitat={data.habitat}
          animalLifespan={data.lifespan}
          animalRange={data.range}
        />
      </Tab>
      <Tab eventKey="Description" title="Description">
        <AnimalDescriptionTab descriptions={data.description} />
      </Tab>
      <Tab eventKey="IUCN-Status" title="IUCN Status">
        <AnimalIUCNTab
          iucnDescription={data.iucnDescription}
          iucnStatus={data.iucnStatus}
        />
      </Tab>
    </Tabs>
  );
};
