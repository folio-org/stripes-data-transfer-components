import { useIntl } from 'react-intl';
import { useDateFormatter } from '../utils';

export const useListFormatter = (customFormatters = {}) => {
  const formatDate = useDateFormatter();
  const intl = useIntl();

  return {
    name: record => record.name,
    updated: record => {
      const { metadata: { updatedDate } } = record;

      return formatDate(updatedDate);
    },
    updatedBy: record => {
      if (!record.userInfo) {
        return '';
      }

      const {
        userInfo: {
          firstName,
          lastName,
        },
      } = record;

      return `${firstName} ${lastName}`;
    },
    locked: record => {
      return record.locked ? intl.formatMessage({ id: 'stripes-data-transfer-components.locked' }) : '';
    },
    ...customFormatters,
  };
};
