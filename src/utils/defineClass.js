export const defineClass = (value) => {
  return value === 0 ? null : value > 0 ? "positive" : "negative";
};
