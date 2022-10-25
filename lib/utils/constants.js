export const SORT_TYPES = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

export const DEFAULT_FETCHER_UPDATE_INTERVAL = 5000;

export const getCapitalized = rt => {
  const lowerCase = rt.toLowerCase();

  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};
