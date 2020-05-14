import React from 'react';
import { FormattedMessage } from 'react-intl';

import { FOLIO_RECORD_TYPES } from '../../utils';
import { listTemplate as defaultListTemplate } from '../../ListTemplate';

export const listTemplate = {
  ...defaultListTemplate,
  folioRecord: record => {
    const { existingRecordType } = record;

    return <FormattedMessage id={FOLIO_RECORD_TYPES[existingRecordType].captionId} />;
  },
};
