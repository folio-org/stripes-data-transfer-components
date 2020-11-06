import { createOkapiHeaders } from '../createOkapiHeaders';

describe('createOkapiHeaders', () => {
  it('should create correct okapi headers', () => {
    const okapi = {
      tenant: 'tenant',
      token: 'token',
    };
    const okapiHeaders = createOkapiHeaders(okapi);

    expect(okapiHeaders).toEqual({
      'X-Okapi-Tenant': okapi.tenant,
      'X-Okapi-Token': okapi.token,
    });
  });
});
