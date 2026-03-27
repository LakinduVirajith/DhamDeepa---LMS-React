// SideNav Types
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

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// User Types
export interface User {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  roles: {
    admin: number;
    teacher: number;
    prefect: number;
  };
  status: {
    active: number;
    inactive: number;
  };
  totalUsers: number;
}
