import {
  faNetworkWired,
  faBullseye,
  faWifi,
  faGlobe,
  faHome
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";



export interface SubMenuItem {
  label: string;
  linkTo: string;
  icon?: IconProp;
}

export interface MainMenuItem {
  label: string;
  subMenuItems?: SubMenuItem[];
  linkTo?: string;
  icon: IconDefinition;
}

export interface MenuSection {
  name?: string;
  menuItems: MainMenuItem[];
}

const uncategorisedItems: MainMenuItem[] = [
  {
    label: "Dashboard",
    icon: faHome,
    subMenuItems: undefined,
    linkTo: "/dashboard"
  },
];

const networkMenuItems: MainMenuItem[] = [
  {
    label: "Ports",
    icon: faBullseye,
    subMenuItems: [
      {
        label: "Order Port",
        linkTo: "/ports/order"
      },
      {
        label: "View Ports",
        linkTo: "/ports/list"
      }
    ]
  },
  {
    label: "Connections",
    icon: faNetworkWired,
    subMenuItems: [
      {
        label: "Create Connection",
        linkTo: "/connetcion/create"
      },
      {
        label: "View Connections",
        linkTo: "/connetcion/list"
      },
      {
        label: "Cloud Connections",
        linkTo: "/connetcion/cloud"
      }
    ]
  }
];

const otherSerciceMenuItems: MainMenuItem[] = [
  {
    label: "IOD",
    icon: faGlobe,
    subMenuItems: [
      {
        label: "Create IOD",
        linkTo: "/iod/create"
      },
      {
        label: "View IOD",
        linkTo: "/iod/list"
      }
    ]
  },
  {
    label: "L3 - VPN",
    icon: faWifi,
    subMenuItems: [
      {
        label: "Order VPN",
        linkTo: "/l3vpn/order"
      },
      {
        label: "View VPN",
        linkTo: "/vpn/list"
      }
    ]
  }
];

export const  MenuSections: MenuSection[] = [
  {
    menuItems: uncategorisedItems
  },
  {
    name: "Network",
    menuItems: networkMenuItems
  },
  {
    name: "Other Services",
    menuItems: otherSerciceMenuItems
  }
];