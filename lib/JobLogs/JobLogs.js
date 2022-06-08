import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

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
    visibleColumns,
    columnWidths,
    columnMapping,
    mclProps,
    onSort,
    onRowClick,
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
      onRowClick={onRowClick}
      onHeaderClick={onSort}
      {...mclProps}
    />
  );
};

JobLogsComponent.propTypes = {
  formatter: PropTypes.object.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  hasLoaded: PropTypes.bool,
  contentData: PropTypes.arrayOf(jobExecutionPropTypes),
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
  columnWidths: PropTypes.object.isRequired,
  columnMapping: PropTypes.object.isRequired,
  mclProps: PropTypes.object,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSort: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
};

JobLogsComponent.defaultProps = {
  contentData: [],
  hasLoaded: false,
  onRowClick: noop,
};

export const JobLogs = withJobLogsSort(JobLogsComponent);
