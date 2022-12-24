export const jsonHasProperties = (json: any, keys: string[]) => {
  let good = true;
  Object.keys(json).forEach((key) => {
    good = good && keys.includes(key);
  });
  return good;
};
