import React, { FunctionComponent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideBar from ".";
import { Router, Route, Switch, useLocation } from "react-router-dom";
import {
  faNetworkWired,
  faBullseye,
  faWifi,
  faGlobe,
  faHome,
  faCoffee,
  faYinYang,
  faAddressBook,
  faAdjust,
  faAppleAlt,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { MainMenuItem, MenuSection } from "./Data";

const history = createBrowserHistory();

function handleLinkTo(path: string) {
  history.push(path);
}

// *****************************************
// ***********     DATA    *****************
// *****************************************

const uncategorisedItems: MainMenuItem[] = [
  {
    label: "Dashboard",
    icon: faHome,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/dashboard"),
  },
];

const networkMenuItems: MainMenuItem[] = [
  {
    label: "Ports",
    icon: faBullseye,
    subMenuItems: [
      {
        label: "Order Port",
        onClick: () => handleLinkTo("/ports/order"),
      },
      {
        label: "View Ports",
        onClick: () => handleLinkTo("/ports/list"),
      },
    ],
  },
  {
    label: "Connections",
    icon: faNetworkWired,
    subMenuItems: [
      {
        label: "Create Connection",
        onClick: () => handleLinkTo("/connection/create"),
      },
      {
        label: "View Connections",
        onClick: () => handleLinkTo("/connection/list"),
      },
      {
        label: "Cloud Connections",
        onClick: () => handleLinkTo("/connection/cloud"),
      },
    ],
  },
];

const otherSerciceMenuItems: MainMenuItem[] = [
  {
    label: "IOD",
    icon: faGlobe,
    subMenuItems: [
      {
        label: "Create IOD",
        onClick: () => handleLinkTo("/iod/create"),
      },
      {
        label: "View IOD",
        onClick: () => handleLinkTo("/iod/list"),
      },
    ],
  },
  {
    label: "L3 - VPN",
    icon: faWifi,
    subMenuItems: [
      {
        label: "Order VPN",
        onClick: () => handleLinkTo("/l3vpn/order"),
      },
      {
        label: "View VPN",
        onClick: () => handleLinkTo("/l3vpn/list"),
      },
    ],
  },
];

const networkSections: MenuSection[] = [
  {
    menuItems: uncategorisedItems,
  },
  {
    name: "Network",
    menuItems: networkMenuItems,
  },
  {
    name: "Other Services",
    menuItems: otherSerciceMenuItems,
  },
];

const meetingplaceMenuItems: MainMenuItem[] = [
  {
    label: "Page 1",
    icon: faCoffee,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/page1"),
  },
  {
    label: "Page 2",
    icon: faYinYang,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/page2"),
  },
  {
    label: "Page 3",
    icon: faAddressBook,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/page3"),
  },
  {
    label: "Page 4",
    icon: faAdjust,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/page4"),
  },
  {
    label: "Page 5",
    icon: faAppleAlt,
    subMenuItems: undefined,
    onClick: () => handleLinkTo("/page5"),
  },
];

const meetingPlaceSections: MenuSection[] = [
  {
    menuItems: meetingplaceMenuItems,
  },
];

const MENU_CONTEXT = {
  NETWORK: networkSections,
  MEETINGPLACE: meetingPlaceSections,
};

// *****************************************
// ***********    STORIES    ***************
// *****************************************

export default {
  title: "Example/SideBar",
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Page = () => {
  const location = useLocation();
  return (
    <div style={{ margin: "20px", height: "20px" }}>
      {location.pathname} - page
    </div>
  );
};

// Just an example of how the conext could be handledß
const MenuWithContext = () => {
  const [menuContext, setMenuContext] = useState(MENU_CONTEXT.NETWORK);

  // Would filter the menu items here before passing into the navbar.

  return (
    <div className="app" style={{ display: "flex", flexDirection: "row" }}>
      <SideBar sections={menuContext} />
      <button
        style={{ margin: "20px", height: "30px" }}
        onClick={() => setMenuContext(MENU_CONTEXT.NETWORK)}
      >
        NETWORK
      </button>
      <button
        style={{ margin: "20px", height: "30px" }}
        onClick={() => setMenuContext(MENU_CONTEXT.MEETINGPLACE)}
      >
        MEETINGPLACE
      </button>
      <Switch>
        <Route path="/" component={Page} />
      </Switch>
    </div>
  );
};

const Template: ComponentStory<typeof SideBar> = () => (
  <Router history={history}>
    <MenuWithContext />
  </Router>
);

export const Primary = Template.bind({});
Primary.args = {};
