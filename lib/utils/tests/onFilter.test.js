import { onFilter } from '../onFilter'; // Update the path accordingly

describe('onFilter', () => {
  const dataOptions = [
    { label: 'instance' },
    { label: 'holdings' },
    { label: 'item' },
  ];

  it('filters options based on case-insensitive partial match', () => {
    const result = onFilter('instance', dataOptions);
    expect(result).toEqual([{ label: 'instance' }]);
  });

  it('returns an empty array when no match is found', () => {
    const result = onFilter('test', dataOptions);
    expect(result).toEqual([]);
  });

  it('returns all options when an empty string is provided', () => {
    const result = onFilter('', dataOptions);
    expect(result).toEqual(dataOptions);
  });
});
