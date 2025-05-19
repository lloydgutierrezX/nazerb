export type IRoleResponse = {
  id: string;
  name: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
}

export type IRoleInput = {
  name: string, description: string, is_active: boolean
}