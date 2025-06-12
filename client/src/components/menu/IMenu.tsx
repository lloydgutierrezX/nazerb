type IMenuContent = {
  key: string;
  is_active: boolean;
  path?: string;
  icon?: string;
};

export interface IMenu extends IMenuContent {
  children?: IMenu[];
}

// Temporary menu while the auth is not ready
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
    key: "payslips",
    path: "/payslips",
    is_active: true,
    icon: "wallet-cards",
  },
  {
    key: "management",
    is_active: true,
    icon: "settings",
    children: [
      {
        key: "employee type",
        path: "management/employee-type",
        is_active: true,
        icon: "file-user",
      },
      {
        key: "employee-benefit",
        path: "management/employee-benefit",
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
        key: "permissions",
        path: "security/permissions",
        is_active: true,
        icon: "shield-user",
      },
      {
        key: "roles",
        path: "security/roles",
        is_active: true,
        icon: "user-cog",
      },
    ],
  },
];
