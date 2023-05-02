import React, {
  Component,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  get,
  noop,
} from 'lodash';

import {
  Pane,
  Paneset,
  SRStatus,
  PaneHeader,
  Button,
  Highlighter,
} from '@folio/stripes/components';
import {
  withStripes,
  stripesShape,
} from '@folio/stripes/core';
import {
  mapNsKeys,
  getNsKey,
  makeConnectedSource,
  buildUrl,
} from '@folio/stripes/smart-components';

import { SearchForm } from '../SearchForm';
import { SearchResults } from '../SearchResults';
import {
  buildSortOrder, getCapitalized,
  SORT_TYPES,
} from '../utils';

import css from './SearchAndSortPane.css';

@withRouter
@withStripes
export class SearchAndSortPane extends Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    label: PropTypes.node.isRequired,
    renderHeader: PropTypes.func,
    searchLabelKey: PropTypes.string,
    resultCountMessageId: PropTypes.string.isRequired,
    location: PropTypes.oneOfType([
      PropTypes.shape({
        search: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
      }).isRequired,
      PropTypes.string.isRequired,
    ]),
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
    parentMutator: PropTypes.shape({
      query: PropTypes.object,
      resultCount: PropTypes.shape({ replace: PropTypes.func.isRequired }).isRequired,
      resultOffset: PropTypes.shape({ replace: PropTypes.func.isRequired }),
    }).isRequired,
    parentResources: PropTypes.shape({ query: PropTypes.object }).isRequired,
    maxSortKeys: PropTypes.number,
    nsParams: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludedSortColumns: PropTypes.arrayOf(PropTypes.string),
    shouldSetInitialSortOnMount: PropTypes.bool,
    columnMapping: PropTypes.object.isRequired,
    columnWidths: PropTypes.object,
    resultsFormatter: PropTypes.object.isRequired,
    defaultSort: PropTypes.string,
    resourceName: PropTypes.string.isRequired,
    resultCountIncrement: PropTypes.number.isRequired,
    initialResultCount: PropTypes.number.isRequired,
    hasSearchForm: PropTypes.bool,
    firstMenu: PropTypes.node,
    lastMenu: PropTypes.node,
    searchResultsProps: PropTypes.object,
    virtualize:PropTypes.bool,
    pagingType: PropTypes.string,
    totalRecordsCount: PropTypes.number,
    pageAmount: PropTypes.number,
  };

  static defaultProps = {
    maxSortKeys: 2,
    renderHeader: null,
    defaultSort: '',
    hasSearchForm: true,
    shouldSetInitialSortOnMount: true,
    searchLabelKey: 'stripes-data-transfer-components.search',
    searchResultsProps: {},
  };

  constructor(props) {
    super(props);

    const { match: { path: routePath } } = this.props;

    this.state = { searchValue: null };
    this.initialQuery = queryString.parse(routePath);
  }

  componentDidMount() {
    this.setInitialSortQueryParam();
  }

  componentDidUpdate(prevProps) {
    const {
      stripes,
      resourceName,
    } = this.props;

    const logger = stripes ? stripes.logger : { log: noop };
    const oldState = makeConnectedSource(prevProps, logger, resourceName);
    const newState = makeConnectedSource(this.props, logger, resourceName);

    const isSearchComplete = oldState.pending() && !newState.pending();

    if (isSearchComplete) {
      const count = newState.totalCount();

      this.SRStatusRef.current.sendMessage((
        <FormattedMessage
          id="stripes-smart-components.searchReturnedResults"
          values={{ count }}
        />
      ));
    }
  }

  SRStatusRef = createRef();

  setInitialSortQueryParam() {
    const {
      defaultSort,
      location: { search },
      shouldSetInitialSortOnMount,
    } = this.props;

    if (!shouldSetInitialSortOnMount) {
      return;
    }

    const queryParams = queryString.parse(search);
    const sortOrder = queryParams.sort || defaultSort;

    this.transitionToParams({ sort: sortOrder });
  }

  transitionToParams(values) {
    const {
      nsParams,
      location,
      history,
    } = this.props;

    const nsValues = mapNsKeys(values, nsParams);
    const url = buildUrl(location, nsValues);

    history.push(url);
  }

  getCommaSeparatedItems(types) {
    return types?.map((type, index) => `${type}${index !== types.length - 1 ? ',' : ''}`);
  }

  getFilteredRecords(records, searchValue) {
    if (!searchValue) {
      return records.map(record => ({
        ...record,
        ...(record.recordTypes ? { recordTypes: this.getCommaSeparatedItems(record.recordTypes) } : {}),
      }));
    }

    return records.reduce((filteredRecords, record) => {
      const {
        name, recordTypes,
      } = record;

      const lowerCaseName = name?.toLowerCase();

      const isNameMatched = lowerCaseName?.includes(searchValue?.toLowerCase());

      const highlightedName = (
        <Highlighter
          searchWords={[searchValue]}
          text={name}
        />
      );

      const withHighlightedName = {
        ...record,
        name: highlightedName,
      };

      if (recordTypes) {
        const isRecordTypeMatched = recordTypes?.map(type => type.toLowerCase()).some(type => type.includes(searchValue?.toLowerCase()));

        const highlightedRecords = recordTypes.map((r, i) => (
          <>
            <Highlighter
              searchWords={[searchValue]}
              text={getCapitalized(r)}
            />
            {i !== recordTypes.length - 1 && ','}
          </>

        ));

        if (isNameMatched || isRecordTypeMatched) {
          filteredRecords.push({
            ...withHighlightedName,
            recordTypes: highlightedRecords,
          });
        }
      } else if (isNameMatched) {
        filteredRecords.push(withHighlightedName);
      }

      return filteredRecords;
    }, []);
  }

  getPropsWithFilteredRecords() {
    const { searchValue } = this.state;

    const records = this.getFilteredRecords(
      this.props.parentResources[this.props.resourceName].records,
      searchValue
    );

    return {
      ...this.props,
      ...(this.props.parentResources && {
        parentResources: {
          ...this.props.parentResources,
          [this.props.resourceName]: {
            ...this.props.parentResources[this.props.resourceName],
            records,
            other: { totalRecords: records.length },
          },
        },
      }),
    };
  }

  getSource() {
    const {
      stripes,
      resourceName,
    } = this.props;

    return makeConnectedSource(this.getPropsWithFilteredRecords(), stripes ? stripes.logger : { log: noop }, resourceName);
  }

  handleSort = (e, meta) => {
    const {
      maxSortKeys,
      defaultSort,
      excludedSortColumns,
    } = this.props;

    if (excludedSortColumns && excludedSortColumns.includes(meta.name)) {
      return;
    }

    const sortOrder = buildSortOrder(this.queryParam('sort') || defaultSort, meta.name, defaultSort, maxSortKeys);

    this.transitionToParams({ sort: sortOrder });
  };

  queryParam(name) {
    const {
      parentResources: { query },
      nsParams,
    } = this.props;

    const nsKey = getNsKey(name, nsParams);

    return get(query, nsKey);
  }

  handleSearchChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    this.forceUpdate();
  };

  handleSearchQueryClear = () => {
    this.setState({ searchValue: '' });
  };

  renderSearchResults = source => {
    const {
      columnMapping,
      columnWidths,
      resultsFormatter,
      visibleColumns,
      defaultSort,
      match,
      location,
      resultCountIncrement,
      searchResultsProps,
      pagingType,
      totalRecordsCount,
      virtualize,
      pageAmount,
      parentMutator: { resultOffset },
    } = this.props;

    const sortOrderQuery = this.queryParam('sort') || defaultSort;
    const sortDirection = sortOrderQuery.startsWith('-') ? SORT_TYPES.DESCENDING : SORT_TYPES.ASCENDING;
    const sortOrder = sortOrderQuery.replace(/^-/, '').replace(/,.*/, '');

    return (
      <SearchResults
        source={source}
        columnMapping={columnMapping}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        formatter={resultsFormatter}
        resultCountIncrement={resultCountIncrement}
        sortOrder={sortOrder}
        sortDirection={sortDirection}
        pagingType={pagingType}
        virtualize={virtualize}
        pageAmount={pageAmount}
        totalRecordsCount={totalRecordsCount}
        rowProps={{ to: id => `${match.path}/view/${id}${location.search}` }}
        resultOffset={resultOffset}
        onHeaderClick={this.handleSort}
        {...searchResultsProps}
      />
    );
  };

  renderHeader = renderProps => {
    const {
      resultCountMessageId,
      label,
      renderHeader,
      match,
      location,
      firstMenu,
      lastMenu,
      totalRecordsCount
    } = this.props;

    if (renderHeader) return renderHeader(this.props, renderProps);

    return (
      <PaneHeader
        {...renderProps}
        paneTitle={label}
        paneSub={(
          <FormattedMessage
            id={resultCountMessageId}
            values={{ count: totalRecordsCount }}
          />
        )}
        firstMenu={firstMenu}
        lastMenu={lastMenu || (
          <Button
            buttonStyle="primary paneHeaderNewButton"
            data-test-new-button
            marginBottom0
            to={`${match.path}/create${location.search}`}
          >
            <FormattedMessage id="stripes-data-transfer-components.new" />
          </Button>
        )}
      />
    );
  };

  renderSearchForm = source => {
    const { searchLabelKey } = this.props;
    const { searchValue } = this.state;

    return (
      <SearchForm
        searchLabelKey={searchLabelKey}
        searchTerm={searchValue}
        isLoading={source.pending()}
        handleChange={this.handleSearchChange}
        handleClear={this.handleSearchQueryClear}
        handleSubmit={this.handleSearchSubmit}
      />
    );
  };

  render() {
    const source = this.getSource();

    return (
      <Paneset data-testid="pane">
        <SRStatus ref={this.SRStatusRef} />
        <Pane
          id="pane-results"
          data-testid="pane-results"
          defaultWidth="fill"
          noOverflow
          padContent={false}
          renderHeader={this.renderHeader}
        >
          <div className={css.paneBody}>
            {this.props.hasSearchForm && this.renderSearchForm(source)}
            <div className={css.searchResults}>
              {this.renderSearchResults(source)}
            </div>
          </div>
        </Pane>
      </Paneset>
    );
  }
}
