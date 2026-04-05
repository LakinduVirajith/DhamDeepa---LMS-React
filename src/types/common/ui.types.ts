export interface SideNavProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export interface MenuChild {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: any;
  children: MenuChild[];
  roles: string[];
}
