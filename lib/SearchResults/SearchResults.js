import React from 'react';
import PropTypes from 'prop-types';

import { MultiColumnList } from '@folio/stripes/components';

import { Preloader } from '../Preloader';

export function SearchResults({
  source,
  notLoadedMessage,
  resultCountIncrement,
  ...rest
}) {
  return (
    <MultiColumnList
      id="search-results-list"
      totalCount={source.totalCount()}
      contentData={source.records()}
      isEmptyMessage={source.pending() ? <Preloader /> : notLoadedMessage}
      loading={source.pending()}
      autosize
      virtualize
      onNeedMoreData={() => source.fetchMore(resultCountIncrement)}
      {...rest}
    />
  );
}

SearchResults.propTypes = {
  source: PropTypes.shape({
    records: PropTypes.func.isRequired,
    pending: PropTypes.func.isRequired,
    totalCount: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
  }).isRequired,
  resultCountIncrement: PropTypes.number.isRequired,
  notLoadedMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

SearchResults.defaultProps = { notLoadedMessage: '' };
