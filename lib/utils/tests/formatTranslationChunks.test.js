import { formatTranslationChunks } from '../formatTranslationChunks';

describe('formatTranslationChunks', () => {
  it('should format array into string', () => {
    expect(formatTranslationChunks(['test ', 'chunks'])).toEqual('test chunks');
  });

  it('should return initial string', () => {
    expect(formatTranslationChunks('test chunks')).toEqual('test chunks');
  });

  it('should return empty string, when no parameters are passed', () => {
    expect(formatTranslationChunks()).toEqual('');
  });
});
