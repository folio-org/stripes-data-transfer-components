import React from 'react';
import {
  FormattedMessage,
  FormattedDate,
} from 'react-intl';

import { FOLIO_RECORD_TYPES } from '../../utils';

export const listTemplate = {
  name: record => record.name,
  folioRecord: record => {
    const { existingRecordType } = record;

    return <FormattedMessage id={FOLIO_RECORD_TYPES[existingRecordType].captionId} />;
  },
  updated: record => {
    const { metadata: { updatedDate } } = record;

    return <FormattedDate value={updatedDate} />;
  },
  updatedBy: record => {
    const {
      userInfo: {
        firstName,
        lastName,
      },
    } = record;

    return `${firstName} ${lastName}`;
  },
};
