import { useDateFormatter } from '../utils';
import { useIntl } from 'react-intl';

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
    locked: record => record.locked ? intl.formatMessage({ id: 'stripes-data-transfer-components.locked' }) : '',
    ...customFormatters,
  };
};
