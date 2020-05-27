import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import { FOLIO_RECORD_TYPES } from '../../utils';
import { listTemplate as defaultListTemplate } from '../../ListTemplate';

export const listTemplate = {
  ...defaultListTemplate,
  folioRecord: record => {
    const { recordTypes } = record;

    return (
      <span>
        {recordTypes.map((recordType, i) => {
          const recordTypeValue = <FormattedMessage id={FOLIO_RECORD_TYPES[recordType].captionId} />;

          return <Fragment key={recordType}>{i ? ', ' : ''}{recordTypeValue}</Fragment>;
        })}
      </span>
    );
  },
};
