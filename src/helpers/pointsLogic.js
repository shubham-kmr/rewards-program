export const computePoints = (price) => {
  let points = 0;
  const floorPrice = Math.floor(price);

  if (floorPrice > 100) {
    points += (floorPrice - 100) * 2;
  }

  if (floorPrice > 50) {
    const eligibleAmount = floorPrice > 100 ? 50 : floorPrice - 50;
    points += eligibleAmount;
  }

  return points;
};