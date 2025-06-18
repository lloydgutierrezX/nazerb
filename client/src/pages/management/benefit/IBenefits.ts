export type IBenefitResponse = {
  id: string,
  type: "credit" | "debit",
  name: string,
  description: string,
  active: boolean,
  created_at: string,
  updated_at: string,
}

export type IBenefitInput = {
  name: string,
  type: "credit" | "debit",
  description: string,
  is_active: boolean,
}