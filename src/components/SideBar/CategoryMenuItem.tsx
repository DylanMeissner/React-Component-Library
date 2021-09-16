
import * as React from "react";
import MenuItem, { SelectedOption } from "./MainMenuItem";
import { Category } from "./Menu-Data";

import { determineExpanded } from "./SideBar";
import "./styles.scss";

interface CategoryItemProps {
  expanded: boolean;
  category: Category;
  currentSelection: SelectedOption;
  onChangeSelected: (selectedOption: SelectedOption) => void;
}

/**
 * Renders a category item of the menu as well each of it's respective menu items.
 * 
 * @param expanded whether the menu item is expanded or not
 * @param category the category item to render 
 * @returns categories and their menu items to be rendered.
 */
const CategoryItem = ({
  expanded,
  category,
  currentSelection,
  onChangeSelected,
}: CategoryItemProps) => {
  return (
    <div className={`category-container`}>
      <div className="title-container">
        <div className={`title ${determineExpanded(expanded)}`}>
          {expanded ? category.name : ""}
        </div>
        <div className={`seperator ${determineExpanded(expanded)}`}></div>
      </div>

      {category.menuItems.map((menuItem, i) => (
        /* Render each menu item  */
        <MenuItem
          key={i}
          expanded={expanded}
          menuItem={menuItem}
          categoryName={category.name}
          currentSelection={currentSelection}
          onChangeSelected={onChangeSelected}
        ></MenuItem>
      ))}
    </div>
  );
};

export default CategoryItem;
