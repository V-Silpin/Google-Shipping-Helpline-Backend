export const optimizeRoute = (priority, options) => {
  // Simple optimization logic
  return options.sort((a, b) => (priority === 'cost' ? a.cost - b.cost : a.time - b.time));
};
