export const onFilter = (value, dataOptions) => {
  return dataOptions.filter(option => new RegExp(value, 'i').test(option.label));
};
