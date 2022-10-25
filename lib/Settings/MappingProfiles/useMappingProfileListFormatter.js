import { useListFormatter } from '../../ListFormatter';
import { getCapitalized } from '../../utils';

export const useMappingProfileListFormatter = (customFormatters = {}) => {
  const folioRecordFormatter = record => {
    const { recordTypes } = record;

    const formattedRecordTypesValues = recordTypes.reduce((memo, recordType) => {
      const isString = typeof recordType === 'string' || recordType instanceof String;

      const resultedRecordType = isString ? getCapitalized(recordType) : recordType;

      memo.push(resultedRecordType);

      return memo;
    }, []);

    return formattedRecordTypesValues;
  };

  return useListFormatter({
    folioRecord: folioRecordFormatter,
    ...customFormatters,
  });
};
