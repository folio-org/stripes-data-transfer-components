import React from 'react';
import { FormattedMessage } from 'react-intl';

const FILE_STATUSES = {
  NEW: 'NEW',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  COMMITTED: 'COMMITTED',
  ERROR: 'ERROR',
  ERROR_DEFINITION: 'ERROR_DEFINITION',
  DELETING: 'DELETING',
  DISCARDED: 'DISCARDED',
};

const {
  COMMITTED,
  ERROR,
} = FILE_STATUSES;

export const FILTERS = {
  ERRORS: 'status',
  DATE: 'completedDate',
  JOB_PROFILE: 'jobProfileInfo',
  USER: 'userId',
  SINGLE_RECORD_IMPORTS: 'singleRecordImports',
};

export const FILTER_OPTIONS = {
  ERRORS: [
    {
      value: COMMITTED,
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.no" />,
    },
    {
      value: ERROR,
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.yes" />,
    },
  ],
  SINGLE_RECORD_IMPORTS: [
    {
      value: 'no',
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.no" />,
    },
    {
      value: 'yes',
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.yes" />,
    },
  ],
};

export const LOGS_FILTER = `(status any "${COMMITTED} ${ERROR}")`;
