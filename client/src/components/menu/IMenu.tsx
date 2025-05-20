type IMenuContent = {
  key: string;
  is_active: boolean;
  path?: string;
  icon?: string;
};

export interface IMenu extends IMenuContent {
  children?: IMenu[];
}

// Sample MEN response from BE
export const jsonMenu = [
  {
    key: "dashboard",
    path: "/dashboard",
    is_active: true,
    icon: "house",
  },
  {
    key: "employees",
    path: "/account",
    is_active: true,
    icon: "user",
  },
  {
    key: "timesheets",
    path: "/timesheets",
    is_active: true,
    icon: "calendar-clock",
  },
  {
    key: "management",
    is_active: true,
    icon: "settings",
    children: [
      {
        key: "employee-status",
        path: "management/employee-status",
        is_active: true,
        icon: "file-user",
      },
    ],
  },
  {
    key: "security",
    icon: "user-cog",
    is_active: true,
    children: [
      {
        key: "users",
        path: "security/users",
        is_active: true,
        icon: "circle-user",
      },
      {
        key: "modules",
        path: "security/modules",
        is_active: true,
        icon: "component",
      },
      {
        key: "roles",
        path: "security/roles",
        is_active: true,
        icon: "user-cog",
      },
      {
        key: "permissions",
        path: "security/permissions",
        is_active: true,
        icon: "shield-user",
      },
    ],
  },
];
