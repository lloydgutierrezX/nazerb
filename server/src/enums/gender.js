const GENDER = {
  male: "MALE",
  female: "FEMALE",
};

Object.freeze(GENDER);

export const isGenderValid = (value) => Object.keys(GENDER).includes(value);
