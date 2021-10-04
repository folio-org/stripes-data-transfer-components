import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  buildMutator, buildResources,
} from '../../test/helpers';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { SettingsLabel } from '../Settings';
import { SearchAndSortPane } from './SearchAndSortPane';
import { waitFor } from '@testing-library/dom';

jest.mock('react-virtualized-auto-sizer', () => ({ children }) => children({
  width: 1920,
  height: 1080,
}));

const resultCountMessage = 'profiles pane';
const titleMessageId = 'title message';
const searchAndSortPaneCommonProps = {
  hasSearchForm: true,
  visibleColumns: ['id', 'name'],
  columnMapping: {
    id: 'id',
    name: 'Name',
  },
  initialResultCount: 1,
  resultCountIncrement: 10,
  resultsFormatter: {
    id: record => record.id,
    name: record => record.name,
  },
  parentResources: buildResources({
    resourceName: 'jobProfiles',
    records: [
      {
        id: 1,
        name: 'Test name',
      },
      {
        id: 2,
        name: 'Test name 2',
      },
    ],
  }),
  parentMutator: buildMutator(),
  resourceName: 'jobProfiles',
  defaultSort: 'name',
  resultCountMessageId: resultCountMessage,
  label: (
    <SettingsLabel
      messageId={titleMessageId}
      iconKey="customIcon"
    />
  ),
};

const renderSearchAndSortPane = async () => {
  await render(
    <Router>
      <SearchAndSortPane {...searchAndSortPaneCommonProps} />
    </Router>
  );
};

const renderSearchAndSortPaneWithHeader = async () => {
  await render(
    <Router>
      <SearchAndSortPane
        {...searchAndSortPaneCommonProps}
        renderHeader={() => <div data-testid="pane-header" />}
      />
    </Router>
  );
};

describe('SearchAndSortPane', () => {
  describe('rendering component with loaded status and 2 items', () => {
    beforeEach(async () => {
      window.history.pushState({}, document.title, '/');
    });

    afterEach(async () => {
      window.history.pushState({}, document.title, '/');
    });

    it('should display SearchAndSortPane', async () => {
      await renderSearchAndSortPane();

      const pane = await screen.findByTestId('pane');

      expect(pane).toBeVisible();
    });

    it('should display correct title', async () => {
      await renderSearchAndSortPane();

      const titleMessage = await screen.findByText(titleMessageId);

      expect(titleMessage).toBeVisible();
    });

    it('should display correct subtitle', async () => {
      await renderSearchAndSortPane();

      const subTitleMessage = await screen.findByText(resultCountMessage);

      expect(subTitleMessage).toBeVisible();
    });

    it('should display new record button', async () => {
      await renderSearchAndSortPane();

      const newButton = await screen.findByRole('button', { name: /stripes-data-transfer-components.new/i });

      expect(newButton).toBeVisible();
    });

    it('should display search form', async () => {
      await renderSearchAndSortPane();

      const searchForm = await screen.findByTestId('search-form');

      expect(searchForm).toBeVisible();
    });

    it('should display search results', async () => {
      await renderSearchAndSortPane();

      const paneResults = await screen.findByTestId('pane-results');

      expect(paneResults).toBeVisible();
    });

    it('should display header', async () => {
      await renderSearchAndSortPaneWithHeader();

      const paneHeader = await screen.findByTestId('pane-header');

      expect(paneHeader).toBeVisible();
    });

    describe('should render results table', () => {
      it('all rows are visible', async () => {
        await renderSearchAndSortPane();

        await waitFor(() => {
          expect(screen.getByText('Test name')).toBeInTheDocument();
          expect(screen.getByText('Test name 2')).toBeInTheDocument();
        });
      });

      it('should sort by default', async () => {
        await renderSearchAndSortPane();

        expect(window.location.search).toBe('?sort=name');
      });

      it('should change sort direction when column title was clicked', async () => {
        await renderSearchAndSortPane();

        const columnHeaderBtn = await screen.findByRole('button', { name: /Name/i });

        act(() => {
          userEvent.click(columnHeaderBtn);
        });

        expect(window.location.search).toBe('?sort=-name');
      });

      it('should filter rows by search value', async () => {
        await renderSearchAndSortPane();

        const searchValue = 'Test name 2';

        const input = await screen.findByLabelText('stripes-smart-components.searchFieldLabel');
        const submitBtn = await screen.findByText('stripes-smart-components.search');

        act(() => {
          fireEvent.change(input, { target: { value: searchValue } });
        });

        userEvent.click(submitBtn);

        expect(screen.getByText('Test name 2')).toBeInTheDocument();

        await waitFor(() => {
          expect(screen.queryByText('Test name')).not.toBeInTheDocument();
        });
      });
    });
  });
});
