import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';
import { Highlighter } from '@folio/stripes/components';

import { ActionIcon } from '../ActionIcon';

import {
  FOLIO_RECORD_TYPES,
  ACTION_TYPES,
} from '../../utils';

import sharedCss from '../styles.css';

export const createActionLabel = ({ formatMessage }, action, folioRecord) => {
  const actionString = formatMessage({ id: ACTION_TYPES[action].captionId });
  // record type should be in lower case except "MARC" is always all-caps
  const recordTypeString = formatMessage({ id: FOLIO_RECORD_TYPES[folioRecord].captionId })
    .toLowerCase()
    .replace('marc', 'MARC');

  return `${actionString} ${recordTypeString}`;
};

export const ActionColumn = memo(({
  record,
  searchTerm = '',
}) => {
  const intl = useIntl();

  if (!record) {
    return <span>-</span>;
  }

  const {
    action,
    folioRecord,
  } = record;

  if (!action || !folioRecord) {
    return <span>-</span>;
  }

  const label = (
    <Highlighter
      searchWords={[searchTerm || '']}
      text={createActionLabel(intl, action, folioRecord)}
      className={sharedCss.container}
    />
  );
  const actionIcon = (
    <ActionIcon icon={ACTION_TYPES[action].iconKey}>
      {label}
    </ActionIcon>
  );

  return (
    <AppIcon
      size="small"
      app="data-import"
      iconKey={FOLIO_RECORD_TYPES[folioRecord].iconKey}
    >
      {actionIcon}
    </AppIcon>
  );
});

ActionColumn.propTypes = {
  record: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
};
