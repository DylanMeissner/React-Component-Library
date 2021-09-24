import * as React from "react";
import "./styles.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { MenuSection } from "./Data";
import { SelectedOption } from "./MainItem";
import Menu from "./Menu";

export const baseClassName = "sidebar";

interface SideBarHeaderProps {
  logo: string;
  expanded: boolean;
  onExpand: () => void;
}

interface SideBarContentProps {
  expanded: boolean;
  sections: MenuSection[];
}

// TODO: This is not so great, refactor this
export const determineExpanded = (expanded: boolean) => {
  return expanded ? "expanded" : "";
};

/**
 * The main container containing the header content of the navigation sidebar
 *
 * @param logo - the logo to display in the sidebar
 * @param expanded - whether the menu is expanded or collapsed
 * @param onExpand - callback function when the menu expand button is clicked
 * @returns the sidebar header to be rendered
 */
const SidebarHeader = ({ logo, expanded, onExpand }: SideBarHeaderProps) => {
  return (
    <div className={`${baseClassName}__header`}>
      <FontAwesomeIcon
        className={`expand-icon ${determineExpanded(expanded)}`}
        icon={expanded ? faAngleDoubleLeft : faAngleDoubleRight}
        onClick={onExpand}
      />
      <div>
        <img className={"logo"} src={`${logo}`}></img>
      </div>
    </div>
  );
};

/**
 * The main container containing the body content of the navigation sidebar
 *
 * @param expanded - whether the menu is currently expanded or not
 * @param sections - the menu sections to be rendered within the sidebar
 * @returns the content to be rendered within the nav bar
 */
const SideBarContent = ({ expanded, sections }: SideBarContentProps) => {
  const [currentlySelected, setCurrentlySelected] = useState<SelectedOption>({
    selectedMenuOption: "",
    selectedSubMenuOption: "",
  });

  const handleChangeSelection = (selectedOption: SelectedOption) => {
    setCurrentlySelected(selectedOption);
  };

  return (
    <div className={`${baseClassName}__content`}>
      {/* Render each section item  */}
      {sections.map((section, i) => (
        <Menu.Section
          key={i}
          expanded={expanded}
          section={section}
          currentSelection={currentlySelected}
          onChangeSelected={handleChangeSelection}
        ></Menu.Section>
      ))}
    </div>
  );
};

/**
 * The sidebar navigation component for navigating the application
 *
 * @param sections - the menu sections to be rendered in the sidebar
 * @returns the sidebar to be rendered
 */
const SideBar = ({ sections }: { sections: MenuSection[] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${baseClassName} ${determineExpanded(expanded)}`}>
      <SidebarHeader
        logo="https://www.designfreelogoonline.com/wp-content/uploads/2016/12/000782-link-3D-logo-design-online-free-3d-logo-maker-01.png"
        expanded={expanded}
        onExpand={() => setExpanded(!expanded)}
      ></SidebarHeader>
      <SideBarContent expanded={expanded} sections={sections}></SideBarContent>
    </div>
  );
};

export default SideBar;
