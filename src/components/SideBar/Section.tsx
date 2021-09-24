import * as React from "react";
import { SelectedOption } from "./MainItem";
import Menu from "./Menu";
import { MenuSection } from "./Data";

import { determineExpanded } from ".";
import "./styles.scss";

interface MenuSectionProps {
  expanded: boolean;
  section: MenuSection;
  currentSelection: SelectedOption;
  onChangeSelected: (selectedOption: SelectedOption) => void;
}

/**
 * Renders a menu section as well each of it's respective menu items.
 *
 * @param expanded whether the menu item is expanded or not
 * @param section the section item to render
 * @returns the section and it's menu items to be rendered.
 */
const Section = ({
  expanded,
  section,
  currentSelection,
  onChangeSelected,
}: MenuSectionProps) => {
  return (
    <div className={`section-container`}>
      {section.name && (
        <div className="title-container">
          <div className={`title ${determineExpanded(expanded)}`}>
            {expanded ? section.name : ""}
          </div>
          <div className={`seperator ${determineExpanded(expanded)}`}></div>
        </div>
      )}

      {section.menuItems.map((menuItem, i) => (
        /* Render each menu item  */
        <Menu.MainItem
          key={i}
          expanded={expanded}
          menuItem={menuItem}
          sectionName={section.name}
          currentSelection={currentSelection}
          onChangeSelected={onChangeSelected}
        ></Menu.MainItem>
      ))}
    </div>
  );
};

export default Section;
