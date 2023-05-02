import React from 'react';
import PropTypes from 'prop-types';

import { MultiColumnList } from '@folio/stripes/components';

import { Preloader } from '../Preloader';

export function SearchResults({
  source,
  notLoadedMessage,
  resultCountIncrement,
  resultOffset,
  pagingType,
  pageAmount,
  totalRecordsCount,
  ...rest
}) {
  const onNeedMore = (askAmount, index) => {
    if (resultOffset && index >= 0) {
      source.fetchOffset(index);
    } else {
      source.fetchMore(resultCountIncrement);
    }
  };

  return (
    <MultiColumnList
      id="search-results-list"
      totalCount={totalRecordsCount}
      contentData={source.records()}
      pageAmount={pageAmount}
      isEmptyMessage={source.pending() ? <Preloader /> : notLoadedMessage}
      loading={source.pending()}
      autosize
      pagingType={pagingType}
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
  pagingType: PropTypes.string,
  totalRecordsCount: PropTypes.number,
  pageAmount: PropTypes.number,
};
