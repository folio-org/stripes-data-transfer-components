import React from 'react';
import { FormattedMessage } from 'react-intl';

const FILE_STATUSES = {
  COMPLETED: 'COMPLETED',
  FAIL: 'FAIL',
};

const {
  COMPLETED,
  FAIL,
} = FILE_STATUSES;

export const FILTERS = {
  ERRORS: 'status',
  DATE: 'completedDate',
  JOB_PROFILE: 'jobProfileId',
  USER: 'userId',
};

export const FILTER_OPTIONS = {
  ERRORS: [
    {
      value: COMPLETED,
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.no" />,
    },
    {
      value: FAIL,
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.yes" />,
    },
  ],
};

export const LOGS_FILTER = `(status any "${COMPLETED} ${FAIL}")`;
