export const formatSnils = (snils: string) => {
  if (!/^\d{11}$/.test(snils)) {
    return snils;
  }

  const firstPart = snils.slice(0, 3);
  const secondPart = snils.slice(3, 6);
  const thirdPart = snils.slice(6, 9);
  const lastTwoDigits = snils.slice(9);

  return `${firstPart}-${secondPart}-${thirdPart} ${lastTwoDigits}`;
}