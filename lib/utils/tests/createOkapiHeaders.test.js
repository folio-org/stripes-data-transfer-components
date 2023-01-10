import { createOkapiHeaders } from '../createOkapiHeaders';

describe('createOkapiHeaders', () => {
  it('should create correct okapi headers', () => {
    const okapi = {
      tenant: 'tenant',
    };
    const okapiHeaders = createOkapiHeaders(okapi);

    expect(okapiHeaders).toEqual({
      'X-Okapi-Tenant': okapi.tenant,
    });
  });
});
