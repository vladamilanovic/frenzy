export const numberToCurrencyLocaleString = (
  num: number,
  maximumFractionDigits = 0,
  locale = 'en-US',
  currency = 'USD'
) =>
  num.toLocaleString(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits
  });

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  if (result) return JSON.parse(result);
  return null;
};

export const sleep = async (ms = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
