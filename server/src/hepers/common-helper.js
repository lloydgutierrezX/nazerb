export const hashedPassword = async (password) =>
  await bcrypt.hash(password, 12);

export const parseNormalizeDate = (date) => {
  if (typeof date !== "string") {
    throw new Error("Date must be a string");
  }

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) {
    throw new Error("Invalid date format");
  }

  parsed.setUTCHours(0, 0, 0, 0); // normalize time to 00:00:00.000 UTC
  return newDate;
};
