import React from 'react';
import PropTypes from 'prop-types';

import { SettingsLabel } from '../SettingsLabel';
import getItemFormatter from './getItemFormatter';
import { getJobProfilesColumnProperties } from './columnProperties';
import { SearchAndSortPane } from '../../SearchAndSortPane';

const JobProfiles = props => {
  const {
    formatter,
    titleId,
  } = props;

  return (
    <SearchAndSortPane
      data-test-job-profiles-pane
      objectName="job-profiles"
      label={(
        <SettingsLabel
          messageId={titleId}
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
  titleId: PropTypes.string,
  resourceName: PropTypes.string.isRequired,
};

JobProfiles.defaultProps = {
  ...getJobProfilesColumnProperties({}),
  formatter: getItemFormatter(),
  titleId: 'stripes-data-transfer-components.jobProfilesTitle',
  resultCountIncrement: 30,
  initialResultCount: 30,
  resourceName: 'jobProfiles',
};

export default JobProfiles;
