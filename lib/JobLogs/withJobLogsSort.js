import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import compose from 'compose-function';

import { defaultJobLogsSortColumns } from './defaultJobLogsProps';
import { SORT_TYPES } from '../utils';
import { jobExecutionPropTypes } from '../Jobs';

const withJobLogsSortComponent = WrappedComponent => {
  return class extends Component {
    static propTypes = {
      history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
      location: PropTypes.oneOfType([
        PropTypes.shape({
          search: PropTypes.string.isRequired,
          pathname: PropTypes.string.isRequired,
        }).isRequired,
        PropTypes.string.isRequired,
      ]),
      contentData: PropTypes.arrayOf(jobExecutionPropTypes),
      hasLoaded: PropTypes.bool,
      formatter: PropTypes.object,
      sortColumns: PropTypes.object,
    };

    static defaultProps = {
      formatter: {},
      sortColumns: defaultJobLogsSortColumns,
      contentData: [],
      hasLoaded: false,
    };

    state = {
      sort: 'completedDate',
      direction: SORT_TYPES.DESCENDING,
    };

    componentDidMount() {
      this.setLogsSort();
    }

    setLogsSort() {
      const { location: { search } } = this.props;

      const {
        sort = 'completedDate',
        direction = SORT_TYPES.DESCENDING,
      } = queryString.parse(search.slice(1));

      this.setState({
        sort,
        direction,
      });
    }

    prepareLogsData() {
      const {
        sort,
        direction,
      } = this.state;
      const {
        contentData,
        sortColumns,
      } = this.props;

      const logs = [...contentData];

      if (!sortColumns[sort]) return logs;

      return logs.sort((a, b) => {
        const cellFormatter = this.props.formatter[sort];
        const sortDir = direction === SORT_TYPES.ASCENDING ? 1 : -1;
        const {
          useFormatterFn,
          sortFn,
        } = sortColumns[sort];
        const useCellFormatter = useFormatterFn && cellFormatter;

        return sortDir * (useCellFormatter
          ? sortFn(cellFormatter(a), cellFormatter(b))
          : sortFn(a[sort], b[sort]));
      });
    }

    onSort = (e, { name: fieldName }) => {
      const {
        history,
        location,
        sortColumns,
      } = this.props;
      const {
        sort,
        direction,
      } = this.state;

      if (!sortColumns[fieldName]) return;

      const isSameField = sort === fieldName;
      let sortDir = SORT_TYPES.ASCENDING;

      if (isSameField) {
        sortDir = direction === sortDir ? SORT_TYPES.DESCENDING : sortDir;
      }

      const sortState = {
        sort: fieldName,
        direction: sortDir,
      };

      this.setState(sortState);

      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(sortState)}`,
      });
    };

    render() {
      const { hasLoaded } = this.props;
      const {
        sort,
        direction,
      } = this.state;

      const contentData = this.prepareLogsData();

      return (
        <WrappedComponent
          {...this.props}
          contentData={contentData}
          sortField={sort}
          sortDirection={direction}
          hasLoaded={hasLoaded}
          onSort={this.onSort}
        />
      );
    }
  };
};

export const withJobLogsSort = compose(
  withRouter,
  withJobLogsSortComponent
);
