import * as React from "react";
import "./styles.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faNetworkWired,
  faBullseye,
  faWifi,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import {
  icon,
  IconDefinition,
  IconProp
} from "@fortawesome/fontawesome-svg-core";

export const baseClassName = "sidebar";

interface SideBarProps {
  /**
   * What background color to use
   */
  backgroundColor?: string;
}

interface SubMenuItem {
  name: string;
  linkTo: string;
  icon?: IconProp;
}

interface MenuItem {
  name: string;
  subMenuItems?: SubMenuItem[];
  linkTo?: string;
  onClick: (name: string, linkTo: string) => void;
  icon: IconDefinition;
  isSelected: boolean;
}

interface Category {
  name: string;
  menuItems: MenuItem[];
}

interface SideBarHeaderProps {
  logo: string;
  expanded: boolean;
  onExpand: () => void;
}

const determineExpanded = (expanded: boolean) => {
  return expanded ? "expanded" : "";
};

const SidebarHeader = ({ logo, expanded, onExpand }: SideBarHeaderProps) => {
  return (
    <div className={`${baseClassName}__header`}>
      {/* <p>TITLE</p> */}
      <FontAwesomeIcon
        className={`expand-icon ${determineExpanded(expanded)}`}
        icon={expanded ? faAngleDoubleLeft : faAngleDoubleRight}
        onClick={onExpand}
      />
      <div>
        <img className={"logo"} src={`${logo}`}></img>
      </div>
      {/* <hr className="seperator"></hr> */}
    </div>
  );
};

const SideBarContent = ({
  expanded,
  categories,
  selectedMenuOption
}: {
  expanded: boolean;
  categories: Category[];
  selectedMenuOption: string;
}) => {
  return (
    <div className={`${baseClassName}__content`}>
      {categories.map((category, i) => (
        <CategoryItem
          key={i}
          expanded={expanded}
          category={category}
          selectedMenuOption={selectedMenuOption}
        ></CategoryItem>
      ))}
    </div>
  );
};

const MainMenuItem = ({
  isSelected,
  categoryName,
  expanded,
  menuItem
}: {
  isSelected: boolean;
  categoryName: string;
  expanded: boolean;
  menuItem: MenuItem;
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className={`main-menu-item ${isSelected ? "selected" : ""}`}
        onClick={() => {
          menuItem.linkTo
            ? menuItem.onClick(menuItem.name, menuItem.linkTo)
            : null; /* TODO - open sub-menu*/
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FontAwesomeIcon className={`icon`} icon={menuItem.icon} />

        <p className={`name ${determineExpanded(expanded)}`}>{menuItem.name}</p>

        {menuItem.subMenuItems &&
          menuItem.subMenuItems.length > 0 &&
          !expanded &&
          hovered && (
            <div className={`submenu-container fly-out`}>
              {menuItem.subMenuItems.map((sub, i) => (
                <div key={i} className={"item"}>
                  {sub.name}
                </div>
              ))}
            </div>
          )}
      </div>
      {menuItem.subMenuItems &&
        menuItem.subMenuItems.length > 0 &&
        expanded &&
        isSelected && (
          <div className={"submenu-container"}>
            <div className={`acordian`}>
              {menuItem.subMenuItems.map((sub, i) => (
                <div key={i} className={"item"}>
                  {sub.name}
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};

const CategoryItem = ({
  expanded,
  category,
  selectedMenuOption
}: {
  expanded: boolean;
  category: Category;
  selectedMenuOption: string;
}) => {
  return (
    <div className={`category-container`}>
      <div className="title-container">
        <div className={`title ${determineExpanded(expanded)}`}>
          {expanded ? category.name : ""}
        </div>
        <div className={`seperator ${determineExpanded(expanded)}`}></div>
      </div>

      {category.menuItems.map((menuItem, i) => (
        <MainMenuItem
          key={i}
          isSelected={menuItem.name === selectedMenuOption}
          expanded={expanded}
          menuItem={menuItem}
          categoryName={category.name}
        ></MainMenuItem>
      ))}
    </div>
  );
};

const SideBar: React.FunctionComponent<SideBarProps> = ({
  backgroundColor
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState("");

  const onMenuItemClickCallback = (name: string, linkTo: string) => {
    setSelectedMenuOption(name);

    // TODO route to desired page
  };

  const networkMenuItems: MenuItem[] = [
    {
      name: "Ports",
      linkTo: "/ports",
      icon: faBullseye,
      isSelected: false,
      onClick: setSelectedMenuOption,
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
      linkTo: "/connections",
      icon: faNetworkWired,
      isSelected: false,
      onClick: setSelectedMenuOption,
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

  const otherSerciceMenuItems: MenuItem[] = [
    {
      name: "IOD",
      linkTo: "/iod",
      icon: faGlobe,
      isSelected: false,
      onClick: setSelectedMenuOption,
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
      linkTo: "/l3vpn",
      icon: faWifi,
      isSelected: false,
      onClick: setSelectedMenuOption,
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

  let categories: Category[] = [
    {
      name: "Network",
      menuItems: networkMenuItems
    },
    {
      name: "Other Services",
      menuItems: otherSerciceMenuItems
    }
  ];

  return (
    <div
      style={{ backgroundColor }}
      className={`${baseClassName} ${expanded ? "expanded" : ""}`}
    >
      <SidebarHeader
        logo="https://www.designfreelogoonline.com/wp-content/uploads/2016/12/000782-link-3D-logo-design-online-free-3d-logo-maker-01.png"
        expanded={expanded}
        onExpand={() => setExpanded(!expanded)}
      ></SidebarHeader>
      <SideBarContent
        expanded={expanded}
        categories={categories}
        selectedMenuOption={selectedMenuOption}
      ></SideBarContent>
    </div>
  );
};

export default SideBar;
