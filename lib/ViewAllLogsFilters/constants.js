import React from 'react';
import { FormattedMessage } from 'react-intl';

const FILE_STATUSES = {
  COMPLETED: 'COMPLETED',
  COMPLETED_WITH_ERRORS: 'COMPLETED_WITH_ERRORS',
  FAIL: 'FAIL',
};

const {
  COMPLETED,
  FAIL,
  COMPLETED_WITH_ERRORS,
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
      value: `${COMPLETED_WITH_ERRORS} or ${FAIL}`,
      label: <FormattedMessage id="stripes-data-transfer-components.filter.option.yes" />,
    },
  ],
};

export const LOGS_FILTER = `(status any "${COMPLETED} ${FAIL}")`;
