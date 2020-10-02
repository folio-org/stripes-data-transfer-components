import React from 'react';
import PropTypes from 'prop-types';

import { SettingsLabel } from '../SettingsLabel';
import { SearchAndSortPane } from '../../SearchAndSortPane';

export const JobProfiles = props => {
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
      searchLabelKey="stripes-data-transfer-components.jobProfilesTitle"
      resultsFormatter={formatter}
      defaultSort="name"
      {...props}
    />
  );
};

JobProfiles.propTypes = {
  formatter: PropTypes.object.isRequired,
  resultCountIncrement: PropTypes.number,
  initialResultCount: PropTypes.number,
  titleId: PropTypes.string,
  resourceName: PropTypes.string,
  columnWidths: PropTypes.object.isRequired,
  columnMapping: PropTypes.object.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

JobProfiles.defaultProps = {
  titleId: 'stripes-data-transfer-components.jobProfilesTitle',
  resultCountIncrement: 30,
  initialResultCount: 30,
  resourceName: 'jobProfiles',
};
