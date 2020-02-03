import {
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import {
  convertDate,
  DATE_TYPES,
} from '../convertDate';

describe('convertDate', () => {
  const correctDateString = '2020-02-04T14:43:48.896Z';

  it('should return input string in case of invalid date string', () => {
    expect(convertDate('someDateString')).to.be.equal('someDateString');
  });

  it('should return string value of input date by default', () => {
    const result = convertDate(correctDateString);

    expect(typeof result).to.be.equal('string');
    expect(result).to.be.equal(new Date(correctDateString).toString());
  });

  it('should return number of milliseconds between 1 January 1970 00:00:00 UTC and given date.', () => {
    const result = convertDate(correctDateString, DATE_TYPES.number);

    expect(typeof result).to.be.equal('number');
    expect(result).to.be.equal(1580827428896);
  });

  it('should return date object initialized using input date string', () => {
    const result = convertDate(correctDateString, DATE_TYPES.Date);

    expect(typeof result).to.be.equal('object');
    expect(result.toISOString()).to.be.equal(correctDateString);
  });

  it('should return input string in case of unsupported date type parameter', () => {
    expect(convertDate(correctDateString, 'someDateType')).to.be.equal(correctDateString);
  });
});
