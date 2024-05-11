export const formatCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    const formattedCount = (count / 1000).toFixed(1);
    return formattedCount.endsWith(".0")
      ? Math.floor(count / 1000) + "K"
      : formattedCount + "K";
  } else {
    const formattedCount = (count / 1000000).toFixed(1);
    return formattedCount.endsWith(".0")
      ? Math.floor(count / 1000000) + "M"
      : formattedCount + "M";
  }
};
