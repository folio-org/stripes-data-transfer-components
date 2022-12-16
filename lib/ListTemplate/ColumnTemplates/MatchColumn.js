import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import {
  Highlighter,
  NoValue,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import {
  capitalize,
  HTML_LANG_DIRECTIONS,
  STRING_CAPITALIZATION_EXCLUSIONS,
  STRING_CAPITALIZATION_MODES,
  getFieldMatchedLabel,
} from '../../utils';

import { FOLIO_RECORD_TYPES } from '../../utils/folioRecordTypes';

import sharedCss from '../styles.css';

export const MatchColumn = memo(({
  record,
  searchTerm,
  identifierTypes,
  fieldsConfig,
}) => {
  const { formatMessage } = useIntl();

  if (!record) {
    return <span>-</span>;
  }

  const {
    existingRecordType,
    field,
  } = record;

  if (!field && !existingRecordType) {
    return <span>-</span>;
  }

  const fieldSource = (field || existingRecordType).replace(/_/g, ' ');
  const fields = get(record, 'matchDetails[0].existingMatchExpression.fields', []);
  const fieldMatchedLabel = getFieldMatchedLabel({
    fields,
    recordType: fieldSource,
    formatMessage,
    resources: identifierTypes,
    fieldsConfig,
  });

  return (
    <AppIcon
      size="small"
      app="data-import"
      iconKey={FOLIO_RECORD_TYPES[existingRecordType].iconKey}
    >
      <>
        {document.dir === HTML_LANG_DIRECTIONS.LEFT_TO_RIGHT && (
        <>
          <Highlighter
            searchWords={[(searchTerm || '')]}
            text={formatMessage({ id: FOLIO_RECORD_TYPES[existingRecordType].captionId })}
            className={sharedCss.container}
          />
                  &nbsp;&middot;&nbsp;
          <Highlighter
            searchWords={[searchTerm || '']}
            text={capitalize(fieldSource, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
            className={sharedCss.container}
          />
                  &nbsp;&rarr;&nbsp;
          {fieldMatchedLabel
            ? (
              <Highlighter
                searchWords={[searchTerm || '']}
                text={fieldMatchedLabel}
                className={sharedCss.container}
              />
            )
            : <NoValue />
                  }
        </>
        )}
        {document.dir === HTML_LANG_DIRECTIONS.RIGHT_TO_LEFT && (
        <>
          {fieldMatchedLabel
            ? (
              <Highlighter
                searchWords={[searchTerm || '']}
                text={fieldMatchedLabel}
                className={sharedCss.container}
              />
            ) : <NoValue />
                  }
                  &nbsp;&larr;&nbsp;
          <Highlighter
            searchWords={[searchTerm || '']}
            text={capitalize(fieldSource, STRING_CAPITALIZATION_MODES.WORDS, STRING_CAPITALIZATION_EXCLUSIONS)}
            className={sharedCss.container}
          />
                  &nbsp;&middot;&nbsp;
          <Highlighter
            searchWords={[searchTerm || '']}
            text={formatMessage({ id: FOLIO_RECORD_TYPES[existingRecordType].captionId })}
            className={sharedCss.container}
          />
        </>
        )}
      </>
    </AppIcon>
  );
});

MatchColumn.propTypes = {
  record: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
  identifierTypes: PropTypes.arrayOf(PropTypes.object),
};
