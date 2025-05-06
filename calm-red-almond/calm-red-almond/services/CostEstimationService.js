export const estimateCost = (mode, distance, weight) => {
  // Basic estimation logic
  const rate = mode === 'air' ? 2.0 : 0.5;
  return rate * distance * weight;
};
