import { useState } from "react";
import  React, {useEffect} from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { determineExpanded } from ".";
import { MainMenuItem, SubMenuItem } from "./Data";
import { useHistory, useLocation } from 'react-router-dom';
import { isNil } from 'lodash';

export interface SelectedOption {
  selectedMenuOption: string;
  selectedSubMenuOption?: string;
}

interface MainItemProps {
  sectionName: string;
  expanded: boolean;
  menuItem: MainMenuItem;
  currentSelection: SelectedOption;
  onChangeSelected: (selectedOption: SelectedOption) => void;
}

enum SubMenuType {
 FLY_OUT = "flyout",
 ACORDIAN = "acordian"
}

interface SubMenuItemProps {
  type: SubMenuType, 
  subMenuItems: SubMenuItem[], 
  currentSelection: SelectedOption;
  handleClick:  (subMenuItemName: string, linkTo: string) => void
}

const SubMenuItems = ({type, subMenuItems, currentSelection, handleClick}: SubMenuItemProps) => {
  return (
    <div className={"submenu-container"}>
    <div className={`${type}`}>
      {subMenuItems.map((sub, i) => (
        <div key={i} className={`item ${currentSelection.selectedSubMenuOption === sub.label ? "selected" : ""}`} onClick={(e) => { 
          e.stopPropagation();
          handleClick(sub.label, sub.linkTo)}}>
          {sub.label}
        </div>
      ))}
    </div>
  </div>
  )
}

const MainItem = ({
  sectionName,
  expanded,
  menuItem,
  currentSelection,
  onChangeSelected
}: MainItemProps) => {
  const [subMenuOpen, setSubMenuOpen] = useState(currentSelection.selectedMenuOption === menuItem.label);
  const [hovered, setHovered] = useState(false);
  const history = useHistory();
  const location = useLocation();

  /**
   * Effect to ensure that the correct menu option 
   * is opened when the current selection changes
   */
  useEffect(() => {
    setSubMenuOpen(currentSelection.selectedMenuOption === menuItem.label)
  }, [currentSelection]);

  /**
   * Effect to ensure that the currently selected option is correctly hilighted
   * when the expanded state is changed.
   */
  useEffect(() => {
    const subMenuCurrentlyLinked = menuItem.subMenuItems?.find(i => i.linkTo === location.pathname);
    const isMenuPageOpen = (menuItem.linkTo === location.pathname || !isNil(subMenuCurrentlyLinked));

    if(isMenuPageOpen) {
      onChangeSelected({selectedMenuOption: menuItem.label, selectedSubMenuOption: subMenuCurrentlyLinked?.label || ''})
    }
    
    setSubMenuOpen(isMenuPageOpen);
  }, [expanded]);


  return (
    <>
      <div
        className={`main-menu-item ${subMenuOpen ? "selected" : ""}`}
        onClick={() => {
            if(menuItem.linkTo){
              onChangeSelected({selectedMenuOption: menuItem.label, selectedSubMenuOption: ''})
            }
            
            if(menuItem.linkTo) {
              history.push(menuItem.linkTo);
            }
        }}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FontAwesomeIcon className={`icon`} icon={menuItem.icon} />

        <div className={`name ${determineExpanded(expanded)}`} onMouseEnter={(e) => e.preventDefault()}>{menuItem.label}</div>

        {/* Fly out sub-menu item component */}
        {menuItem.subMenuItems &&
          menuItem.subMenuItems.length > 0 &&
          !expanded &&
          hovered && (
            <SubMenuItems
            type={SubMenuType.FLY_OUT}
            subMenuItems={menuItem.subMenuItems}
            currentSelection={currentSelection}
            handleClick={(subMenuItemName, linkTo) => {
              onChangeSelected({selectedMenuOption: menuItem.label, selectedSubMenuOption: subMenuItemName})
              history.push(linkTo);
              }}
            ></SubMenuItems>
          )}
      </div>

      {/* Acordian  sub-menu item component */}
      {menuItem.subMenuItems &&
        menuItem.subMenuItems.length > 0 &&
        expanded &&
        subMenuOpen &&
         (
          <SubMenuItems
          type={SubMenuType.ACORDIAN}
          subMenuItems={menuItem.subMenuItems}
          currentSelection={currentSelection}
          handleClick={(subMenuItemName, linkTo) => {
            onChangeSelected({selectedMenuOption: menuItem.label, selectedSubMenuOption: subMenuItemName})
            history.push(linkTo);
           }}
          ></SubMenuItems>
        )}
    </>
  );
};

export default MainItem;