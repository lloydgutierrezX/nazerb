export type IModuleResponse = {
  id: string;
  name: string;
  url: string;
  description: string;
  active: string;
  created_at: string;
  updated_at: string;
}

export type IModuleInput = {
  name: string, url: string, description: string, is_active: boolean
}