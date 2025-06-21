const GENDER = {
  male: "MALE",
  female: "FEMALE",
};

Object.freeze(GENDER);

const isGenderValid = (value) => Object.keys(GENDER).includes(value);

module.exports = {
  Gender,
  isGenderValid,
};
