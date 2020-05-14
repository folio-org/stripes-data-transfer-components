import React from 'react';
import { FormattedMessage } from 'react-intl';

import { combineMCLProps } from '../../utils/combineMCLProps';

export const DEFAULT_JOB_PROFILES_COLUMNS = {
  NAME: 'name',
  UPDATED: 'updated',
  UPDATED_BY: 'updatedBy',
};

export const getJobProfilesColumnProperties = combineMCLProps({
  visibleColumns: Object.values(DEFAULT_JOB_PROFILES_COLUMNS),
  columnMapping: {
    name: <FormattedMessage id="stripes-data-transfer-components.name" />,
    updated: <FormattedMessage id="stripes-data-transfer-components.updated" />,
    updatedBy: <FormattedMessage id="stripes-data-transfer-components.updatedBy" />,
  },
  columnWidths: {
    name: '300px',
    folioRecord: '150px',
    updated: '100px',
    updatedBy: '250px',
  },
});
