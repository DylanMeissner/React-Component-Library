import {
  faNetworkWired,
  faBullseye,
  faWifi,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";



export interface SubMenuItem {
  name: string;
  linkTo: string;
  icon?: IconProp;
}

export interface MainMenuItem {
  name: string;
  subMenuItems?: SubMenuItem[];
  linkTo?: string;
  icon: IconDefinition;
}

export interface Category {
  name: string;
  menuItems: MainMenuItem[];
}

const networkMenuItems: MainMenuItem[] = [
  {
    name: "Ports",
    icon: faBullseye,
    subMenuItems: [
      {
        name: "Order Port",
        linkTo: "/ports/order"
      },
      {
        name: "View Ports",
        linkTo: "/ports/list"
      }
    ]
  },
  {
    name: "Connections",
    icon: faNetworkWired,
    subMenuItems: [
      {
        name: "Create Connection",
        linkTo: "/connetcion/create"
      },
      {
        name: "View Connections",
        linkTo: "/connetcion/list"
      },
      {
        name: "Cloud Connections",
        linkTo: "/connetcion/cloud"
      }
    ]
  }
];

const otherSerciceMenuItems: MainMenuItem[] = [
  {
    name: "IOD",
    icon: faGlobe,
    subMenuItems: [
      {
        name: "Create IOD",
        linkTo: "/iod/create"
      },
      {
        name: "View IOD",
        linkTo: "/iod/list"
      }
    ]
  },
  {
    name: "L3 - VPN",
    icon: faWifi,
    subMenuItems: [
      {
        name: "Order VPN",
        linkTo: "/l3vpn/order"
      },
      {
        name: "View VPN",
        linkTo: "/vpn/list"
      }
    ]
  }
];

export const  MenuCategories: Category[] = [
  {
    name: "Network",
    menuItems: networkMenuItems
  },
  {
    name: "Other Services",
    menuItems: otherSerciceMenuItems
  }
];