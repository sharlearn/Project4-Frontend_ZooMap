import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Animal } from "../list";

export const AnimalDescriptionTabs = ({ data }: { data: Animal }) => {
  console.log(data);
  return (
    <Tabs
      defaultActiveKey="Quick-Facts"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="Quick-Facts" title="Quick Facts">
        {data.iucnStatus}
      </Tab>
      <Tab eventKey="profile" title="Profile">
        {data.description[0].title}
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
        {data.description[0].content}
      </Tab>
    </Tabs>
  );
};
