export const calculateCalories = (weight, height, age) => {
  return 10 * weight + 6.25 * height - 5 * age + 5;
};