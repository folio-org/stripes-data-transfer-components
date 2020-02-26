import React from 'react';
import { FormattedTime } from 'react-intl';

export const listTemplate = {
  runBy: record => {
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
    const { jobProfileInfo: { name } } = record;

    return name;
  },
  totalRecords: record => {
    const { progress: { total } } = record;

    return total;
  },
  fileName: record => record.fileName,
  hrId: record => record.hrId,
};
