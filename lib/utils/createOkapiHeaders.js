/**
 * Builds OKAPI headers set
 *
 * @param {object} okapi
 * @return {{ 'X-Okapi-Tenant': string }}
 */
export const createOkapiHeaders = okapi => {
  const {
    tenant,
  } = okapi;

  return {
    'X-Okapi-Tenant': tenant,
    ...(okapi.token && { 'X-Okapi-Token': okapi.token }),
  };
};
