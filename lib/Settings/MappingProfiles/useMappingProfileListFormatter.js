import { useIntl } from 'react-intl';

import { FOLIO_RECORD_TYPES } from '../../utils';
import { useListFormatter } from '../../ListFormatter';

export const useMappingProfileListFormatter = (customFormatters = {}) => {
  const intl = useIntl();

  const folioRecordFormatter = record => {
    const { recordTypes } = record;

    const formattedRecordTypesValues = recordTypes.reduce((memo, recordType) => {
      const formattedValue = intl.formatMessage({ id: FOLIO_RECORD_TYPES[recordType].captionId });

      memo.push(formattedValue);

      return memo;
    }, []);

    return formattedRecordTypesValues.join(', ');
  };

  return useListFormatter({
    folioRecord: folioRecordFormatter,
    ...customFormatters,
  });
};
