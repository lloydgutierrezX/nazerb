const MARITAL_STATUS = {
  single: "SINGLE",
  married: "MARRIED",
  widowed: "WIDOWED",
  divorced: "DIVORCED",
};

object.freeze(MARITAL_STATUS);

const isMaritalStatusValid = (value) =>
  Object.keys(MARITAL_STATUS).includes(value.lowerCase());

module.exports = {
  MARITAL_STATUS,
  isMaritalStatusValid,
};
