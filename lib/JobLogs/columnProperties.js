import {
  sortNumbers,
  sortDates,
  sortStrings,
  useFormattedMCLProps,
} from '../utils';

export const DEFAULT_JOB_LOGS_SORT_COLUMNS = {
  hrId: {
    sortFn: sortNumbers,
    useFormatterFn: false,
  },
  jobProfileName: {
    sortFn: sortStrings,
    useFormatterFn: false,
  },
  totalRecords: {
    sortFn: sortNumbers,
    useFormatterFn: true,
  },
  runBy: {
    sortFn: sortStrings,
    useFormatterFn: true,
  },
  completedDate: {
    sortFn: sortDates,
    useFormatterFn: false,
  },
};

export const DEFAULT_JOB_LOGS_COLUMNS = [
  'fileName',
  'hrId',
  'jobProfileName',
  'totalRecords',
  'completedDate',
  'runBy',
];

export const DEFAULT_JOB_LOGS_COLUMN_MAPPING = {
  fileName: 'stripes-data-transfer-components.fileName',
  hrId: 'stripes-data-transfer-components.jobExecutionHrId',
  jobProfileName: 'stripes-data-transfer-components.jobProfileName',
  totalRecords: 'stripes-data-transfer-components.records',
  completedDate: 'stripes-data-transfer-components.jobCompletedDate',
  runBy: 'stripes-data-transfer-components.runBy',
};

export const DEFAULT_JOB_LOGS_COLUMN_WIDTHS = { hrId: '60px' };

export const useJobLogsProperties = (customProps = {}) => {
  return useFormattedMCLProps(
    {
      columnWidths: { ...DEFAULT_JOB_LOGS_COLUMN_WIDTHS },
      columnMapping: { ...DEFAULT_JOB_LOGS_COLUMN_MAPPING },
      visibleColumns: [...Object.values(DEFAULT_JOB_LOGS_COLUMNS)],
    },
    customProps
  );
};
