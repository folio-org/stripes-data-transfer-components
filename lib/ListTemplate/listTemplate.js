import React from 'react';
import { FormattedDate } from 'react-intl';

export const listTemplate = {
  name: record => record.name,
  updated: record => {
    const { metadata: { updatedDate } } = record;

    return <FormattedDate value={updatedDate} />;
  },
  updatedBy: record => {
    if (!record.userInfo) {
      return '';
    }

    const {
      userInfo: {
        firstName,
        lastName,
      },
    } = record;

    return `${firstName} ${lastName}`;
  },
};
