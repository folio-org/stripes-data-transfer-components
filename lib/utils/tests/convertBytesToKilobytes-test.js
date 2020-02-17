import {
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { convertBytesToKilobytes } from '../convertBytesToKilobytes';

describe('convertBytesToKilobytes', () => {
  it('should convert correctly integers', () => {
    expect(convertBytesToKilobytes(1024)).to.equal(1);
  });

  it('should convert correctly decimals', () => {
    expect(convertBytesToKilobytes(1024.5)).to.equal(2);
  });
});
