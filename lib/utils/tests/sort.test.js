import {
  sortNumbers,
  sortDates,
  sortStrings,
  buildSortOrder,
} from '../sort';

describe('sort functions', () => {
  it('should compare strings correctly ', () => {
    expect(sortStrings('abc', 'abc')).toEqual(0);
    expect(sortStrings('abc', 'acb')).toEqual(-1);
    expect(sortStrings('acb', 'abc')).toEqual(1);
  });

  it('should compare dates correctly ', () => {
    expect(sortDates('2020-02-17T10:26:56.548Z', '2020-02-17T10:27:22.300Z')).toEqual(-25752);
  });

  it('should compare nums correctly ', () => {
    expect(sortNumbers(100, 20)).toEqual(80);
    expect(sortNumbers(undefined, 20)).toEqual(-20);
    expect(sortNumbers(20, undefined)).toEqual(20);
  });

  it('should build sort order correctly ', () => {
    expect(buildSortOrder(null, 'name', 'id', 2)).toEqual('name,id');
    expect(buildSortOrder('name', 'name', 'id', 2)).toEqual('-name');
    expect(buildSortOrder(null, 'name', 'id', 1)).toEqual('name');
    expect(buildSortOrder(null, 'id', null, 1)).toEqual('id');
  });
});
