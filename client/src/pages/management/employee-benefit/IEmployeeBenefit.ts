export type IEmployeeBenefitResponse = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type IEmployeeBenefitInput = {
  name: string,
  description: string,
  is_active: boolean
}