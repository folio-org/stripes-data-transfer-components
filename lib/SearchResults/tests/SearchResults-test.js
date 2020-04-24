import React from 'react';
import { StaticRouter } from 'react-router';
import { expect } from 'chai';
import sinon from 'sinon';
import { noop } from 'lodash';
import {
  describe,
  beforeEach,
  it,
} from '@bigtest/mocha';

import { SearchResultsInteractor } from './interactor';
import { mountWithContext } from '../../../test/bigtest/helpers';
import { SearchResults } from '../SearchResults';

async function setupSearchResults(customProps, containerHeight = 300) {
  const defaultProps = {
    contentData: generateListContent(),
    columnMapping: {
      name: 'name',
      description: 'description',
    },
    visibleColumns: ['name', 'description'],
    pageAmount: 5,
    resultCountIncrement: 5,
    pending: false,
    fetchMore: noop,
  };
  const {
    contentData,
    totalCount = contentData.length,
    columnMapping,
    visibleColumns,
    pageAmount,
    resultCountIncrement,
    pending,
    fetchMore,
  } = {
    ...defaultProps,
    ...customProps,
  };

  await mountWithContext(
    <StaticRouter context={{}}>
      <div
        style={{
          height: `${containerHeight}px`,
          width: '600px',
        }}
      >
        <SearchResults
          source={{
            records: () => contentData,
            pending: () => pending,
            totalCount: () => totalCount,
            fetchMore,
          }}
          notLoadedMessage={<span data-test-not-loaded-message>Not loaded</span>}
          columnMapping={columnMapping}
          visibleColumns={visibleColumns}
          pageAmount={pageAmount}
          resultCountIncrement={resultCountIncrement}
        />
      </div>
    </StaticRouter>
  );
}

const generateListContent = (numOfRecords = 2) => {
  return Array.from({ length: numOfRecords }, (_, i) => ({
    id: `id${i}`,
    name: `name${i}`,
    description: `description${i}`,
  }));
};

describe('SearchResults', () => {
  const searchResults = new SearchResultsInteractor();

  describe('rendering search results with content data empty and API request pending', () => {
    beforeEach(async () => {
      await setupSearchResults({
        contentData: [],
        pending: true,
      });
    });

    it('should display preloader', () => {
      expect(searchResults.preloader.isPresent).to.be.true;
      expect(searchResults.notLoadedMessagePresent).to.be.false;
    });
  });

  describe('rendering search results with content data empty and API request loaded', () => {
    beforeEach(async () => {
      await setupSearchResults({ contentData: [] });
    });

    it('should display empty message', () => {
      expect(searchResults.preloader.isPresent).to.be.false;
      expect(searchResults.notLoadedMessagePresent).to.be.true;
    });
  });

  describe('rendering search results with content data and pending API request', () => {
    beforeEach(async () => {
      await setupSearchResults({ pending: true });
    });

    it('should display list loader indicator', () => {
      expect(searchResults.list.displaysLoadingIcon).to.be.true;
    });
  });

  describe('rending search results with content data', () => {
    const fetchMore = sinon.spy();
    const resultCountIncrement = 5;

    beforeEach(async () => {
      fetchMore.resetHistory();

      await setupSearchResults({
        contentData: generateListContent(5),
        totalCount: 10,
        resultCountIncrement,
        fetchMore,
      }, 100);
    });

    describe('scrolling the list to the bottom', () => {
      beforeEach(async () => {
        await searchResults.list.scrollBody(200);
      });

      it('should initiate fetching of the next chunk of data', () => {
        expect(fetchMore.calledWith(resultCountIncrement)).to.be.true;
      });
    });
  });
});
