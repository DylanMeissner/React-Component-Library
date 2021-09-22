import React, { FunctionComponent } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideBar from ".";
import {
  BrowserRouter as Router,
  Route,
  useLocation
} from "react-router-dom";



export default {
  title: "Example/SideBar",
  component: SideBar,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof SideBar>;


interface PageProps {
  pageUrl: string
}
 
const Page: FunctionComponent<PageProps> = () => {
  const location = useLocation();
  return (<div style={{"margin": "50px"}}>{location.pathname} - page</div>  );
};

const Template: ComponentStory<typeof SideBar> = args =>  <Router>
  

  <div className="app" style={{display: "flex", flexDirection: "row"}}>
  <SideBar {...args} /> 
  <Route path="/" component={Page} />
  </div>

  </Router>;

export const Primary = Template.bind({});
Primary.args = {};
