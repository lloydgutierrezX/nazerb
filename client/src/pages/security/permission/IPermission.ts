export type IPermissionResponse = {
  id: string;
  moduleId: string;
  action: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
}

export type IPermissionInput = {
  action: string, moduleId: string, description: string, is_active: boolean
}