import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  sortNumbers,
  sortDates,
  sortStrings,
} from '../utils';

export const defaultColumnMapping = {
  fileName: <FormattedMessage id="stripes-data-transfer-components.fileName" />,
  hrId: <FormattedMessage id="stripes-data-transfer-components.jobExecutionHrId" />,
  jobProfileName: <FormattedMessage id="stripes-data-transfer-components.jobProfileName" />,
  totalRecords: <FormattedMessage id="stripes-data-transfer-components.records" />,
  completedDate: <FormattedMessage id="stripes-data-transfer-components.jobCompletedDate" />,
  runBy: <FormattedMessage id="stripes-data-transfer-components.runBy" />,
};

export const defaultVisibleColumns = [
  'fileName',
  'hrId',
  'jobProfileName',
  'totalRecords',
  'completedDate',
  'runBy',
];

export const defaultColumnWidths = {
  hrId: '60px',
  totalRecords: '80px',
};

export const defaultSortColumns = {
  hrId: {
    sortFn: sortNumbers,
    useFormatterFn: false,
  },
  jobProfileName: {
    sortFn: sortStrings,
    useFormatterFn: true,
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
