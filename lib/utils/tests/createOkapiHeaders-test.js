import { expect } from 'chai';
import {
  describe,
  it,
} from '@bigtest/mocha';

import { createOkapiHeaders } from '..';

describe('createOkapiHeaders', () => {
  it('should create correct okapi headers', () => {
    const okapi = {
      tenant: 'tenant',
      token: 'token',
    };
    const okapiHeaders = createOkapiHeaders(okapi);

    expect(okapiHeaders).to.deep.equal({
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
    });
  });
});
