import React from 'react';
import PropTypes from 'prop-types';

import { SettingsLabel } from '../SettingsLabel';
import { SearchAndSortPane } from '../../SearchAndSortPane';

export const MappingProfiles = props => {
  const {
    formatter,
    resultCountIncrement = 30,
    initialResultCount = 30,
    resourceName = 'mappingProfiles'
  } = props;

  return (
    <SearchAndSortPane
      data-test-mapping-profiles-pane
      objectName="mapping-profiles"
      label={(
        <SettingsLabel
          messageId="stripes-data-transfer-components.mappingProfilesTitle"
          iconKey="mappingProfiles"
        />
      )}
      resultCountMessageId="stripes-data-transfer-components.mappingProfilesCount"
      searchLabelKey="stripes-data-transfer-components.mappingProfilesTitle"
      resultsFormatter={formatter}
      defaultSort="name"
      resultCountIncrement={resultCountIncrement}
      initialResultCount={initialResultCount}
      resourceName={resourceName}
      {...props}
    />
  );
};

MappingProfiles.propTypes = {
  formatter: PropTypes.object,
  resultCountIncrement: PropTypes.number,
  initialResultCount: PropTypes.number,
  resourceName: PropTypes.string,
  columnWidths: PropTypes.object.isRequired,
  columnMapping: PropTypes.object.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};
