import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { noop } from 'lodash';
import {
  render,
  screen,
} from '@testing-library/react';

import '../../test/jest/__mock__';

import userEvent from '@testing-library/user-event';
import { SearchResults } from '.';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({
  width: 1920,
  height: 1080,
}));

const generateListContent = (numOfRecords = 2) => {
  return Array.from({ length: numOfRecords }, (_, i) => ({
    id: `id${i}`,
    name: `name${i}`,
    description: `description${i}`,
  }));
};

const setupSearchResults = (customProps, containerHeight = 300) => {
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
    fetchOffset: noop,
  };
  const {
    contentData,
    totalCount = contentData.length,
    columnMapping,
    visibleColumns,
    pageAmount,
    resultCountIncrement,
    pending,
    pagingType,
    fetchMore,
    fetchOffset,
    virtualize = true
  } = {
    ...defaultProps,
    ...customProps,
  };

  render(
    <BrowserRouter>
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
            fetchOffset,
          }}
          resultOffset={0}
          notLoadedMessage={<span data-test-not-loaded-message>Not loaded</span>}
          columnMapping={columnMapping}
          visibleColumns={visibleColumns}
          pageAmount={pageAmount}
          pagingType={pagingType}
          virtualize={virtualize}
          resultCountIncrement={resultCountIncrement}
        />
      </div>
    </BrowserRouter>
  );
};

describe('SearchResults', () => {
  describe('rendering search results with content data empty and API request pending', () => {
    it.skip('should display preloader', () => {
      setupSearchResults({
        contentData: [],
        pending: true,
      });

      expect(screen.getByTestId('preloader')).toBeVisible();
    });
  });

  describe('rendering search results with content data empty and API request loaded', () => {
    it('should display empty message', () => {
      setupSearchResults({ contentData: [] });

      expect(screen.getByText('Not loaded')).toBeVisible();
    });
  });

  describe('rendering search results with content data and pending API request', () => {
    it('should display list loader indicator', () => {
      setupSearchResults({ pending: true });

      expect(screen.getByText('stripes-components.endOfList')).toBeDefined();
    });
  });

  describe('rending search results with content data', () => {
    const resultCountIncrement = 5;

    it('should initiate fetching of the next chunk of data', () => {
      setupSearchResults({
        contentData: generateListContent(5),
        totalCount: 100,
        pagingType: 'prev-next',
        resultCountIncrement,
        virtualize: false
      }, 100);

      userEvent.click(screen.getByRole('button', { name: 'stripes-components.next' }));

      expect(resultCountIncrement).toBe(5);
    });
  });
});
