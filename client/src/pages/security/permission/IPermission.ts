export type IPermissionResponse = {
  id: string;
  name: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
}

export type IPermissionInput = {
  name: string, description: string, is_active: boolean
}