import { useIntl } from 'react-intl';

import { iso8601Timestamp } from './iso8601Timestamp';

export const useDateFormatter = () => {
  const intl = useIntl();

  return date => intl.formatDate(iso8601Timestamp(date));
};
