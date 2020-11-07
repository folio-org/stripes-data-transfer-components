import {
  convertDate,
  DATE_TYPES,
} from '../convertDate';

describe('convertDate', () => {
  const correctDateString = '2020-02-04T14:43:48.896Z';

  it('should return input string in case of invalid date string', () => {
    expect(convertDate('someDateString')).toEqual('someDateString');
  });

  it('should return string value of input date by default', () => {
    const result = convertDate(correctDateString);

    expect(typeof result).toEqual('string');
    expect(result).toEqual(new Date(correctDateString).toString());
  });

  it('should return number of milliseconds between 1 January 1970 00:00:00 UTC and given date.', () => {
    const result = convertDate(correctDateString, DATE_TYPES.number);

    expect(typeof result).toEqual('number');
    expect(result).toEqual(1580827428896);
  });

  it('should return date object initialized using input date string', () => {
    const result = convertDate(correctDateString, DATE_TYPES.Date);

    expect(typeof result).toEqual('object');
    expect(result.toISOString()).toEqual(correctDateString);
  });

  it('should return input string in case of unsupported date type parameter', () => {
    expect(convertDate(correctDateString, 'someDateType')).toEqual(correctDateString);
  });
});
