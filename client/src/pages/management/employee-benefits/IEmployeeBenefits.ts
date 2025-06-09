export type IEmployeeBenefitsResponse = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type IEmployeeBenefitsInput = {
  name: string,
  description: string,
  is_active: boolean
}