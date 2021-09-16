import * as React from "react";
import "./styles.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

import CategoryItem from "./CategoryMenuItem";
import { Category, MenuCategories } from "./Menu-Data";
import { SelectedOption } from "./MainMenuItem";

export const baseClassName = "sidebar";

interface SideBarHeaderProps {
  logo: string;
  expanded: boolean;
  onExpand: () => void;
}


interface SideBarContentProps {
  expanded: boolean;
  categories: Category[];
}

// TODO: This is not so great, refactor this
export const determineExpanded = (expanded: boolean) => {
  return expanded ? "expanded" : "";
};


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

const SideBarContent = ({
  expanded,
  categories,
}: SideBarContentProps) => {
  const [currentlySelected, setCurrentlySelected] = useState<SelectedOption>({selectedMenuOption: "", selectedSubMenuOption: ""} );

  const handleChangeSelection = (selectedOption: SelectedOption) => {
    setCurrentlySelected(selectedOption);
  }

  return (
    <div className={`${baseClassName}__content`}>
      {/* Render each category item  */}
      {categories.map((category, i) => (
        <CategoryItem
          key={i}
          expanded={expanded}
          category={category}
          currentSelection={currentlySelected}
          onChangeSelected={handleChangeSelection}
        ></CategoryItem>
      ))}
    </div>
  );
};

const SideBar: React.FunctionComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const finalMenuCategories = MenuCategories; //TODO filter out the unavailable items here before passing them below.

  return (
    <div
      className={`${baseClassName} ${determineExpanded(expanded)}`}
    >
      <SidebarHeader
        logo="https://www.designfreelogoonline.com/wp-content/uploads/2016/12/000782-link-3D-logo-design-online-free-3d-logo-maker-01.png"
        expanded={expanded}
        onExpand={() => setExpanded(!expanded)}
      ></SidebarHeader>
      <SideBarContent
        expanded={expanded}
        categories={finalMenuCategories}
      ></SideBarContent>
    </div>
  );
};

export default SideBar;
