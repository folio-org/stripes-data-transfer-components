import { calculatePercentage } from '../calculatePercentage';

describe('calculatePercentage', () => {
  it('should calculate percentage correctly', () => {
    expect(calculatePercentage(10, 100)).toEqual(10);
  });

  it('should round number down and return integer value', () => {
    expect(calculatePercentage(1, 3)).toEqual(33);
  });
});
