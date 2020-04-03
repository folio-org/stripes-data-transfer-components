import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  MultiColumnList,
} from '@folio/stripes/components';

import { SettingsLabel } from '../SettingsLabel';
import { SearchForm } from '../../SearchForm';
import getItemFormatter from './getItemFormatter';
import { getMappingProfilesColumnProperties } from './columnProperties';

const MappingProfiles = props => {
  const {
    columnMapping,
    columnWidths,
    visibleColumns,
    contentData,
    formatter,
  } = props;

  return (
    <Pane
      data-test-mapping-profiles-pane
      defaultWidth="fill"
      paneTitle={(
        <SettingsLabel
          messageId="stripes-data-transfer-components.mappingProfilesTitle"
          iconKey="mappingProfiles"
          app="data-export"
        />
      )}
    >
      <SearchForm
        searchTerm=" "
        searchLabelKey="stripes-data-transfer-components.search"
      />
      <MultiColumnList
        id="mapping-profiles-list"
        totalCount={contentData.length}
        contentData={contentData}
        columnMapping={columnMapping}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        formatter={formatter}
        autosize
      />
    </Pane>
  );
};

MappingProfiles.propTypes = {
  visibleColumns: PropTypes.arrayOf(PropTypes.string),
  columnMapping: PropTypes.object,
  columnWidths: PropTypes.object,
  contentData: PropTypes.arrayOf(PropTypes.object),
  formatter: PropTypes.object,
};

MappingProfiles.defaultProps = {
  ...getMappingProfilesColumnProperties(),
  contentData: [],
  formatter: getItemFormatter(),
};

export default MappingProfiles;
