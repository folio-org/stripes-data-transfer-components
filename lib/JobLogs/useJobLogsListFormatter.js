import { useListFormatter } from '../ListFormatter';
import { useTimeFormatter } from '../utils';

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
  const exported = record.progress?.exported;
  const total = record.progress?.total;

  return exported ? total : '';
};

const fileName = record => record.fileName;
const hrId = record => record.hrId;

const getCompletedDateFormatter = formatTime => {
  return record => {
    const { completedDate } = record;

    return formatTime(
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
  const formatTime = useTimeFormatter();

  const jobLogsFormatters = {
    runBy,
    jobProfileName,
    totalRecords,
    fileName,
    hrId,
    completedDate: getCompletedDateFormatter(formatTime),
  };

  return useListFormatter({
    ...jobLogsFormatters,
    ...customFormatters,
  });
};
