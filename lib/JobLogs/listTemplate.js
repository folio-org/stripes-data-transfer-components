import React from 'react';
import { FormattedTime } from 'react-intl';

export const listTemplate = {
  runBy: record => {
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
  },
  completedDate: record => {
    const { completedDate } = record;

    return (
      <FormattedTime
        value={completedDate}
        day="numeric"
        month="numeric"
        year="numeric"
      />
    );
  },
  jobProfileName: record => {
    const { jobProfileName } = record;

    return jobProfileName;
  },
  totalRecords: record => {
    const {
      progress: {
        exported,
        total,
      },
    } = record;

    return exported ? total : '';
  },
  fileName: record => record.fileName,
  hrId: record => record.hrId,
};
