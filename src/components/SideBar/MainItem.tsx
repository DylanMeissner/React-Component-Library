import { useState } from "react";
import React, { useEffect } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { determineExpanded } from ".";
import { MainMenuItem, SubMenuItem } from "./Data";
import _ from "lodash";
export interface SelectedOption {
  selectedMenuOption: string;
  selectedSubMenuOption?: string;
}

interface MainItemProps {
  sectionName?: string;
  expanded: boolean;
  menuItem: MainMenuItem;
  currentSelection: SelectedOption;
  onChangeSelected: (selectedOption: SelectedOption) => void;
}

enum SubMenuType {
  FLY_OUT = "flyout",
  ACORDIAN = "acordian",
}

interface SubMenuItemProps {
  type: SubMenuType;
  subMenuItems: SubMenuItem[];
  currentSelection: SelectedOption;
  handleClick: (subMenuItem: SubMenuItem) => void;
}

const SubMenuItems = ({
  type,
  subMenuItems,
  currentSelection,
  handleClick,
}: SubMenuItemProps) => {
  return (
    <div className={"submenu-container"}>
      <div className={`${type}`}>
        {subMenuItems.map((sub, i) => (
          <div
            key={i}
            className={`item ${
              currentSelection.selectedSubMenuOption === sub.label
                ? "selected"
                : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(sub);
            }}
          >
            {sub.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const MainItem = ({
  sectionName,
  expanded,
  menuItem,
  currentSelection,
  onChangeSelected,
}: MainItemProps) => {
  const [subMenuOpen, setSubMenuOpen] = useState(
    currentSelection.selectedMenuOption === menuItem.label
  );
  const [hovered, setHovered] = useState(false);

  /**
   * Effect to ensure that the correct menu option
   * is opened when the current selection changes
   */
  useEffect(() => {
    setSubMenuOpen(currentSelection.selectedMenuOption === menuItem.label);
  }, [currentSelection]);

  const handleMainItemClicked = () => {
    // Trigger the main menu items onCLick event if it has one
    if (!_.isNil(menuItem.onClick)) {
      onChangeSelected({
        selectedMenuOption: menuItem.label,
        selectedSubMenuOption: "",
      });
      menuItem.onClick();
    }
    // if the menu is collapsed and the menu item has sub-menu items then trigger the onClick of the first sub-menu item.
    else if (!expanded && menuItem.subMenuItems && menuItem.subMenuItems[0]) {
      onChangeSelected({
        selectedMenuOption: menuItem.label,
        selectedSubMenuOption: menuItem.subMenuItems[0].label,
      });
      menuItem.subMenuItems[0].onClick();
    }
    // if the menu is expanded then simply open up the sub-menu options
    else if (expanded) {
      onChangeSelected({
        selectedMenuOption: menuItem.label,
        selectedSubMenuOption: "",
      });
    }
  };

  return (
    <>
      <div
        // className={`main-menu-item ${subMenuOpen ? "selected" : ""}`}
        className={`main-menu-item`}
        onClick={handleMainItemClicked}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FontAwesomeIcon className={`icon`} icon={menuItem.icon} />

        <div
          className={`name ${determineExpanded(expanded)}`}
          onMouseEnter={(e) => e.preventDefault()}
        >
          {menuItem.label}
        </div>

        {/* Fly out sub-menu item component */}
        {menuItem.subMenuItems &&
          menuItem.subMenuItems.length > 0 &&
          !expanded &&
          hovered && (
            <SubMenuItems
              type={SubMenuType.FLY_OUT}
              subMenuItems={menuItem.subMenuItems}
              currentSelection={currentSelection}
              handleClick={(subMenuItem) => {
                onChangeSelected({
                  selectedMenuOption: menuItem.label,
                  selectedSubMenuOption: subMenuItem.label,
                });
                subMenuItem.onClick();
              }}
            ></SubMenuItems>
          )}
      </div>

      {/* Acordian  sub-menu item component */}
      {menuItem.subMenuItems &&
        menuItem.subMenuItems.length > 0 &&
        expanded &&
        subMenuOpen && (
          <SubMenuItems
            type={SubMenuType.ACORDIAN}
            subMenuItems={menuItem.subMenuItems}
            currentSelection={currentSelection}
            handleClick={(subMenuItem) => {
              onChangeSelected({
                selectedMenuOption: menuItem.label,
                selectedSubMenuOption: subMenuItem.label,
              });
              subMenuItem.onClick();
            }}
          ></SubMenuItems>
        )}
    </>
  );
};

export default MainItem;
