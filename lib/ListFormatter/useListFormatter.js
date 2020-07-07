import { useIntl } from 'react-intl';

export const useListFormatter = (customFormatters = {}) => {
  const intl = useIntl();

  return {
    name: record => record.name,
    updated: record => {
      const { metadata: { updatedDate } } = record;

      return intl.formatDate(updatedDate);
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
    ...customFormatters,
  };
};
