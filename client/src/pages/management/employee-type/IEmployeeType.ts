export type IEmployeeTypeResponse = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type IEmployeeTypeInput = {
  name: string,
  description: string,
  is_active: boolean
}