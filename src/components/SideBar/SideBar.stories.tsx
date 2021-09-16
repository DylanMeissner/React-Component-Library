import React, { FunctionComponent } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideBar from "./SideBar";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

export default {
  title: "Example/SideBar",
  component: SideBar,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof SideBar>;


interface Page1Props {
  
}
 
const Page1: FunctionComponent<Page1Props> = () => {
  return (<div>PAGE1</div>  );
};

const Template: ComponentStory<typeof SideBar> = args =>  <Router>
  
  <div className="app" style={{display: "flex", flexDirection: "row"}}>
  <SideBar {...args} /> 
  <Route path="/" component={Page1} />
  </div>

  </Router>;

export const Primary = Template.bind({});
Primary.args = {};
