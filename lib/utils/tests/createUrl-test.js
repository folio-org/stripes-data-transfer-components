import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { createUrl } from '..';

describe('createUrl', () => {
  it('should create correct url', () => {
    const createdUrl = createUrl('http://api.com/users', {
      limit: 50,
      id: 'identifier',
    });
    const correctUrl = 'http://api.com/users?limit=50&id=identifier';

    expect(createdUrl).to.equal(correctUrl);
  });

  it('should encode query params correctly', () => {
    const createdUrl = createUrl('http://api.com/users', { id: 'hello world!' });
    const correctUrl = 'http://api.com/users?id=hello%20world!';

    expect(createdUrl).to.equal(correctUrl);
  });

  it('should not encode when there are no query params', () => {
    const createdUrl = createUrl('http://api.com/users', { id: 'hello world!' }, false);
    const correctUrl = 'http://api.com/users?id=hello world!';

    expect(createdUrl).to.equal(correctUrl);
  });

  it('should handle question sign correctly', () => {
    expect(createUrl('http://api.com/users?')).to.equal(createUrl('http://api.com/users'));
  });
});
