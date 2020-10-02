import {
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import { formatTranslationChunks } from '../formatTranslationChunks';

describe('formatTranslationChunks', () => {
  it('should format array into string', () => {
    expect(formatTranslationChunks(['test ', 'chunks'])).to.equal('test chunks');
  });

  it('should return initial string', () => {
    expect(formatTranslationChunks('test chunks')).to.equal('test chunks');
  });

  it('should return empty string, when no parameters are passed', () => {
    expect(formatTranslationChunks()).to.equal('');
  });
});
