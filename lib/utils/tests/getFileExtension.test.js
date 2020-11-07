import { getFileExtension } from '../getFileExtension';

describe('getFileExtension', () => {
  it('should return file extension', () => {
    const testFile = new File([], 'test.csv');

    expect(getFileExtension((testFile))).toEqual('.csv');
  });

  it('should return null if extension does not match regExp', () => {
    const testFile = new File([], 'test');

    expect(getFileExtension((testFile))).toBeNull();
  });

  it('should return null if no file name', () => {
    const testFile = new File([], '');

    expect(getFileExtension(testFile)).toBeNull();
  });

  it('should return null if no file provided', () => {
    expect(getFileExtension()).toBeNull();
  });
});
