import { useIntl } from 'react-intl';
import { useListFormatter } from '../ListFormatter';

const runBy = record => {
  if (!record.runBy) {
    return '';
  }

  const {
    runBy: {
      firstName,
      lastName,
    },
  } = record;

  return `${firstName} ${lastName}`;
};

const jobProfileName = record => record.jobProfileName;

const totalRecords = record => {
  const {
    progress: {
      exported,
      total,
    },
  } = record;

  return exported ? total : '';
};

const fileName = record => record.fileName;
const hrId = record => record.hrId;

const getCompletedDateFormatter = intl => {
  return record => {
    const { completedDate } = record;

    return intl.formatTime(
      completedDate,
      {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }
    );
  };
};

export const useJobLogsListFormatter = (customFormatters = {}) => {
  const intl = useIntl();

  const jobLogsFormatters = {
    runBy,
    jobProfileName,
    totalRecords,
    fileName,
    hrId,
    completedDate: getCompletedDateFormatter(intl),
  };

  return useListFormatter({
    ...jobLogsFormatters,
    ...customFormatters,
  });
};
