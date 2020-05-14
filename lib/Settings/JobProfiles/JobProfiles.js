import React from 'react';
import PropTypes from 'prop-types';

import { SettingsLabel } from '../SettingsLabel';
import getItemFormatter from './getItemFormatter';
import { getJobProfilesColumnProperties } from './columnProperties';
import { SearchAndSortPane } from '../../SearchAndSortPane';

const JobProfiles = props => {
  const { formatter } = props;

  return (
    <SearchAndSortPane
      data-test-job-profiles-pane
      objectName="mapping-profiles"
      label={(
        <SettingsLabel
          messageId="stripes-data-transfer-components.jobProfilesTitle"
          iconKey="jobProfiles"
        />
      )}
      resultCountMessageId="stripes-data-transfer-components.jobProfilesCount"
      resultsFormatter={formatter}
      defaultSort="name"
      {...props}
    />
  );
};

JobProfiles.propTypes = {
  formatter: PropTypes.object,
  resultCountIncrement: PropTypes.number,
  initialResultCount: PropTypes.number,
  resourceName: PropTypes.string.isRequired,
};

JobProfiles.defaultProps = {
  ...getJobProfilesColumnProperties({}),
  formatter: getItemFormatter(),
  resultCountIncrement: 30,
  initialResultCount: 30,
  resourceName: 'jobsProfiles',
};

export default JobProfiles;
