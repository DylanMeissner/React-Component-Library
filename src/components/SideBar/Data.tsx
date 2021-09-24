import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
export interface SubMenuItem {
  label: string;
  onClick: Function;
  icon?: IconProp;
}

export interface MainMenuItem {
  label: string;
  subMenuItems?: SubMenuItem[];
  onClick?: Function;
  icon: IconDefinition;
}

export interface MenuSection {
  name?: string;
  menuItems: MainMenuItem[];
}
