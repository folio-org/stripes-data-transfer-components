import {
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { calculatePercentage } from '../calculatePercentage';

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(10, 100)).to.be.equal(10);
  });

  it('should round number down and return integer value', () => {
    expect(calculatePercentage(1, 3)).to.be.equal(33);
  });
});
