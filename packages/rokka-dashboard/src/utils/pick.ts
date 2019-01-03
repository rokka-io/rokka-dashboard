export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> => {
  const copy: any = {};
  keys.forEach(k => {
    copy[k] = obj[k];
  });
  return copy;
};
