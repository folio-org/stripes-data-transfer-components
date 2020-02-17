/**
 * Builds OKAPI headers set
 *
 * @param {object} okapi
 * @return {{ 'X-Okapi-Token': string, 'X-Okapi-Tenant': string }}
 */
export const createOkapiHeaders = okapi => {
  const {
    token,
    tenant,
  } = okapi;

  return {
    'X-Okapi-Tenant': tenant,
    'X-Okapi-Token': token,
  };
};
