import React from 'react';
import PropTypes from 'prop-types';

import { SettingsLabel } from '../SettingsLabel';
import getItemFormatter from './getItemFormatter';
import { getMappingProfilesColumnProperties } from './columnProperties';
import { SearchAndSortPane } from '../../SearchAndSortPane';

const MappingProfiles = props => {
  const { formatter } = props;

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
      resultsFormatter={formatter}
      defaultSort="name"
      {...props}
    />
  );
};

MappingProfiles.propTypes = {
  formatter: PropTypes.object,
  resultCountIncrement: PropTypes.number,
  initialResultCount: PropTypes.number,
  resourceName: PropTypes.string.isRequired,
};

MappingProfiles.defaultProps = {
  ...getMappingProfilesColumnProperties(),
  formatter: getItemFormatter(),
  resultCountIncrement: 30,
  initialResultCount: 30,
  resourceName: 'mappingProfiles',
};

export default MappingProfiles;
