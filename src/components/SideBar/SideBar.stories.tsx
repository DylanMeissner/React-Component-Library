import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideBar from "./SideBar";

export default {
  title: "Example/SideBar",
  component: SideBar,
  argTypes: {
    backgroundColor: { control: "color" }
  }
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = args => <SideBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
