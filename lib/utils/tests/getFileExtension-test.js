import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { getFileExtension } from '..';

describe('getFileExtension', () => {
  it('should return file extension', () => {
    const testFile = new File([], 'test.csv');

    expect(getFileExtension((testFile))).to.equal('.csv');
  });

  it('should return null if extension does not match regExp', () => {
    const testFile = new File([], 'test');

    expect(getFileExtension((testFile))).to.equal(null);
  });

  it('should return null if no file name', () => {
    const testFile = new File([], '');

    expect(getFileExtension(testFile)).to.equal(null);
  });

  it('should return null if no file provided', () => {
    expect(getFileExtension()).to.equal(null);
  });
});
