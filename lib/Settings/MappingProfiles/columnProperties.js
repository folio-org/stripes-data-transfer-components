import React from 'react';
import { FormattedMessage } from 'react-intl';

const defaultColumnWidths = {
  name: '300px',
  folioRecord: '150px',
  updated: '100px',
  updatedBy: '250px',
};

const defaultColumnMapping = {
  name: <FormattedMessage id="stripes-data-transfer-components.name" />,
  folioRecord: <FormattedMessage id="stripes-data-transfer-components.folioRecordType" />,
  updated: <FormattedMessage id="stripes-data-transfer-components.updated" />,
  updatedBy: <FormattedMessage id="stripes-data-transfer-components.updatedBy" />,
};

export const DEFAULT_MAPPING_PROFILES_COLUMNS = {
  NAME: 'name',
  FOLIO_RECORD: 'folioRecord',
  UPDATED: 'updated',
  UPDATED_BY: 'updatedBy',
};

const defaultVisibleColumns = [...Object.values(DEFAULT_MAPPING_PROFILES_COLUMNS)];

export const getMappingProfilesColumnProperties = (props = {
  visibleColumns: defaultVisibleColumns,
  customProperties: {
    columnWidths: {},
    columnMapping: {},
  },
}) => {
  const {
    visibleColumns,
    customProperties,
  } = props;
  const result = {
    columnWidths: {},
    columnMapping: {},
    visibleColumns,
  };
  const {
    columnWidths,
    columnMapping,
  } = customProperties;

  visibleColumns.forEach(column => {
    result.columnWidths[column] = columnWidths[column] ? columnWidths[column] : defaultColumnWidths[column];
    result.columnMapping[column] = columnMapping[column] ? columnMapping[column] : defaultColumnMapping[column];
  });

  return result;
};
