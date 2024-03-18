export const convertToCorrectType = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  const numericValue = Number(value);
  return isNaN(numericValue) ? value : numericValue;
};
