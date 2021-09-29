import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { waitFor } from '@testing-library/dom';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  buildMutator, buildResources,
} from '../../test/helpers';

import '../../test/jest/__mock__';
import '../../test/jest/__new_mock__';

import { SettingsLabel } from '../Settings';
import { SearchAndSortPane } from './SearchAndSortPane';

describe('SearchAndSortPane', () => {
  const resultCountMessage = 'profiles pane';
  const titleMessageId = 'title message';
  const searchAndSortPaneCommonProps = {
    hasSearchForm: true,
    visibleColumns: ['id', 'name', 'hrId'],
    columnMapping: {
      id: 'id',
      name: 'Name',
      hrId: 'hrId',
    },
    initialResultCount: 1,
    resultCountIncrement: 2,
    resultsFormatter: {
      id: record => record.id,
      name: record => record.name,
    },
    parentResources: buildResources({
      resourceName: 'profiles',
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
    resourceName: 'profiles',
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

    it('should sort by default', async () => {
      await renderSearchAndSortPane();

      expect(window.location.search).toBe('?sort=name');
    });

    describe('searching by the value', () => {
      it('should change search query in url', async () => {
        await renderSearchAndSortPane();

        const searchValue = 'searchValue';

        const input = await screen.findByLabelText('stripes-smart-components.searchFieldLabel');
        const submitBtn = await screen.findByText('stripes-smart-components.search');

        fireEvent.change(input, { target: { value: searchValue } });

        userEvent.click(submitBtn);

        waitFor(() => {
          expect(window.location.search).toBe(`?query=${searchValue}&sort=name`);
        });
      });
    });
  });
});
