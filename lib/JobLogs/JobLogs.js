import React from 'react';
import PropTypes from 'prop-types';

import { MultiColumnList } from '@folio/stripes/components';

import { Preloader } from '../Preloader';
import { withJobLogsSort } from './withJobLogsSort';
import { jobExecutionPropTypes } from '../Jobs';

const JobLogsComponent = props => {
  const {
    formatter,
    contentData,
    hasLoaded,
    sortDirection,
    sortField,
    onSort,
    visibleColumns,
    columnWidths,
    columnMapping,
  } = props;

  if (!hasLoaded) return <Preloader />;

  return (
    <MultiColumnList
      id="job-logs-list"
      totalCount={contentData.length}
      contentData={contentData}
      columnMapping={columnMapping}
      visibleColumns={visibleColumns}
      columnWidths={columnWidths}
      formatter={formatter}
      sortOrder={sortField}
      sortDirection={sortDirection}
      autosize
      onHeaderClick={onSort}
    />
  );
};

JobLogsComponent.propTypes = {
  formatter: PropTypes.object.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  hasLoaded: PropTypes.bool,
  contentData: PropTypes.arrayOf(jobExecutionPropTypes),
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
  columnWidths: PropTypes.object.isRequired,
  columnMapping: PropTypes.object.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

JobLogsComponent.defaultProps = {
  contentData: [],
  hasLoaded: false,
};

export const JobLogs = withJobLogsSort(JobLogsComponent);
