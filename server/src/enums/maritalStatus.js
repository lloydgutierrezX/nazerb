const MARITAL_STATUS = {
  single: "SINGLE",
  married: "MARRIED",
  widowed: "WIDOWED",
  divorced: "DIVORCED",
};

Object.freeze(MARITAL_STATUS);

export const isMaritalStatusValid = (value) =>
  Object.keys(MARITAL_STATUS).includes(value.lowerCase());
