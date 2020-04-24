import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { noop } from 'lodash';

import { Pane } from '@folio/stripes/components';

import { SettingsLabel } from '../SettingsLabel';
import { SearchForm } from '../../SearchForm';
import { SearchResults } from '../../SearchResults';
import getItemFormatter from './getItemFormatter';
import { getMappingProfilesColumnProperties } from './columnProperties';

const RESULT_COUNT_INCREMENT = 30;

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
        />
      )}
    >
      <SearchForm
        searchTerm=" "
        searchLabelKey="stripes-data-transfer-components.search"
      />
      <SearchResults
        source={{
          records: () => contentData,
          pending: () => false,
          totalCount: () => contentData.length,
          fetchMore: noop,
        }}
        columnMapping={columnMapping}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        formatter={formatter}
        resultCountIncrement={RESULT_COUNT_INCREMENT}
        // TODO: uncomment line below when start working on details page (`match` and `location` should be destructured from props) (UIDEXP-50)
        // rowProps={{ href: id => `${match.path}/view/${id}${location.search}` }}
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

export default withRouter(MappingProfiles);
