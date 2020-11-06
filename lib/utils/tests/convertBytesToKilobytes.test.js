import { convertBytesToKilobytes } from '../convertBytesToKilobytes';

describe('convertBytesToKilobytes', () => {
  it('should convert correctly integers', () => {
    expect(convertBytesToKilobytes(1024)).toEqual(1);
  });

  it('should convert correctly decimals', () => {
    expect(convertBytesToKilobytes(1024.5)).toEqual(2);
  });
});
