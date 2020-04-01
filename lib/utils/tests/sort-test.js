import {
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';
import {
  sortNumbers,
  sortDates,
  sortStrings,
} from '../sort';

describe('sort functions', () => {
  it('should compare strings correctly ', () => {
    expect(sortStrings('abc', 'abc')).to.equal(0);
    expect(sortStrings('abc', 'acb')).to.equal(-1);
    expect(sortStrings('acb', 'abc')).to.equal(1);
  });

  it('should compare dates correctly ', () => {
    expect(sortDates('2020-02-17T10:26:56.548Z', '2020-02-17T10:27:22.300Z')).to.equal(-25752);
  });

  it('should compare nums correctly ', () => {
    expect(sortNumbers(100, 20)).to.equal(80);
    expect(sortNumbers(undefined, 20)).to.equal(-20);
    expect(sortNumbers(20, undefined)).to.equal(20);
  });
});
