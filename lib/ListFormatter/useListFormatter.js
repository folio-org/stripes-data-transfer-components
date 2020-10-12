import { useDateFormatter } from '../utils';

export const useListFormatter = (customFormatters = {}) => {
  const formatDate = useDateFormatter();

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
    ...customFormatters,
  };
};
