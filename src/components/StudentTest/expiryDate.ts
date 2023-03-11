export const isExpiryDate = (d: string) => {
  const date = new Date();
  const expiryDate = new Date(d);

  return date > expiryDate;
};
