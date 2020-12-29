import React from 'react';
import PropTypes from 'prop-types';

import { MultiColumnList } from '@folio/stripes/components';

import { Preloader } from '../Preloader';

export function SearchResults({
  source,
  notLoadedMessage,
  resultCountIncrement,
  resultOffset,
  ...rest
}) {
  const onNeedMore = (askAmount, index) => {
    if (resultOffset && index) {
      source.fetchOffset(index);
    } else {
      source.fetchMore(resultCountIncrement);
    }
  };

  return (
    <MultiColumnList
      id="search-results-list"
      totalCount={source.totalCount()}
      contentData={source.records()}
      isEmptyMessage={source.pending() ? <Preloader /> : notLoadedMessage}
      loading={source.pending()}
      autosize
      virtualize
      onNeedMoreData={onNeedMore}
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
    fetchOffset: PropTypes.func.isRequired,
  }).isRequired,
  resultCountIncrement: PropTypes.number.isRequired,
  notLoadedMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  resultOffset: PropTypes.shape({ replace: PropTypes.func.isRequired }),
};
